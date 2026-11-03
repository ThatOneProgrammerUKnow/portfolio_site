# Styling

Plain CSS: one global file plus one `.css` file per component/section. No Tailwind, no CSS Modules. Visual source of truth: [design/design.md](../design/design.md).

## Where styles live

| File | Contains |
|---|---|
| [src/index.css](../src/index.css) | design tokens (`:root`), reset, global helper classes, reduced-motion rules |
| `src/components/<Name>/<Name>.css` | that component only |
| `src/pages/<Page>/sections/<Name>/<Name>.css` | that section only |

Each `.jsx` file imports its own CSS (`import './HeroSection.css';`). All CSS ends up global, so **class names must be unique**. The naming pattern below guarantees that.

---

## Design tokens (`:root` in `index.css`)

Use these variables instead of raw values, so a change in one place updates the whole site.

**Colours**

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F6F7F9` | page background |
| `--surface` | `#FFFFFF` | cards, white bands, footer |
| `--surface-muted` | `#E9EDF5` | image placeholders |
| `--text` | `#0E1726` | headings, body, dark buttons |
| `--text-muted` | `#5A6474` | secondary text |
| `--primary` | `#2450FF` | blue accent, buttons, links, orb |
| `--primary-hover` | `#1433B8` | hover |
| `--primary-light` | `#8FA8FF` | orb highlight |
| `--primary-soft` | `#DCE4FF` | soft rings (timeline dot, CTA orb) |
| `--on-primary-muted` | `#E8EDFF` | labels on blue panels |
| `--border`, `--border-strong`, `--border-stronger` | greys | card, chip and secondary-button borders |

**Effects:** `--orb-gradient`, `--orb-shadow`, `--shadow-primary` (blue button), `--shadow-float` (floating tags / pills / card hover)

**Fonts** (loaded from Google Fonts in `index.html`)

| Token | Font | Used for |
|---|---|---|
| `--font-display` | Space Grotesk 700 | headings |
| `--font-body` | Inter 400/600 | body, buttons |
| `--font-mono` | IBM Plex Mono 400/500 | eyebrows, meta lines, labels |

**Layout:** `--content-max: 1200px`, `--gutter: clamp(16px, 4vw, 40px)`, `--section-pad: 112px` (80 at ≤768, 64 at ≤480)

**Radii:** `--radius-pill` (999px), `--radius-card` (28), `--radius-card-lg` (32), `--radius-panel` (40), `--radius-image` (18)

---

## Global helper classes

Use these in any component.

| Class | Does |
|---|---|
| `.container` | centres content, max 1200px wide, side padding |
| `.section` | vertical padding (`--section-pad`) |
| `.section--surface` | white background with top/bottom border (white "bands") |
| `.section--flush-top` | no top padding, for sections that follow another on the same background |
| `.display` | huge H1 style (48–92px) |
| `.h2` | section heading style (36–56px) |
| `.h3` | card heading style (24–28px) |
| `.lead` | 19px grey intro paragraph |
| `.muted` | grey text |
| `.mono` | 13px IBM Plex Mono |
| `.eyebrow` | 14px blue mono label (above headings) |
| `.highlight` | blue text |
| `.lift` | card lifts 3px with a shadow on hover (off for reduced motion) |
| `.visually-hidden` | hidden on screen, still read by screen readers |

A typical section:

```jsx
<section className="section section--surface how-i-work">
  <div className="container">…</div>
</section>
```

---

## Class naming

A simple BEM-style pattern: **`block__element--modifier`**

- **Block** = the section or component, in kebab-case: `home-hero`, `project-row`, `orb-nav`
- **Element** = a part inside it: `home-hero__title`, `project-row__image`
- **Modifier** = a variation: `button--primary`, `home-hero__tag--dark`
- **State** = `is-…`, toggled by code: `is-active` (current menu pill), `is-current` (timeline), `is-open` (orb)

So `.home-hero__tag--dark` reads as "in the home hero, a tag, the dark variant". Search a block name (e.g. `home-hero`) to find all its styles and markup. [pages.md](pages.md) lists every page's blocks.

---

## Responsive (desktop-first)

Base CSS targets desktop (the 1440px designs). Smaller screens are handled with `max-width` media queries **at the bottom of each CSS file**:

| Breakpoint | Typical changes |
|---|---|
| `@media (max-width: 1024px)` | two-column layouts stack (heroes, timeline, story rows), 3-col grids → 1 or 2, footer centres |
| `@media (max-width: 768px)` | 2-col grids → 1, section padding 80px, project rows stack |
| `@media (max-width: 480px)` | phones: smaller orb, full-width buttons, section padding 64px |

Mobile designs don't exist yet; these are sensible adaptations (logged in [progress.md](progress.md)).

---

## Motion & reduced motion

- Animation uses **Motion** (motion.dev): the orb menu (`OrbNav.jsx`) and scroll fade-ups (`Reveal.jsx`).
- Hover effects (`.lift`, button lift) are plain CSS transitions.
- Everything respects the visitor's **reduced motion** setting: JS animations via `useReducedMotion()`, CSS via `@media (prefers-reduced-motion: reduce)` / `no-preference`. Keep doing this for anything new.

## Accessibility checklist for new styles

- Text contrast at least **4.5:1**. All token pairs above pass (e.g. white on `--primary`, `--text-muted` on `--bg`).
- Never remove focus outlines. The global `:focus-visible` gives a 3px blue outline; card links show it on the whole card via `:has(…:focus-visible)`.
- Interactive targets at least 44px tall (buttons are 54px, pills 44px).
