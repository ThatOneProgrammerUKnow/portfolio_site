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
