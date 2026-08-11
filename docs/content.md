# Where the content lives

Not everything in this template is managed the same way, and the difference
matters before you hand the site to someone else to edit.

## Managed by the CMS

Open `/admin/` — see [`public/admin/config.yml`](../public/admin/config.yml)
for backend setup and local editing.

| What | Where | Notes |
|---|---|---|
| Blog posts | `src/content/blog/*.md` | Title, standfirst, cover, alt text, date, draft flag, body |
| Blog images | `src/assets/images/blog/` | Uploads land here automatically |

That is the whole of it: **one collection, six demo posts.**

### Images in a post body

Two on one line become the wide pair; one alone becomes the full-bleed band.
Anything else keeps the article measure.

```markdown
![alt](../../assets/images/blog/a.webp) ![alt](../../assets/images/blog/b.webp)

![alt](../../assets/images/blog/c.webp)
```

Use markdown image syntax, not raw `<img>`. Astro only optimises the former —
a hand-written tag is left unresolved and unprocessed.

### If you add a field

`cover` is declared with Astro's `image()` helper in
[`src/content.config.ts`](../src/content.config.ts), which resolves paths
**relative to the markdown file** and fails the build on anything it cannot
find. That is why the collection sets its own `media_folder` and
`public_folder` to `../../assets/images/blog` rather than uploading to
`/public`. Any new image field needs the same treatment, and the symptom of
getting it wrong is a broken `npm run build`, not a broken editor.

## Edited in code

These are TypeScript, so a git-backed CMS cannot reach them without their
being converted to data files first. They are also the things that change
once, at rebrand, rather than weekly.

| What | Where |
|---|---|
| Site name, tagline, description, URL, OG image | `src/config/site.ts` |
| Address, email, phone | `src/config/site.ts` |
| Header nav, dropdown, footer columns, socials | `src/config/site.ts` |
| Form endpoints | `src/config/site.ts` — `forms` |
| Demo drive locations and time slots | `src/config/site.ts` — `testDrive` |
| Posts per page | `src/config/site.ts` — `postsPerPage` |
| The six team members and their profiles | `src/data/team.ts` |
| Privacy policy sections | `src/pages/privacy-data.astro` |
| Every other section's headings and body copy | The component that renders it |

**Two of these ship as placeholders you are expected to replace:**
`backend.repo` in the CMS config, and the demo drive **time slots**, which are
the design's own and are random clock readings rather than appointment hours —
"02:34 am" among them.

To bring the team or the site config into the CMS, convert the file to JSON or
YAML, add a matching `files:` collection to `config.yml`, and import the data
file instead of the module. Nothing else in the template depends on their
being TypeScript.

## Design and assets

| What | Where |
|---|---|
| Colours, type scale, spacing, radii, breakpoints | `src/styles/tokens.css` |
| Global element styles | `src/styles/global.css` |
| Images | `src/assets/images/` — imported, hashed and optimised |
| Video, favicons, robots.txt | `public/` — served as-is |

Anything in `src/assets` goes through Astro's image pipeline and gets a
content hash. Anything in `public/` is copied verbatim, so put a file there
only when it must keep its exact URL.
