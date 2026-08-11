/**
 * The form engine shared by the newsletter (#91:572) and the demo drive
 * booking (#118:546).
 *
 * Both forms are static HTML that POST to whatever endpoint `src/config/site.ts`
 * names, so the only thing they need in common is validation, messaging and
 * the submit itself — which is all this is. Layout and copy stay in the
 * components.
 *
 * An empty endpoint is a supported state: the form still validates and still
 * shows its success message, it just never sends. That is what lets a buyer
 * style and test before wiring anything up.
 */

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Deliberately loose — postal codes are alphanumeric in much of the world. */
export const ZIP = /^[A-Za-z0-9][A-Za-z0-9 -]{2,11}$/;
/** Likewise: digits, spaces, brackets, dashes and a leading +. */
export const PHONE = /^[+(]?[\d][\d\s()+-]{5,19}$/;

export interface Field {
  /** The controls that make up the field — one input, or a whole radio group. */
  controls: HTMLInputElement[];
  /** Where this field's message is written. */
  msg: HTMLElement | null;
  /** Returns '' when the field is valid, otherwise the message to show. */
  validate: (controls: HTMLInputElement[]) => string;
}

export interface FormOptions {
  fields: Field[];
  /** The `role="status"` line for whole-form messages. */
  status: HTMLElement | null;
  success: string;
  failure?: string;
}

/** A required text control. */
export function text(
  input: HTMLInputElement | null,
  msg: HTMLElement | null,
  empty: string,
  pattern?: RegExp,
  invalid?: string,
): Field | null {
  if (!input) return null;
  return {
    controls: [input],
    msg,
    validate: ([el]) => {
      const value = el.value.trim();
      if (value === '') return empty;
      if (pattern && !pattern.test(value)) return invalid ?? empty;
      return '';
    },
  };
}

/** A radio group, or any set of controls of which one must be chosen. */
export function choice(
  controls: HTMLInputElement[],
  msg: HTMLElement | null,
  empty: string,
): Field | null {
  if (controls.length === 0) return null;
  return {
    controls,
    msg,
    validate: (els) => (els.some((el) => el.checked) ? '' : empty),
  };
}

/** A checkbox that must be ticked. */
export function consent(
  input: HTMLInputElement | null,
  msg: HTMLElement | null,
  empty: string,
): Field | null {
  if (!input) return null;
  return { controls: [input], msg, validate: ([el]) => (el.checked ? '' : empty) };
}

/** A date that must be present and must not already have passed. */
export function futureDate(
  input: HTMLInputElement | null,
  msg: HTMLElement | null,
  empty: string,
  past: string,
): Field | null {
  if (!input) return null;
  return {
    controls: [input],
    msg,
    validate: ([el]) => {
      if (el.value === '') return empty;
      /* Both sides are local-midnight ISO dates, so this is a string compare
         and never crosses a timezone. */
      return el.value < new Date().toISOString().slice(0, 10) ? past : '';
    },
  };
}

function setMessage(field: Field, message: string): void {
  if (field.msg) field.msg.textContent = message;
  field.controls.forEach((el) => {
    if (message) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  });
}

export function wireForm(form: HTMLFormElement, options: FormOptions): void {
  const { fields, status, success, failure = 'Something went wrong. Please try again.' } = options;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  /* Only now that the script is running do we take validation off the browser
     — without JS the native messages are the better fallback. */
  form.noValidate = true;

  const setStatus = (message: string, state?: 'error'): void => {
    if (!status) return;
    status.textContent = message;
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  };

  /**
   * Errors are raised on submit and cleared as soon as the field becomes
   * valid — deliberately never on blur. Raising one on blur inserts a message
   * between mousedown and mouseup, which moves the submit button out from
   * under the pointer and swallows the very click that caused the blur.
   */
  fields.forEach((field) => {
    field.controls.forEach((el) => {
      const clear = () => {
        if (el.hasAttribute('aria-invalid') && field.validate(field.controls) === '') {
          setMessage(field, '');
        }
      };
      el.addEventListener('input', clear);
      el.addEventListener('change', clear);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');

    let firstInvalid: HTMLInputElement | null = null;
    fields.forEach((field) => {
      const message = field.validate(field.controls);
      setMessage(field, message);
      if (message && !firstInvalid) firstInvalid = field.controls[0];
    });

    if (firstInvalid) {
      /* Radios and checkboxes are visually hidden inputs behind a drawn
         control, so scrolling to the input alone can land off screen. */
      const target = firstInvalid as HTMLInputElement;
      target.focus({ preventScroll: true });
      (target.closest('label') ?? target).scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    const succeed = (): void => {
      form.reset();
      fields.forEach((field) => setMessage(field, ''));
      setStatus(success);
    };

    // No endpoint configured: validate, confirm, send nothing.
    if (form.dataset.hasEndpoint !== 'true') {
      succeed();
      return;
    }

    if (submit) submit.disabled = true;
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(String(response.status));
      succeed();
    } catch {
      setStatus(failure, 'error');
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}
