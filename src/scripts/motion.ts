/**
 * Shared motion setup.
 *
 * Every animated section imports `prefersReducedMotion` and `revealOnScroll`
 * from here rather than reaching for GSAP directly, so that the
 * reduced-motion escape hatch only has to be correct in one place.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals `[data-animate]` elements as they scroll into view.
 *
 * The elements are hidden by CSS only while `html.js` is set and motion is
 * allowed. When motion is reduced we clear the inline opacity immediately so
 * nothing is ever left invisible.
 */
export function revealOnScroll(root: ParentNode = document): void {
  const targets = root.querySelectorAll<HTMLElement>('[data-animate]');
  if (targets.length === 0) return;

  if (prefersReducedMotion()) {
    targets.forEach((el) => {
      el.style.opacity = '1';
    });
    return;
  }

  targets.forEach((el) => {
    const delay = Number(el.dataset.animateDelay ?? 0);
    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      },
    );
  });
}
