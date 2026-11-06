# Progress

## 2026-11-03: M-0 → M-5 (full site build)

Done:
- M-0: Vite + React 19 scaffold, React Router 8, Motion, Vitest + RTL, git repo, design tokens and global styles.
- M-1: Layout: logo, OrbNav (real `<button aria-expanded>`, Escape/outside-click/link-click close, focus trap, Motion spring + stagger, reduced motion), footer, skip link, scroll restoration.
- M-2: Home: hero, How I work, Selected work, Right now panel, contact CTA.
- M-3: About: hero, experience timeline, leadership, certifications + tech stack, beyond code.
- M-4: Projects (featured panel + grid) and Project detail template (`/projects/:slug`).
- M-5: Contact: hero with email button, info cards.
- Content copied verbatim from the approved designs into `src/content/*.json` (on user instruction).
- 30 tests pass (utils, content integrity, OrbNav behaviour, every route). `npm run build` passes. `npm audit`: 0 vulnerabilities.
- Visual check against the PNGs at 1440px; no horizontal overflow at 390px or 768px.

Decisions (and why):
- **No CMS, no back end**: content in JSON; nothing in the designs needs a server.
- **Contact = `mailto:` only**: the Contact design has no form, so no form service is needed.
- **Only Budget Tracker has a detail page**: it's the only case study designed/written. Other projects' links (home rows, "Next project") point to their card on `/projects#slug`. A project gets a detail page automatically once `detail` is added to its entry in `projects.json`.
- **Unknown URLs redirect home** and `/projects/<no case study>` redirects to `/projects`. There is no 404 design yet.
- **LazyMotion + `m`**: loads Motion's animation features as a separate chunk (main bundle 149 KB → 119 KB gzipped).
- **Hero sections are not fade-animated**, so the hero image/text isn't held at opacity 0 (protects LCP).
- **Mobile (no designs yet)**: two-column layouts stack at 1024px; grids go 3 → 2 → 1; section padding 112 → 80 (768px) → 64 (480px); orb 56px at 480px; large contact orb hidden below 1024px.
- **Shared links** (GitHub, LinkedIn, Email, CV) live once in `site.json` and content refers to them by `linkKey`.
- **Logic-only components** (SmartLink, Headline, Reveal, PageMeta) have no `.css` file, since there's nothing to style. Pages have no page-level CSS for the same reason.
- React Router v8: `RouterProvider` is imported from `react-router/dom` (v8 removed `react-router-dom`).

Files created / changed:
- `package.json`, `vite.config.js`, `index.html`, `.gitignore`, `public/favicon.svg`
- `src/main.jsx`, `src/routes.jsx`, `src/index.css`
- `src/components/*` (Layout, Logo, OrbNav, Footer, ButtonLink, SmartLink, Icon, SectionHeader, Headline, ImageSlot, Reveal, PageMeta)
- `src/pages/{Home,About,Projects,ProjectDetail,Contact}/**`
- `src/hooks/useDismissableMenu.js`, `src/utils/*`, `src/content/*.json`, tests

Waiting for approval:
- **Content**:
  - ~~CV PDF~~: added by user (`public/cv/Kobus-van-Schalkwyk-CV.pdf`).
  - ~~LinkedIn profile URL~~: added by user.
  - GitHub URL guessed from the username in the design: `https://github.com/ThatOneProgrammerUKnow`. Please confirm.
  - Possible typos copied from the design: "High School Stellenberg" (About intro) vs "Hoërskool Stellenberg" (education card); link text `gesingkerk.co.za` vs church name "Gesinskerk".
  - UI strings I added for accessibility (not in the designs): "Open menu", "Close menu", "Main" (nav label), "Skip to content" in `site.json`.
  - Photos + alt text (see `design.md` "Images still needed"); set `src` and `alt` in the content JSON and they replace the placeholders.
