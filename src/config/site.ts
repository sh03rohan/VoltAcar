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

/** Header navigation. Mirrors the Figma header (#266:194). */
export const navigation: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'About us', href: '/about-us' },
  { label: 'Blog', href: '/blog' },
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
 * Posts per page on /blog.
 *
 * 6 is what the Figma listing shows (#237:866). That frame also draws four
 * page numbers, so the design assumes rather more than six posts exist — with
 * only the six that ship here there is a single page and the pager hides
 * itself. Lower this to see it working, or raise it once you have more.
 */
export const postsPerPage = 6;
