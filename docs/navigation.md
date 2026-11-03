# Navigation & page shell

Everything that appears on **every** page: skip link, logo, the orb menu, and the footer.

## The shell: `Layout`

File: [src/components/Layout/Layout.jsx](../src/components/Layout/Layout.jsx)

`routes.jsx` makes `Layout` the parent of every page, so it wraps them all:

```jsx
<LazyMotion features={loadMotionFeatures} strict>   // loads Motion's animation code on demand
  <a href="#main" className="skip-link">…</a>        // hidden until you press Tab
  <header className="site-header container">
    <Logo />                                          // top-left: blue dot + name
  </header>
  <OrbNav />                                          // top-right: the blue orb menu
  <main id="main" tabIndex={-1}>
    <Outlet />                                        // ← the current page renders here
  </main>
  <Footer />
  <ScrollRestoration />                               // scroll to top / #anchor on navigation
</LazyMotion>
```

| Piece | Files | Content from |
|---|---|---|
| Skip link | `Layout.jsx`, `Layout.css` (`.skip-link`) | `site.json → skipLink` |
| Logo | `components/Logo/Logo.jsx`, `Logo.css` (`.logo`, `.logo__dot`) | `site.json → name` |
| Orb menu | `components/OrbNav/OrbNav.jsx`, `OrbNav.css` | `site.json → nav` |
| Footer | `components/Footer/Footer.jsx`, `Footer.css` | `site.json → footer`, `links` |

---

## The orb menu: `OrbNav`

Files:
- [src/components/OrbNav/OrbNav.jsx](../src/components/OrbNav/OrbNav.jsx): markup + animation
- [src/components/OrbNav/OrbNav.css](../src/components/OrbNav/OrbNav.css): looks + position
- [src/hooks/useDismissableMenu.js](../src/hooks/useDismissableMenu.js): Escape, click-outside, focus trap
- [src/utils/orbCurve.js](../src/utils/orbCurve.js): the curve the pills follow
- [src/components/OrbNav/OrbNav.test.jsx](../src/components/OrbNav/OrbNav.test.jsx): its tests

### What it renders

```
<nav class="orb-nav" aria-label="Main">          fixed, top-right
  <button class="orb-nav__button" aria-expanded>  the 64px blue orb
    <svg>  three dots (closed)  or  ✕ (open)       ← the icon, drawn inline
  </button>
  <ul class="orb-nav__list">                      only exists while open
    <li> <a class="orb-nav__pill [is-active]">
           <span class="orb-nav__number">01</span> <span>Home</span>
         </a> </li>
    … one <li> per item in site.json → nav.items
  </ul>
</nav>
```

### Step by step through the code

1. **State.** `const [isOpen, setIsOpen] = useState(false)` is the only state. The button's `onClick` toggles it.
2. **The icon.** Inside the `<button>` there's an inline `<svg>`. When `isOpen` is true it draws a `<path>` (✕). Otherwise it draws three `<circle>`s (the dots). To change the icon, edit those SVG elements. Its colour comes from `color: #fff` on `.orb-nav__button` via `currentColor`.
3. **Accessibility on the button.**
   - `aria-expanded={isOpen}` tells screen readers whether the menu is open.
   - `aria-label` switches between `site.json → nav.openLabel` and `nav.closeLabel`, because the button has no visible text.
   - `aria-controls` points at the list's id while open.
4. **The list.** `{isOpen && <m.ul>…}` sits inside `<AnimatePresence>`. Motion keeps the list mounted long enough to play its exit animation after `isOpen` becomes false.
5. **Each pill.** Items are mapped from `nav.items`:
   - an item with `to` (e.g. `"/about"`) renders a React Router `<NavLink>`. NavLink knows if it's the current page, so it gets the `is-active` class (blue pill) and `aria-current="page"`. `end` is only set for Home (`/`), so **Projects stays active on `/projects/budget-tracker`**.
   - an item with `linkKey` (e.g. `"cv"`) renders a `SmartLink` to `site.json → links.cv.href`. Because that's a `.pdf`, it gets the `download` attribute.
   - clicking any pill calls `close()`.