- **Designs**: mobile designs (390px / 768px), a 404 page, and case studies for Brighthire, WEG, VSI Sales and Smart Assistant if they should get detail pages.
- **Project setup**: `PROJECT.md` doesn't exist yet.

Next:
- Add photos, CV and LinkedIn once supplied; review mobile once designs exist; choose hosting (needs SPA fallback to `index.html`).

## 2026-11-03: M-6 (developer docs)
Done:
- Developer docs in `docs/`: `README.md` (start here: run commands, folder map, how a page renders, "I want to…" table, recipes), `navigation.md` (Layout + OrbNav walkthrough), `pages.md` (every page/section → file, JSON key, classes), `components.md` (shared components + props), `content-and-images.md` (editing content, links, CV, every image slot with sizes), `styling.md` (tokens, global classes, naming, breakpoints).
Decisions (and why):
- Docs live in the repo as Markdown next to the code, so they're versioned with it and readable in VS Code / GitHub.
- No line numbers in docs (they go stale); docs link to files and name classes/functions instead.
Files created / changed: docs/README.md, docs/navigation.md, docs/pages.md, docs/components.md, docs/content-and-images.md, docs/styling.md, docs/progress.md
Waiting for approval: unchanged (see previous entry).
Next: keep docs updated when sections/components change.

