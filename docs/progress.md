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
  - CV PDF → place at `public/cv/Kobus-van-Schalkwyk-CV.pdf` (all "Download CV" links currently 404).
  - LinkedIn profile URL (currently `https://www.linkedin.com/` in `site.json`).
  - GitHub URL guessed from the username in the design: `https://github.com/ThatOneProgrammerUKnow`. Please confirm.
  - Possible typos copied from the design: "High School Stellenberg" (About intro) vs "Hoërskool Stellenberg" (education card); link text `gesingkerk.co.za` vs church name "Gesinskerk".
  - UI strings I added for accessibility (not in the designs): "Open menu", "Close menu", "Main" (nav label), "Skip to content" in `site.json`.
  - Photos + alt text (see `design.md` "Images still needed"); set `src` and `alt` in the content JSON and they replace the placeholders.
- **Designs**: mobile designs (390px / 768px), a 404 page, and case studies for Brighthire, WEG, VSI Sales and Smart Assistant if they should get detail pages.
- **Project setup**: `PROJECT.md` doesn't exist yet.

Next:
- Add photos, CV and LinkedIn once supplied; review mobile once designs exist; choose hosting (needs SPA fallback to `index.html`).