6. **The curve.** The open pills curve away from the orb (first and last line up with it, the middle sticks out furthest). `orbCurveOffset(index, count)` returns an x-offset in px: `-48 × sin(π × index / (count − 1))`. With 5 items that's `0, −34, −48, −34, 0`. Change `depth` (48) in `orbCurve.js` for a stronger or flatter curve. It adapts automatically if you add or remove items.
7. **The animation** (`pillVariants` at the top of `OrbNav.jsx`):
   - `hidden`: invisible, 32px further right, scaled to 0.85
   - `visible`: springs into place, each pill delayed by `index × STAGGER` (`STAGGER = 0.04` → 40ms)
   - `exit`: fades back out, last pill first
   - if the visitor has **reduced motion** turned on (`useReducedMotion()`), every transition has `duration: 0`, so pills appear instantly.
8. **Closing behaviour.** `useDismissableMenu(navRef, isOpen, close)` adds document listeners **only while open**:
   - **Escape** closes the menu and puts focus back on the orb.
   - **Clicking anywhere outside** the `<nav>` closes it.
   - **Tab / Shift+Tab** wrap around inside the menu (orb → pills → orb), so keyboard users can't tab "behind" it.

### Where the CSS positions things

| Class | What it does |
|---|---|
| `.orb-nav` | `position: fixed; top: 24px; right: 24px;` with a 64×64 box. Move the whole menu here. |
| `.orb-nav__button` | the orb: size, `--orb-gradient`, `--orb-shadow`, white icon colour, hover glow |
| `.orb-nav__list` | the pill column: `top: 10px` (first pill centred on the orb), `right: 80px` (64px orb + 16px gap), `gap: 12px` (44px pill + 12 = 56px rhythm) |
| `.orb-nav__pill` | one white pill, 44px tall |
| `.orb-nav__pill.is-active` | the current page's blue pill |
| `.orb-nav__number` | the mono `01`, `02`… label |
| `@media (max-width: 480px)` | smaller orb (56px) and 16px from the edges on phones |

### Common changes

| Change | Where |
|---|---|
| Add / remove / reorder menu items | `src/content/site.json → nav.items`. Each item is `{ "number": "06", "label": "Blog", "to": "/blog" }`. The route must exist in `routes.jsx`. |
| Rename an item | `label` in `site.json` |
| Change the dots or ✕ icon | the `<svg>` inside the `<button>` in `OrbNav.jsx` |
| Change orb colour / size | `.orb-nav__button` in `OrbNav.css`; the gradient is `--orb-gradient` in `index.css` |
| Change stagger speed | `STAGGER` in `OrbNav.jsx` |
| Change the spring feel | `stiffness` / `damping` in `pillVariants.visible` |
| Change the curve | `depth` in `utils/orbCurve.js` |

---

## Footer

File: [src/components/Footer/Footer.jsx](../src/components/Footer/Footer.jsx)

Three columns (they stack and centre below 1024px):

| Column | Class | Content |
|---|---|---|
| © year + name | `.footer__copy` | year is automatic (`new Date().getFullYear()`), name from `site.json → name` |
| Bible verse | `.footer__quote` | `site.json → footer.quote` + `footer.reference` |
| Links | `.footer__links` | `site.json → footer.linkKeys` (`["github", "linkedin", "email"]`); each key is looked up in `site.json → links` |

---

## Page titles

Each page renders `<PageMeta title="About" description="…" />`. React 19 moves the `<title>` and `<meta name="description">` into `<head>`, giving tab titles like **"About · Kobus van Schalkwyk"**. Home has no `title`, so it shows **"Kobus van Schalkwyk · Junior Software Engineer"**. See [components.md → PageMeta](components.md#pagemeta).
