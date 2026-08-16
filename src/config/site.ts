/**
 * VoltACar — central site configuration.
 *
 * This is the one file to edit when rebranding the template. Nothing below
 * is hard-coded anywhere else in the project.
 */

import type { SocialIconName } from '../components/common/SocialIcon.astro';

export interface NavLink {
  label: string;
  href: string;
  /** Optional nested links render as a dropdown in the header. */
  children?: NavLink[];
}

export const site = {
  name: 'VoltACar',
  /** Used as the default <title> suffix and in structured data. */
  tagline: 'Smarter, cleaner, fully electric mobility',
  description:
    'VoltACar is a smarter, cleaner, and fully electric way to move — 500 km of range, a 30 minute fast charge, and a cabin designed around people.',
  /** Must match `site` in astro.config.mjs. */
  url: 'https://voltacar.example.com',
  locale: 'en',
  /** Relative to /public. Used for Open Graph and Twitter cards. */
  ogImage: '/images/og-default.jpg',
} as const;

export const contact = {
  address: '2464 Royal Ln. Mesa, New Jersey, USA 45463',
  email: 'hello@voltacar.com',
  phone: '+48 756 657 768',
  phoneHref: '+48756657768',
} as const;

/**
 * The footer shows all four as icons (#158:1003) and the first three again as
 * text links in its last column (#91:614), which is why the hrefs live here
 * rather than being written out twice.
 */
export const social: { label: string; href: string; icon: SocialIconName }[] = [
  { label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/', icon: 'facebook' },
  { label: 'Twitter', href: 'https://twitter.com/', icon: 'x' },
  { label: 'YouTube', href: 'https://youtube.com/', icon: 'youtube' },
];

/**
 * Header navigation. Follows the Figma header (#266:194) with one deliberate
 * departure: the frame lists Blog both as a top-level link and again inside
 * Others, and only the one in Others is kept. Two routes to the same page,
 * one of them visible while the other is a click deep, reads as an oversight
 * in the design rather than a shortcut.
 *
 * Nothing else needs to know. `isBranchCurrent` in Header.astro already
 * lights the Others trigger when any of its children is the current page, so
 * /blog and /blog/<slug> still mark the header.
 */
export const navigation: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'About us', href: '/about-us' },
  { label: 'Test Drive', href: '/test-drive' },
  {
    label: 'Others',
    href: '#',
    children: [
      { label: 'Blog', href: '/blog' },
      { label: '404 error', href: '/404' },
      { label: 'Privacy Policy', href: '/privacy-data' },
    ],
  },
];

/** Footer link columns. Mirrors the Figma footer (#91:604). */
export const footerColumns: NavLink[][] = [
  [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About us', href: '/about-us' },
  ],
  [
    { label: 'Test Drive', href: '/test-drive' },
    { label: 'Privacy Policy', href: '/privacy-data' },
    { label: '404 error', href: '/404' },
  ],
  // The design repeats the first three socials here as plain text links.
  social.slice(0, 3).map(({ label, href }) => ({ label, href })),
];

/**
 * Form endpoints.
 *
 * Both forms in this template are static HTML that POST to whatever URL you
 * put here — Formspree, Getform, Basin, Netlify Forms, a serverless function,
 * anything that accepts a form POST. Leave a value empty and that form will
 * validate and show its success state without sending anything, which is
 * useful while you are still styling.
 *
 * Submission goes through `fetch` so the page never navigates away, which
 * means a cross-origin endpoint has to allow your domain via CORS. The hosted
 * services above all do by default; a serverless function of your own needs an
 * `Access-Control-Allow-Origin` header. Same-origin endpoints (Netlify Forms,
 * an /api route) need nothing.
 *
 * Example: 'https://formspree.io/f/xxxxxxxx'
 */
export const forms = {
  newsletter: '',
  testDrive: '',
} as const;

/**
 * Demo drive booking options — the two radio groups on /test-drive.
 *
 * Both lists are the Figma's own (#118:570, #120:167) and both are demo
 * content you are meant to replace. The times especially: the frame's are
 * random clock readings rather than appointment slots, and shipping
 * "02:34 am" as a bookable test drive would be a bug in your storefront, not
 * a design decision. Nothing constrains the length of either list — the
 * groups lay out whatever you give them, in two columns.
 */
export const testDrive = {
  locations: [
    '4517 Washington Ave. Manchester, Kentucky 39495',
    '2715 Ash Dr. San Jose, South Dakota 83475',
    '6391 Elgin St. Celina, Delaware 10299',
    '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    '8502 Preston Rd. Inglewood, Maine 98380',
  ],
  times: ['07:59 pm', '11:23 pm', '12:23 pm', '04:15 am', '02:34 am', '05:36 pm'],
} as const;

/**
 * Posts per page on /blog.
 *
 * The Figma listing draws six rows (#237:866) and four page numbers, so the
 * design assumes rather more than the six posts that ship here. Set to 5 so
 * the pager it also draws (#237:946) is actually reachable with the demo
 * content: six posts become two pages. Raise it to 6 to match the frame's
 * first page exactly, at the cost of hiding the pager until you add a seventh.
 */
export const postsPerPage = 5;
