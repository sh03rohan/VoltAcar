/**
 * VoltACar — central site configuration.
 *
 * This is the one file to edit when rebranding the template. Nothing below
 * is hard-coded anywhere else in the project.
 */

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

export const social = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'Facebook', href: 'https://facebook.com/' },
  { label: 'Twitter', href: 'https://twitter.com/' },
] as const;

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
 * Example: 'https://formspree.io/f/xxxxxxxx'
 */
export const forms = {
  newsletter: '',
  testDrive: '',
} as const;

/** Number of blog posts per page on /blog. */
export const postsPerPage = 6;
