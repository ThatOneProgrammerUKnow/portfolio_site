# AGENTS.md

Generic rules for every OrbTech website (company, portfolio and client sites).
Project-specific details live in `PROJECT.md`. If `PROJECT.md` disagrees with this file on a path or naming convention, `PROJECT.md` wins.

When unsure what the user means, **ask before building**.

## Workflow (every site)

1. **Plan** (Claude chat): pages, content per page, spec notes. No code.
2. **Design** (Claude Design): approved designs exported to `design/` as PNGs + `design.md`.
3. **Content**: final text in `src/content/*.json` (or the CMS).
4. **Build** (Claude Code): only from approved `design/` + `content/`, in milestones.

A chat agent in steps 1–3 designs and hands over files; it does not write app code.

---

## 1. Start of every session

1. Read `PROJECT.md`: client, CMS, extra stack, where docs live.
2. Read `docs/progress.md`: current milestone, what's done, what's waiting.
3. Read only the docs relevant to the task:
   - `design/design.md` + its images: what it must look like
   - `src/content/`: what it must say
   - `spec/` (or wherever `PROJECT.md` points): client meeting notes, look & feel, requirements, design principles
4. Do a quick security check of the area you're about to work on (see §7).

If the user says "continue", "continue with M-2" or asks about progress, answer from `docs/progress.md` and the git log.

---

## 2. Stack

- React (JavaScript, `.jsx`) with Vite
- React Router
- Motion (motion.dev, formerly Framer Motion) for animation
- Plain CSS, one `.css` file per component. No Tailwind, no CSS Modules.
- npm
- Testing: Vitest + React Testing Library
- Headless CMS: **Sanity**, used only when `PROJECT.md` says so. Otherwise content lives in `src/content/`.
- Optional: Java Spring Boot back end (details in `PROJECT.md`)

---

## 3. Structure & naming

```
src/
  components/
    Navbar/
      Navbar.jsx
      Navbar.css
  pages/
    Home/
      Home.jsx
      Home.css
      sections/
        HeroSection/
          HeroSection.jsx
          HeroSection.css
  content/          → one JSON file per page (home.json, about.json)
design/             → design.md + PNG exports
spec/               → client notes, requirements, look & feel
docs/progress.md    → session log
```

- Every component and section gets its own folder containing `Name.jsx` + `Name.css`.
- Sections always end in `Section` (`HeroSection`, `ServicesSection`).
- Section files live inside their page's `sections/` folder. Shared components go in `components/`.

---

## 4. Principles

- **SOLID, KISS, DRY, YAGNI.** Build only what is needed now.
- **Separation of concerns**: logic goes in custom hooks or utils, UI in components, text in `content/` or the CMS.
- **Composition over inheritance**: combine small components and pass `children`/props. Never build class hierarchies.
- **Accessibility-first (WCAG 2.2 AA)**:
  - semantic HTML (`<button>`, `<nav>`, `<main>`)
  - headings in order
  - alt text on images and labels on form fields
  - contrast of at least 4.5:1 and visible focus styles
  - respect `prefers-reduced-motion` (Motion's `useReducedMotion`)
- **Desktop-first**: base CSS targets desktop, and `max-width` media queries adapt it for smaller screens. Breakpoints come from `design.md`.
- **Performance** (target Core Web Vitals "good": LCP < 2.5s, INP < 200ms, CLS < 0.1):
  - lazy-load pages (`React.lazy` / React Router lazy routes)
  - `loading="lazy"` on below-the-fold images
  - hero image eager with `fetchpriority="high"`
  - WebP/AVIF, sized to fit their slot, always with `width` and `height`

---

## 5. Official docs are the source of truth

Before implementing anything, check the official docs first, especially for state, effects, data fetching and security:
react.dev · reactrouter.com · motion.dev · vite.dev · vitest.dev · testing-library.com · sanity.io/docs

- Never use patterns the docs discourage. Example: using `useEffect` for derived state (see "You Might Not Need an Effect").
- **State**: keep it as local as possible and derive values instead of duplicating them. Lift state up only when it's shared, and use Context only for truly global values. No state library unless approved.
- **APIs**: keep fetching logic in one place (`src/services/` or custom hooks). Always handle loading and error states, and never trust external data.
- If the docs contradict something here, follow the docs and tell the user.

---

## 6. Things that need approval

### Libraries
Never install a dependency without approval. When something is needed (icons, a calendar, a carousel), decide whether to build it or use a library, recommend one option with a reason, and let the user choose.

If the user is away (or said they're going out):
- simple to build → build it yourself
- the obvious, safe industry standard (React Router level) → use it
- otherwise → skip it, log it under "Waiting for approval", and continue with other work

### Design
Never build UI without an approved design in `design/`. If one is missing, stop that piece, tell the user exactly what's needed (which page or section, which breakpoints), and continue with other work.

### Content
- Never add, change or reword anything in `src/content/` or the CMS without being told to.
- All user-facing text comes from `content/` or the CMS. Never hardcode copy in components.
- Where content is missing, use lorem ipsum and list it in `progress.md`.

### Spec
Follow `spec/`. If a spec is unclear or conflicts with the design, ask.

---

## 7. Security: check at the start AND end of every session

- No secrets in code or git. `.env` goes in `.gitignore`, and commit only an `.env.example` with no values.
- Anything in front-end env vars (`VITE_*`) is **public**. Secret keys belong only on the back end or CMS server.
- Sanity: the front end reads published content without a token. Never put a Sanity API token (especially a write token) in front-end code.
- No `dangerouslySetInnerHTML` unless the content is sanitised and the user approved it.
- Validate user input on the client, and **always** on the server too.
- HTTPS only. Use `rel="noopener noreferrer"` on external links.
- Run `npm audit` when dependencies change and report any high or critical issues.
- Spring Boot: follow the OWASP Top 10 and the Spring Security docs.
- If unsure whether a practice is still current, check the official docs or OWASP. Don't rely on memory.

---

## 8. Milestones, commits, tests

- Work is split into milestones: `M-0`, `M-1`, `M-2`, and so on.
- Commit format: `M-1: add hero section`. Keep commits small and focused.
- **Branches once a site is live**: `main` is what's deployed. Do all work on `main-dev` (create it from `main` if it doesn't exist). Never commit to, merge into or push to `main`; the user reviews and merges `main-dev` → `main` themselves.
- **Live CMS content**: the CMS has one dataset that the live site reads, so content edits go live immediately, before the code is merged. Only make content changes that the live `main` code can already display. Changes that need the new code (e.g. a menu item for a new page) wait until the user has merged, and are listed under "Waiting for approval".
- Write tests while building. **At the end of each milestone**:
  - run the full test suite
  - run `npm run build`
  - fix any failures before marking the milestone done
- Use credits efficiently: read only what you need and don't redo finished work. **Never** skip quality, security or tests to save credits.

---

## 9. End of every session

Append to `docs/progress.md`:

```
## YYYY-MM-DD: M-1
Done:
Decisions (and why):
Files created / changed:
Waiting for approval: (libraries / designs / content)
Next:
```

Then give the user the same short summary in chat.
