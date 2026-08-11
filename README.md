# VoltACar

An electric-mobility website template built with [Astro](https://astro.build).
Eight pages, a git-backed CMS for the blog, two working forms, and no runtime
framework — the shipped site is static HTML, CSS and a small amount of
JavaScript.

- **Astro 7** with TypeScript in strict mode
- **Static output.** No server, no database. Deploy the `dist/` folder anywhere.
- **Sveltia CMS** for the blog, editable at `/admin/`
- **GSAP + ScrollTrigger** for scroll animation, behind `prefers-reduced-motion`
- One font family, one set of design tokens, 29 components

---

## Requirements

| | |
|---|---|
| Node | **22.12 or newer** (`node --version`) |
| Package manager | npm, pnpm, yarn or bun |
| Environment variables | **None.** Everything configurable lives in `src/config/site.ts` |

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built site locally, exactly as deployed |
| `npm run check` | TypeScript and Astro diagnostics — should report 0 / 0 / 0 |

Run `npm run check` and `npm run build` before deploying. The build fails on a
broken content reference rather than shipping one, which is deliberate.

---

## Pages

| Route | Source |
|---|---|
| `/` | `src/pages/index.astro` |
| `/features` | `src/pages/features.astro` |
| `/about-us` | `src/pages/about-us.astro` |
| `/blog`, `/blog/2`… | `src/pages/blog/[...page].astro` |
| `/blog/<slug>` | `src/pages/blog/[slug].astro` |
| `/test-drive` | `src/pages/test-drive.astro` |
| `/privacy-data` | `src/pages/privacy-data.astro` |
| `/404` | `src/pages/404.astro` |

---

## Project structure

```
src/
├── assets/images/     imported, hashed and optimised by Astro
├── components/
│   ├── blog/          article body
│   ├── cards/         blog card
│   ├── common/        button, icon, social icon, scroll track
│   ├── forms/         text field, radio group, checkbox
│   ├── layout/        header, footer
│   ├── navigation/    pagination
│   └── sections/      the page sections themselves
├── config/site.ts     ← the one file to edit when rebranding
├── content/blog/      markdown posts (CMS-managed)
├── content.config.ts  the blog collection's schema
├── data/team.ts       the six team members
├── layouts/           BaseLayout — <head>, SEO, header/footer slots
├── pages/             routes
├── scripts/           motion.ts (GSAP setup), form.ts (validation engine)
└── styles/            tokens.css, global.css
public/
├── admin/             Sveltia CMS
├── video/             quote band background
└── favicon, robots.txt
```

---

## Configuring the site

**`src/config/site.ts` is the one file to edit when rebranding.** Nothing in it
is hard-coded anywhere else.

| Export | Controls |
|---|---|
| `site` | Name, tagline, description, URL, locale, OG image |
| `contact` | Address, email, phone |
| `social` | The four social links — footer icons and text links both |
| `navigation` | Header nav, including the "Others" dropdown |
| `footerColumns` | The footer's three link columns |
| `forms` | Where the newsletter and booking forms POST |
| `testDrive` | The demo drive's locations and time slots |
| `postsPerPage` | Blog pagination — 5 by default |

Also update **`site`** in `astro.config.mjs` and the **Sitemap** line in
`public/robots.txt` to your own domain. They feed canonical URLs, the sitemap
and social share cards.

### Design tokens

`src/styles/tokens.css` holds every colour, type size, spacing step, radius,
shadow, easing and breakpoint. Changing `--c-primary` there changes the accent
everywhere.

Type sizes are fluid `clamp()` values that reach their Figma sizes at 1600px
and scale down from there — you should not need per-breakpoint overrides.

---

## Content

**See [`docs/content.md`](docs/content.md)** for the full map: what the CMS
manages, what lives in code, and what to change to move something between
them.

The short version: **the blog is CMS-managed; everything else is edited in
code.** Team members are `src/data/team.ts`, site-wide settings are
`src/config/site.ts`, and each section's copy sits in the component that
renders it.

### The CMS

Open **`/admin/`**. Setup lives in
[`public/admin/config.yml`](public/admin/config.yml), which documents itself —
in short:

1. Point `backend.repo` at your GitHub repository.
2. Sign in with a **GitHub personal access token** (nothing to register or
   host) or set up a full OAuth app. On Netlify with Identity, switch to
   `git-gateway`.

To edit locally with no auth at all, run `npm run dev`, open `/admin/`, and
choose **"Work with Local Repository"**. Sveltia reads and writes your working
tree directly through the File System Access API — no proxy server to run, but
it is Chromium-only. Changes land as ordinary file edits; review them with
`git diff`.

### Writing a post

Create it in the CMS, or add a markdown file to `src/content/blog/`:

```markdown
---
title: The Rise of Electric Vehicles in 2026
description: One or two sentences. Used on the card, in the hero, and as the meta description.
cover: ../../assets/images/blog/rise-of-electric-vehicles-2026.webp
coverAlt: An electric car on a quiet tree-lined boulevard
publishedAt: 2026-07-28
draft: false
---

Body copy in markdown.
```

`cover` is resolved **relative to the markdown file** and validated at build
time, so a typo fails the build instead of shipping a missing image.

Images inside the body get a layout from how many share a paragraph:

```markdown
![alt](../../assets/images/blog/a.webp) ![alt](../../assets/images/blog/b.webp)

![alt](../../assets/images/blog/c.webp)
```

Two on one line become the wide pair; one alone becomes a full-bleed band.
Use markdown syntax rather than a raw `<img>` — only the former is optimised.

---

## Forms

Both forms are static HTML that POST to whatever URL you set in
`src/config/site.ts`:

```ts
export const forms = {
  newsletter: '',
  testDrive: '',
} as const;
```

Anything that accepts a form POST works — Formspree, Getform, Basin, Netlify
Forms, or a serverless function of your own.

**Leave a value empty and that form still validates and still shows its
success state; it simply never sends.** That is intentional, so you can style
and test before wiring anything up.

Submission goes through `fetch`, so the page never navigates away — which
means a **cross-origin endpoint must allow your domain via CORS**. The hosted
services above do by default; your own function needs an
`Access-Control-Allow-Origin` header. Same-origin endpoints need nothing.

Validation, error messages, focus management and submission are shared by both
forms in `src/scripts/form.ts`.

---

## Deploying

Static output, so any host works:

```bash
npm run build     # → dist/
```

- **Netlify / Vercel / Cloudflare Pages** — build `npm run build`, publish
  `dist`
- **GitHub Pages, S3, nginx** — upload `dist/`

Two things to set first: `site` in `astro.config.mjs`, and the `Sitemap:` line
in `public/robots.txt`.

Nothing needs environment variables. The CMS authenticates against your git
provider from the browser.

---

## What ships

Measured on a production build:

| | Gzipped |
|---|---|
| CSS, all of it | **10.7 KB** |
| Site JavaScript — nav, drawer, sliders, modal, forms, pagination | **8.6 KB** |
| GSAP + ScrollTrigger | **43.0 KB** |
| Fonts, self-hosted — latin only unless a page needs latin-ext | **38 KB** |

Lighthouse on a production build, all eight routes: **accessibility 100**,
**best practices 100**, **SEO 100**, performance **92–100**. The 404 scores 66
on SEO for one reason — it is `noindex`, which is correct for a 404 and which
Lighthouse has no way to know.

GSAP is four-fifths of the JavaScript on the page, and it is not optional:
fourteen components import it, including the two pinned horizontal sliders and
the team profile modal's open transition. Removing it would mean rewriting
those, not just losing some fades. Every animation it drives is already
skipped under `prefers-reduced-motion`.

The header, mobile drawer, nav dropdown, pagination and both forms have no
animation dependency — that is the 8.6 KB above.

Images are converted to WebP, resized per breakpoint and content-hashed by
Astro's build. Nothing in `src/assets` is served at its original size.

---

## Browser support

Current Chrome, Edge, Firefox and Safari. The build uses `:has()`,
`backdrop-filter`, `<dialog>`, container queries and `aspect-ratio`, all
broadly available since 2023.

Two things degrade rather than break: the date field's calendar icon is drawn
on WebKit's own picker button, so Firefox shows its default control instead;
and the CMS's local editing mode needs the File System Access API, which is
Chromium-only. Neither affects the published site.

---

## Demo content to replace

- **`backend.repo`** in `public/admin/config.yml` — `your-org/your-repo`
- **`site.url`** in `src/config/site.ts` and `astro.config.mjs`
- **Demo drive time slots** in `src/config/site.ts` — these came from the
  design and are random clock readings rather than appointment hours,
  `02:34 am` among them
- **Blog posts**, team members, and the contact details in `site.ts`

---

## Credits

Type is [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans);
the wordmark is [Figtree](https://fonts.google.com/specimen/Figtree). Both are
under the [SIL Open Font License](https://openfontlicense.org), and both are
**self-hosted** from `public/fonts/` — the Google Fonts stylesheet measured
865ms of render-blocking on every page, and serving them from the same origin
removes that, the two-hop external chain, and the third-party request. They
are variable fonts, so one file covers every weight.

Animation uses [GSAP](https://gsap.com) with ScrollTrigger. The CMS is
[Sveltia](https://github.com/sveltia/sveltia-cms).

Photography and vehicle renders ship with the template for demonstration.
