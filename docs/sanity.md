# Sanity

All site content lives in Sanity (project `otbb6ulw`, dataset `production`). Two halves:

- **Studio** ([`studio/`](../studio/)): where content is edited. Its own app with its own `package.json`.
- **Front end** ([`src/services/`](../src/services/)): fetches published content from Sanity's CDN with plain `fetch`. No Sanity library, no token.

How to edit content: [content-and-images.md](content-and-images.md).

## Studio files

```
studio/
  package.json              the Studio's own dependencies (separate from the website)
  sanity.config.js          Studio config: schema, structure, singletons
  sanity.cli.js             CLI config (project ID + dataset)
  structure.js              sidebar: pages + site settings, then Projects
  .env.example              SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET (public IDs, not secrets)
  schemaTypes/
    index.js                exports `schemaTypes` + `SINGLETON_TYPES`
    fields.js               helpers: requiredString, headingFields, stringList, section, ...
    objects/
      accentTitle.js        { before, highlight, after } headline
      link.js               { label, to | linkKey }, exactly one target
      imageWithAlt.js       image + alt (required once an image is uploaded) + placeholder
      richText.js           short rich text: paragraphs + bullet lists with bold + links (https / mailto)
    documents/
      siteSettings.js       name, email, shared links, CV, menu, footer   (singleton)
      homePage.js           (singleton)
      aboutPage.js          (singleton)
      projectsPage.js       Projects page copy + case-study labels        (singleton)
      appsPage.js           My products page: chosen app + all its copy (singleton; type/ID stay `appsPage`)
      contactPage.js        (singleton)
      project.js            one document per project, ordered by `order`
      privacyPolicy.js      one app's privacy policy (/my-products/<slug>/privacy-policy)
```

Singleton document IDs equal their type name (`siteSettings`, `homePage`, …); that's what `document.singletons: ['homePage', …]` uses. Projects have IDs like `project-brighthire`. (Funds Viewer keeps its original ID `project-budget-tracker`: IDs are internal and can't be renamed; only its title and slug changed.)

## Front-end files

| File | Does |
|---|---|
| `src/services/sanity.js` | builds the query URL (`https://<project>.apicdn.sanity.io/v2025-02-19/data/query/<dataset>`, `perspective=published`) and fetches it. Reads `VITE_SANITY_PROJECT_ID` / `VITE_SANITY_DATASET` from the root `.env`. |
| `src/services/queries.js` | GROQ queries. Each **projection returns exactly the shape the sections expect** (the shape of the old JSON files), so components don't know about Sanity. |
| `src/services/content.js` | `getSite`, `getHomePage`, `getAboutPage`, `getProjectsPage`, `getMyProductsPage`, `getProjectDetail(slug)`, `getContactPage`. A missing page document throws (→ error page). |
| `src/routes.jsx` | route **loaders** call those functions; the root route loads Site settings (`useSite()`), each page loads its document (`useLoaderData()`). Loaders sit in `routes.jsx`, not in the lazy page files, so the request runs in parallel with the page's JS. |
| `src/components/ErrorPage/` | root error boundary when a request fails |

What the queries derive (so the Studio doesn't store it twice):

| Field the components get | Built from |
|---|---|
| `links.email.href` | `"mailto:" + email` |
| `links.cv.href` | the uploaded PDF's CDN URL + `?dl=<original file name>` (forces download) |
| project `slug` | `slug.current` |
| My products page `app` | the referenced project: `title`, `downloadUrl`, `to` (its case study or card) |
| rich text (`text` in install steps / beta cards) | Portable Text blocks, trimmed to `_key`, `children { text, marks }`, `markDefs { href }` |
| project `detail` | `detail`, only if `hasCaseStudy` is on (otherwise `null`) |
| a project link's `to` (Home rows, "Next project") | `/projects/<slug>` with a case study, else `/projects#<slug>` |
| image `src` | `asset->url`; `ImageSlot` adds `?w=<2× width>&auto=format` via `utils/images.js` |

Arrays that sections `.map()` over are wrapped in `coalesce(..., [])`, so an emptied field can't crash a page.

**Changing a schema?** Update the matching projection in `queries.js` and the fake data in `src/test/fixtures.js`.

## Online Studio

The Studio is hosted by Sanity at **https://kobus-portfolio.sanity.studio** (log in with Email / Password). The website forwards **yoursite/studio** there: `public/_redirects` (Cloudflare's redirect file, copied into `dist/` by Vite) sends `/studio` and `/studio/*` to it with a 302. That only works on Cloudflare, not in `npm run dev` / `preview` (there `/studio` hits the site's catch-all route and lands on Home).

After changing a schema, redeploy the Studio: `cd studio && npm run deploy` (host and app ID are set in `sanity.cli.js`, so it doesn't prompt). Only members of the Sanity project can log in, so the public URL is safe.

## Run the Studio locally

```bash
cd studio
npm install                       # once
cp .env.example .env              # once: SANITY_STUDIO_PROJECT_ID=otbb6ulw, SANITY_STUDIO_DATASET=production
npm run dev                       # Studio at http://localhost:3333
npx sanity schema validate        # check the schemas
npx sanity documents validate     # check all content against the schemas
```

Studio version: sanity 6.22 (needs v6.17+ for `document.singletons`).

**Logging in:** use the same login method as your Sanity account. Google, GitHub and email/password are **separate** Sanity users, even with the same address. In the Studio, pick "Email / password". For the CLI: `npx sanity login --provider sanity`. If you're logged in with the wrong method, sign out (CLI: `npx sanity logout`; browser: account menu on sanity.io) and log in again.

**`npm audit`** (2026-11-03): 3 high, 16 moderate, all in Sanity's own CLI/build tooling (`js-yaml`, `smol-toml`, `undici`). They run only on your machine, not on the website. npm's only fix is downgrading to sanity 6.1.0, which drops the singleton API, so it wasn't applied. Re-check after `npm update sanity`.

## History

The content was first written as `src/content/*.json` and imported once with a script (`studio/scripts/importContent.js`, removed afterwards; see git history, M-8). Sanity is now the only source.

## Security

- The front end reads **published** content without a token. Never put a Sanity API token in `VITE_*` variables or front-end code (`services.test.js` checks no credentials are sent).
- Uploaded files and images are public on Sanity's CDN.
- **CORS origins** (sanity.io/manage → API, or `npx sanity cors add <origin> --no-credentials` in `studio/`): currently `http://localhost:3333` (Studio), `http://localhost:5173` (dev), `http://localhost:4173` (preview). **Add the live domain before deploying**, or the site will show its error page.
- Hosting is Cloudflare (`wrangler.jsonc`). Set `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` as **build** variables in the Cloudflare dashboard (Vite bakes them in at build time; runtime variables won't work).
