import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
/* Astro 7 deprecates re-exporting `z` from astro:content. zod was already in
   the tree as one of Astro's own dependencies; it is declared in package.json
   so the reliance is explicit rather than a hoisting accident. */
import { z } from 'zod';

/**
 * Blog posts — Figma listing #237:866, single post #83:527.
 *
 * The schema is deliberately close to what the design actually shows: a
 * title, a standfirst and a cover image. The frames carry no date, author or
 * tag anywhere, so none is invented.
 *
 * `publishedAt` is the one field with no counterpart in the design. It earns
 * its place by ordering the listing — without it the posts would come out in
 * whatever order the filesystem returns — and by giving the CMS something to
 * sort on. It is not rendered.
 *
 * Images live in `src/assets/images/blog` and are declared with `image()` so
 * Astro validates the path at build time and hands the page an optimisable
 * asset rather than a bare string.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      /** Card heading and the single post's H1. */
      title: z.string(),
      /** Card standfirst, and the meta description for the post's page. */
      description: z.string(),
      cover: image(),
      /**
       * Empty is legitimate: the cover repeats the title's subject on every
       * card, so it is decoration rather than content on the listing.
       */
      coverAlt: z.string().default(''),
      /** Orders the listing, newest first. Not shown anywhere. */
      publishedAt: z.coerce.date(),
      /** Keeps a post out of the listing and out of the build. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
