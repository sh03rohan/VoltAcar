// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Change this to your own domain before deploying — it is used for the
  // sitemap, canonical URLs, and social share metadata.
  site: 'https://voltacar.example.com',
  integrations: [sitemap()],
  image: {
    // The Figma car renders are large; allow Astro to serve modern formats.
    responsiveStyles: true,
  },
});