## 2026-11-03: M-7 (Lucide icons + burger menu icon)
Done:
- Installed `lucide-react` (approved by user) and replaced the hand-made `Icon` component everywhere (ArrowRight, ArrowUpRight, ArrowLeft, Download). `src/components/Icon/` deleted.
- `ButtonLink`'s `icon` prop now takes a Lucide component (`icon={ArrowRight}`) instead of a name string.
- Orb menu button now shows a burger icon (`Menu`) when closed and `X` when open. The orb, curved pills and animation are unchanged (user chose "burger icon in the orb").
- New test: burger/✕ swap and icons hidden from screen readers. 31 tests pass, build passes, `npm audit`: 0 vulnerabilities.
- Docs updated: README (folder map, "I want to…", tests), navigation.md (icon), components.md (Icons section, ButtonLink), styling.md (`.lucide`).
Decisions (and why):
- Lucide: its default 24px / 2px stroke / round caps matches the design.md icon spec exactly; tree-shakable (main bundle +~1 KB gzipped).
- Deviation from the approved design: `orb-nav-open.png` / design.md specify a three-dot icon; it's now a burger at the user's request. `design.md` itself was not edited (design handoff file).
Files created / changed: package.json, package-lock.json, src/index.css, src/components/ButtonLink/ButtonLink.jsx, src/components/OrbNav/OrbNav.jsx + test, 7 section files (icon imports), src/components/Icon/ (deleted), docs/*
Waiting for approval: unchanged; also consider updating design.md to say "burger icon" + "Lucide icons".
Next: as before.

## 2026-11-03: M-8 (Sanity schemas)
Done:
- Sanity Studio schemas in `studio/` (JS, `defineType`/`defineField`/`defineArrayMember`, per sanity.io/docs): singletons `siteSettings`, `homePage`, `aboutPage`, `projectsPage`, `contactPage`; document `project`; objects `accentTitle`, `link`, `imageWithAlt`.
- `studio/sanity.config.js` uses the built-in `document.singletons` API (Studio v6.17+) and `structure.js` with `.singletons()`.
- Installed the Studio in `studio/` (own package.json: sanity 6.22, react, react-dom, styled-components; approved by user). Project ID `otbb6ulw` / dataset `production` in `studio/.env` (git-ignored). Added `sanity.cli.js`.
- `npx sanity schema validate`: 0 errors, 0 warnings. `npm run dev` serves the Studio at http://localhost:3333.
- Imported all JSON content into the `production` dataset with `studio/scripts/importContent.js` (10 published documents + CV PDF asset; on user instruction, copied verbatim). `npx sanity documents validate`: 10 valid, 0 errors, 0 warnings; references resolve.
- Front end unchanged (still reads JSON). 31 tests pass, `npm run build` passes.
Decisions (and why):
- Studio in its own `studio/` folder so Sanity's dependencies never enter the front-end bundle.
- Schemas mirror the JSON shapes so content migration is a straight copy. Exceptions are listed in docs/sanity.md (projects as documents, references for "next project" and home "selected work", CV as a file upload).
- Alt text is required as soon as an image is uploaded (WCAG). The image type has no built-in alt, so it's a field on the image, as the docs show.
- This replaces the earlier "No CMS" decision, at the user's request.
- Import uses `sanity exec --with-user-token` (the CLI login) so no API token is created or stored. Fixed IDs make it re-runnable, but a re-run overwrites Studio edits.
Files created / changed: studio/** (new), docs/sanity.md (new), docs/README.md, docs/progress.md, .gitignore (.sanity)
Waiting for approval:
- **Libraries**: front end will need `@sanity/client` + `@sanity/image-url` when it switches to Sanity.
- **Security**: `npm audit` in studio/ shows 3 high / 16 moderate, all in Sanity CLI tooling (js-yaml, smol-toml, undici; dev machine only). Only fix offered is downgrading to sanity 6.1.0 (loses singletons), so not applied. Re-check after updating sanity.
- **Project setup**: `PROJECT.md` still doesn't exist; it should say "CMS: Sanity".
Next: upload photos in the Studio, then switch the front end to fetch from Sanity (`src/services/`).

## 2026-11-03: M-9 (front end reads Sanity; src/content removed)
Done:
- Front end now fetches all content from Sanity: `src/services/` (`sanity.js` fetch client, `queries.js` GROQ, `content.js` one function per page). React Router loaders in `routes.jsx`; root route loads Site settings (`useSite()` hook), pages use `useLoaderData()`.
- GROQ projections return the exact old JSON shapes, so sections are unchanged. Verified against the live dataset: identical to the JSON except the CV URL (now the Sanity file).
- `src/content/` deleted (with `content.test.js`); `utils/projects.js` deleted (the detail loader redirects instead). Import script removed (one-off, done; in git history).
- `Logo`, `OrbNav`, `Footer` take site data as props from `Layout`. Link helpers take `links` as an argument.
- Images: `ImageSlot` requests Sanity images at 2× slot width with `auto=format` (WebP/AVIF). CV downloads in place via Sanity's `?dl=`; `SmartLink` checks downloads before external links.
- New root `ErrorPage` (error boundary) when Sanity can't be reached or a page document is missing.
- CORS origins added: localhost:5173 (dev), localhost:4173 (preview).
- Tests: 37 pass (content service mocked with `src/test/fixtures.js`; new `services.test.js` for URL building, no credentials, errors; error page + CV download route tests). `npm run build` passes; main bundle 120 → 108 KB gzipped. No token-like strings in the bundle.
Decisions (and why):
- **Plain `fetch`, no `@sanity/client` / `@sanity/image-url`**: read-only public queries and CDN image params are a few lines each; avoids two dependencies.
- **Loaders in `routes.jsx`** (React Router docs pattern, not `useEffect`): content request runs in parallel with the lazy page chunk; React Router keeps the old page visible while the next one loads.
- **Shapes kept identical to the old JSON** (projection in GROQ) so no section had to change and Studio fields map 1:1 to `content.*`.
- **Links to projects derived from references**: `/projects/<slug>` with a case study, else `/projects#<slug>`.
- Content correctness (links, required fields) is now enforced by the Studio's validation (`npx sanity documents validate`) instead of `content.test.js`.
Files created / changed: src/services/* (new), src/hooks/useSite.js, src/utils/images.js, src/constants/fallbackText.js, src/components/ErrorPage/*, src/test/fixtures.js, src/services/services.test.js (new); src/routes.jsx, src/routes.test.jsx, src/utils/links.js, src/utils/utils.test.js, Layout, Logo, OrbNav (+ test), Footer, PageMeta, SmartLink, ImageSlot, 5 pages, 5 sections; .env.example (new); src/content/ and src/utils/projects.js (deleted); studio/scripts (deleted); docs/*
Waiting for approval:
- **Design**: the error page has no approved design (reuses global eyebrow/lead/button styles). No loading indicator on first visit (blank until content arrives, ~100–300 ms) because there's no design for one.
- **Content**: error-page wording in `src/constants/fallbackText.js` (only copy not in Sanity).
- **Deploy**: add the live domain to Sanity CORS origins; set `VITE_SANITY_PROJECT_ID` / `VITE_SANITY_DATASET` on the host.
- `public/cv/Kobus-van-Schalkwyk-CV.pdf` is no longer used (CV served from Sanity). Delete it?
- `PROJECT.md` still doesn't exist; it should say "CMS: Sanity".
Next: check the site in a browser (`npm run dev`), upload photos in the Studio, choose hosting.

## 2026-11-03: M-10 (Cloudflare config)
Done:
- Added `wrangler.jsonc` (supplied by user): Cloudflare Workers static assets from `./dist`, `not_found_handling: "single-page-application"` (serves `index.html` for deep links like `/projects/budget-tracker`, the SPA fallback noted earlier).
Decisions (and why):
- Hosting: Cloudflare (user's choice). Wrangler not added as a dependency; Cloudflare's build runs it.
Files created / changed: wrangler.jsonc (new), docs/progress.md, docs/sanity.md, docs/README.md
Waiting for approval:
- **Deploy setup** (in the Cloudflare dashboard): build command `npm run build`; build-time env vars `VITE_SANITY_PROJECT_ID=otbb6ulw`, `VITE_SANITY_DATASET=production`; then add the live URL (e.g. the `*.workers.dev` address and any custom domain) to Sanity CORS origins.
Next: as before.

## 2026-11-04: M-11 (home hero ring)
Done:
- Home hero ring (`.home-hero__ring`): darker blue (`--primary-hover`, #1433B8) and 20px thick on all screen sizes (was `--primary`, 34px desktop / 24px small screens). Shadow tint matched to the new blue.
Decisions (and why):
- Reused the existing palette token instead of adding a new colour.
- Removed the small-screen 24px override so the ring is never thicker on mobile than on desktop.
Files created / changed: src/pages/Home/sections/HeroSection/HeroSection.css, docs/progress.md
Waiting for approval: deviation from the approved design (home-desktop.png shows a 34px `--primary` ring), at the user's request; design.md not edited.
Next: as before.

## 2026-11-04: M-12 (hide Beyond code)
Done:
- About page no longer renders the "Beyond code" photo gallery (user request, temporary). `BeyondCodeSection` component, CSS, the Sanity schema and its content are kept.
Decisions (and why):
- Hidden in `About.jsx` rather than deleted, so restoring it is two lines (see the comment there).
Files created / changed: src/pages/About/About.jsx, docs/pages.md, docs/content-and-images.md, docs/progress.md
Waiting for approval: nothing new.
Next: show it again once the photos are ready.

## 2026-11-04: M-13 (Apps page, Budget Tracker → Funds View, beta released)
Done:
- New **Apps** page at `/apps` ("Things I built that you can use."): one card per app with **Download** (opens the download URL) and **View project** (case study, or the project's card). New `appsPage` singleton in Sanity for the copy and button labels.
- Projects get a **Download link** field (`downloadUrl`, https only). A project with one appears on the Apps page automatically and gets a small **Download app** button on the Projects page (featured panel + cards) that links to `/apps#<slug>`. Label: Projects page → `downloadCta`.
- `ButtonLink` has a new `size="sm"` (44px, still a WCAG 2.5.8 touch target).
- Content (Sanity, live now): Budget Tracker renamed to **Funds View** everywhere (project title, slug `budget-tracker` → `funds-view`, Home, About). Beta status updated: "beta is out on this site, Google Play release in the coming weeks" (Home → Right now, project Status fact, How I work step 3, meta "In progress" → "Beta"). Placeholder download link `https://example.com/funds-view-download-placeholder`. Apps page content created. Applied with a one-off `sanity exec` script (not committed); backup of all documents from before the change is in the session scratchpad. `npx sanity documents validate`: 11 valid, 0 errors.
- Design: `design/apps-desktop.png` (exported from the build at 1440px, 2x) + App card and small button specs in `design.md` (user approved Claude designing this page).
- `AGENTS.md`: live-site rules (work on `main-dev`, user merges to `main`; only push CMS content the live code can show).
- Tests: 40 pass (new: `/apps` renders, Download/View project links + safe new tab, "Download app" only on projects with a link). `npm run build` passes.
Decisions (and why):
- **Name "Apps"**: short, fits the orb menu pills, and says "things you can use" (vs. Projects = things I built).
- **Apps = projects with a download link**, not a separate list: one place to edit each app, nothing duplicated. Order follows the project `order`.
- **"Download app" goes to the Apps page, not the file** (as asked): visitors see what they're downloading first.
- **Slug renamed** to `funds-view`: the old `/projects/budget-tracker` URL now redirects to `/projects` (existing loader behaviour). Sanity document ID stays `project-budget-tracker` (IDs can't be renamed; internal only). Design file `project-budget-tracker-desktop.png` kept under its approved name.
- Screen-reader text adds the app name to each button ("Download Funds View").
Files created / changed: src/pages/Apps/** (new), studio/schemaTypes/documents/appsPage.js (new), design/apps-desktop.png (new); studio/schemaTypes/{index.js, documents/project.js, documents/projectsPage.js}; src/services/{queries.js, content.js}; src/routes.jsx, src/routes.test.jsx, src/test/fixtures.js; src/utils/links.js; ButtonLink (jsx/css); Projects.jsx, FeaturedProjectSection, ProjectGridSection; OrbNav.test.jsx (path); AGENTS.md; design/design.md; docs/README.md, pages.md, sanity.md, components.md, content-and-images.md, navigation.md, progress.md
Waiting for approval:
- **Menu item for Apps (do after merging to `main`)**: Studio → Site settings → Menu → Items: add `04 · Apps · /apps` and renumber Download CV → 05, Contact → 06. Not added yet because the live site would send `/apps` to the home page until this code is deployed. (Or ask Claude to add it.)
- **Content**: real download URL (Project "Funds View" → Download link). Platforms fact still says "Google Play & App Store"; change if the App Store isn't planned.
- **Design**: no phone design for the Apps page (adapted as described in design.md).
Next: merge `main-dev` → `main`, add the menu item, replace the placeholder download link, add app screenshots.

## 2026-11-05: M-14 (Studio online at /studio)
Done:
- Sanity Studio deployed to https://kobus-portfolio.sanity.studio (`studioHost` + `deployment.appId` in `studio/sanity.cli.js`). This also deployed the M-13 schemas (Apps page, Download link) to the hosted Studio.
- `public/_redirects`: `/studio` and `/studio/*` → hosted Studio (302, Cloudflare static-assets redirect file). Build copies it to `dist/`.
- Docs: sanity.md (Online Studio), README.md.
Decisions (and why):
- Redirect to Sanity's hosting instead of embedding the Studio in the site (user chose the recommended option): no new website dependencies, no effect on site speed, Sanity's tooling audit issues stay out of the website.
- 302 (temporary), so the target can change later without browsers caching the redirect.
Files created / changed: public/_redirects (new), studio/sanity.cli.js, docs/sanity.md, docs/README.md, docs/progress.md
Waiting for approval: push `main` to deploy M-13 + M-14, then add the Apps menu item (see M-13). The /studio redirect can only be tested after deploying.
Next: deploy, test yoursite/studio, add the menu item.

## 2026-11-05: M-15 (My products in the menu)
Done:
- Sanity → Site settings → Menu: added **04 · My products · /apps** after Projects; Download CV → 05, Contact → 06 (live now; M-13's /apps is already deployed).
- Found why yoursite/studio didn't work: M-14 (`public/_redirects`) was on `main-dev` but not merged into `main`, so Cloudflare never deployed it. Pushed `main-dev`; the user opens/merges the PR main-dev → main.
Decisions (and why):
- Menu label "My products" (user's wording); the page itself still says "Apps" in its eyebrow / tab title. Can be changed in Studio → Apps page → Hero → Eyebrow.
Files created / changed: docs/progress.md (content change only in Sanity)
Waiting for approval: merge the PR, then test yoursite/studio.
Next: replace the placeholder download link.

## 2026-11-05: M-16 (fix Cloudflare preview builds)
Done:
- Preview builds of `main-dev` (commits 9dff351, d00990e) failed: Cloudflare's preview deploy command is `npx wrangler preview` (open beta), which errors without a `previews` block in the Wrangler config. Added `"previews": {}` to `wrangler.jsonc`. Not caused by `_redirects` (production `wrangler deploy --dry-run` passes with it).
Decisions (and why):
- Fixed in config (as the Wrangler error asks) rather than changing the dashboard deploy command, so it's versioned with the code.
Files created / changed: wrangler.jsonc, docs/progress.md
Waiting for approval: check the new preview build on the PR, then merge main-dev → main and test yoursite/studio.
Next: as before.

## 2026-11-05: content (Funds View download link)
Done:
- Sanity → Project "Funds View" → Download link set to https://github.com/Orbtech-Solutions/FundsViewer-releases/releases/latest (replaces the placeholder; live now). Link checked (200).
Files created / changed: docs/progress.md (content change only in Sanity)
Waiting for approval: nothing new.

## 2026-11-05: M-17 (My products page, new design)
Done:
- `/apps` rebuilt from the new design `design/2026-11-05/My Products.png` (folder renamed from `2026-05-11` to ISO date order): "Funds View is in beta." header with badge, blue app card (icon, tagline, Download fundsviewer.apk, note) next to 5 numbered install steps, "What beta means" cards, roadmap (Now / December 2026 / Later), blue "Read more about Funds View" link.
- Everything on the page is editable in Studio → **Apps page** (new fields: Browser tab title, App (project reference), Header, App card incl. **App icon**, How to install, What beta means, Roadmap, Read more). Download URL, app name and case-study link come from the chosen project.
- New `richText` Sanity type (bold + https/mailto links) and `RichText` component (no HTML strings, unsafe links render as text). New shared `Badge` component (Home hero now uses it too).
- Outdated bits of the design built the current way: orb uses the burger icon (not three dots), `[icon]` placeholder → real icon.
- Removed `AppListSection` and `design/apps-desktop.png` (replaced). design.md, pages.md, components.md, sanity.md, content-and-images.md, README.md updated.
- Tests: 43 pass (new: RichText, isSafeHref, Apps page download/steps/rich text/read-more). `npm run build` passes. `sanity schema validate`: 0 errors.
Decisions (and why):
- **One app, not a list**: the design is a single-app page. The app is a reference to a Project so the download link stays in one place (the project's Download link, also used by the Projects page buttons).
- **Rich text built in-house** (~30 lines) instead of adding `@portabletext/react`: only bold + links are needed.
- **New content under new field names** (`header`, `card`, …): the live `main` site still reads the old `hero` / `downloadLabel` / `viewProjectLabel`, so they stay (hidden in Studio) until this is merged.
- Download link should point straight at the APK (`…/releases/latest/download/fundsviewer.apk`, checked: 200, APK) since the button and step 1 say "Download fundsviewer.apk"; `latest` means new releases need no content change.
Files created / changed: src/pages/Apps/** (InstallSection, BetaSection, RoadmapSection, ReadMoreSection new; AppListSection removed), src/components/{Badge,RichText}/** (new), Home HeroSection (jsx/css), src/services/queries.js, src/utils/{links.js, utils.test.js}, src/routes.test.jsx, src/test/fixtures.js, studio/schemaTypes/{objects/richText.js (new), documents/appsPage.js, documents/project.js, index.js}, design/design.md, design/2026-11-05/My Products.png, design/apps-desktop.png (deleted), docs/*
Waiting for approval:
- **Sanity content not written yet** (the permission check blocked writing to the live dataset). Script ready: `studio/tmp-apps-content.js` (not committed). It backs up appsPage + Funds View, uploads `public/fundsviewer-icon-coin-lens-money.svg` as the App icon, fills in all the new fields with the design's text, and sets the Funds View Download link to the direct APK URL. Old fields are left alone, so the live site is unaffected.
- After merging `main-dev` → `main`: deploy the Studio (`cd studio && npm run deploy`) so the new fields show in the hosted Studio, then remove the hidden old fields from `appsPage.js` and unset them.
- `public/fundsviewer-icon-coin-lens-money.svg` can be deleted once uploaded to Sanity (not committed).
- **Design**: no phone design for this page (adapted as described in design.md).
Next: run the content script, merge, deploy Studio, clean up old fields.

## 2026-11-06: M-18 (fix live My products page, rename Apps → My products)
Done:
- Found why the live `/apps` showed "This page couldn't load": M-17 was merged and deployed, but its Sanity content was never written (the write was blocked by the permission check), so the new fields (`header`, `card`, …) were missing. Fix = run the content script (see Waiting).
- Renamed the page: route `/apps` → **`/my-products`** (old `/apps` and `/apps#slug` redirect, keeping the `#slug`), `src/pages/Apps` → `src/pages/MyProducts`, `AppsHeroSection` → `MyProductsHeroSection` (`.my-products-hero`), `getAppsPage`/`APPS_QUERY` → `getMyProductsPage`/`MY_PRODUCTS_QUERY`, `appsHref` → `myProductsHref`. Studio shows **My products page**.
- Removed the hidden old Apps-list fields from the schema (no deployed code reads them any more).
- Tests: 44 pass (new: `/apps#alpha` → `/my-products#alpha`). `npm run build` passes. `sanity schema validate`: 0 errors.
- Fixed leftover old Apps-list text in docs/pages.md.
Decisions (and why):
- Sanity document type/ID stay `appsPage`: they're internal and renaming means migrating the document; only the Studio title changed (same as `project-budget-tracker`).
- Client-side redirect from `/apps` so the current menu item, old links and bookmarks keep working.
Files created / changed: src/pages/MyProducts/** (moved from Apps), src/routes.jsx, src/routes.test.jsx, src/services/{content.js, queries.js}, src/utils/links.js, src/test/fixtures.js, Projects FeaturedProjectSection + ProjectGridSection, studio/schemaTypes/documents/{appsPage.js, project.js, projectsPage.js}, design/design.md, docs/*
Waiting for approval:
- **Run the content script now (fixes the live page)**: `cd studio && npx sanity exec tmp-apps-content.js --with-user-token -- ../public/fundsviewer-icon-coin-lens-money.svg backup-apps.json` (writes the page content + icon, badge "My Products · Beta release", unsets the old fields, sets the direct APK download link). Then delete `tmp-apps-content.js`, the backup file and `public/fundsviewer-icon-coin-lens-money.svg`.
- After merging `main-dev` → `main`: Studio → Site settings → Menu → My products: path `/apps` → `/my-products` (until then `/apps` keeps working via the redirect on the new code, and is the only URL the live code knows). Deploy the Studio (`cd studio && npm run deploy`).
Next: as above.
