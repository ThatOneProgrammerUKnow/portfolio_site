# Developer docs: start here

How this portfolio is put together, where everything lives, and how to change it.

| Doc | Read it when you want to… |
|---|---|
| [navigation.md](navigation.md) | understand the page shell (logo, orb menu, footer) and how the orb menu works |
| [pages.md](pages.md) | find a page or section: its file, its content, its CSS classes |
| [components.md](components.md) | reuse a shared building block (buttons, links, images, headings, animation) |
| [content-and-images.md](content-and-images.md) | change text, links, the CV, or **add your photos** |
| [sanity.md](sanity.md) | understand the Sanity schemas (`studio/`), the queries and the setup |
| [styling.md](styling.md) | find colours, fonts, global classes, breakpoints and the class-naming pattern |
| [progress.md](progress.md) | see what's done and what's still waiting |

---

## Run it

```bash
npm install        # once
cp .env.example .env   # once: fill in VITE_SANITY_PROJECT_ID (otbb6ulw) + VITE_SANITY_DATASET (production)
npm run dev        # dev server → http://localhost:5173
npm test           # run all tests once
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

**Hosting:** Cloudflare, configured in [`wrangler.jsonc`](../wrangler.jsonc): it serves `dist/` and falls back to `index.html` for any URL, so deep links like `/projects/funds-view` work. Build variables and CORS: see [sanity.md → Security](sanity.md#security).

---

## How a page gets on screen

```
index.html
  └─ src/main.jsx            creates the router, loads global CSS (index.css)
       └─ src/routes.jsx     URL → page (lazy-loaded) + its loader (fetches content from Sanity)
            └─ Layout        skip link, logo, OrbNav, <main>, footer   (same on every page; Site settings)
                 └─ Page     e.g. pages/Home/Home.jsx: useLoaderData() → stacks its sections
                      └─ Sections   e.g. HeroSection: receives its slice of content as `content` and renders it
```

**The rule that ties it together:** components never contain copy. Every word on the site lives in **Sanity** (edited in the Studio, see [content-and-images.md](content-and-images.md)). Each route's loader fetches its page document before the page renders; the page hands each section its part:

```jsx
// src/routes.jsx
{ index: true, loader: withSignal(getHomePage), lazy: page(() => import('./pages/Home/Home')) }

// src/pages/Home/Home.jsx
const content = useLoaderData();
<HeroSection content={content.hero} />          // → Studio: Home page → Hero
<HowIWorkSection content={content.howIWork} />  // → Studio: Home page → How I work
```

Site settings (name, email, links, menu) are loaded once by the root route; read them with `useSite()`.

All Sanity access is in `src/services/`: `sanity.js` (fetch from the public CDN, no token), `queries.js` (GROQ that returns exactly the shape each section expects), `content.js` (one function per page). If Sanity can't be reached, the root `ErrorPage` shows with a Try again button.

So to find where something comes from, look at the section's `content.something`, then the matching field group in the Studio (and the projection in `queries.js`).

---

## Folder map

```
public/                         files served as-is (favicon; _redirects: /studio → hosted Studio)
src/
  main.jsx                      app entry: router + global CSS
  routes.jsx                    every URL and which page it loads
  index.css                     design tokens (colours, fonts, spacing) + global classes
  services/                     ALL content fetching (Sanity): sanity.js, queries.js, content.js
  constants/fallbackText.js     error-page text (the only copy not in Sanity)
  components/                   shared building blocks, one folder each (Name.jsx + Name.css)
    Layout/  Logo/  OrbNav/  Footer/  ErrorPage/
    ButtonLink/  SmartLink/  SectionHeader/  Headline/  ImageSlot/  Reveal/  PageMeta/
                                (icons come from the lucide-react library, see components.md → Icons)
  pages/                        one folder per page
    Home/  About/  Projects/  ProjectDetail/  MyProducts/  Contact/
      Page.jsx                  reads its content with useLoaderData(), stacks its sections
      sections/
        SomethingSection/       SomethingSection.jsx + SomethingSection.css
  hooks/
    useDismissableMenu.js       Escape / click-outside / focus trap for the orb menu
    useSite.js                  Site settings from the root route
  utils/
    links.js                    resolve link keys, detect external/download links, join "a · b"
    orbCurve.js                 the curve of the open orb menu
    images.js                   sized WebP/AVIF URLs for Sanity images
    motionFeatures.js           Motion animation code, loaded on demand
  test/setup.js                 test environment setup
  test/fixtures.js              fake Sanity data for tests
studio/                         Sanity Studio (own package.json); see sanity.md
design/                         approved design PNGs + design.md (the visual source of truth)
docs/                           these docs + progress.md
```

---

## "I want to…" → go here

| I want to… | Go to |
|---|---|
| change any text | the Studio: **yoursite/studio** (→ kobus-portfolio.sanity.studio), or locally `cd studio && npm run dev`; see [content-and-images.md](content-and-images.md) |
| add my photos | [content-and-images.md → Images](content-and-images.md#images) |
| replace the CV | Studio → Site settings → Shared links → CV |
| change the LinkedIn / GitHub / email link | Studio → Site settings → Shared links / Email |
| change the menu items | Studio → Site settings → Menu → Items; see [navigation.md](navigation.md) |
| change how the orb menu looks or animates | `src/components/OrbNav/`; see [navigation.md](navigation.md) |
| add or swap an icon | import it from `lucide-react`; see [components.md → Icons](components.md#icons-lucide) |
| change a colour or font everywhere | `src/index.css` → `:root`; see [styling.md](styling.md) |
| restyle one section | that section's `.css` file; class names are listed in [pages.md](pages.md) |
| add a project | [content-and-images.md → Add a project](content-and-images.md#add-a-project) |
| change the app download, install steps or roadmap ("My products") | Studio → **My products page** (download URL: the project's **Download link**); see [pages.md → My products](pages.md#my-products-my-products) |
| give a project its own case-study page | [content-and-images.md → Add a case study](content-and-images.md#add-a-case-study-page) |
| add a new section to a page | [Recipe below](#recipe-add-a-new-section) |
| add a new page | [Recipe below](#recipe-add-a-new-page) |

---

## Recipe: add a new section

Example: a "Testimonials" section on Home.

1. **Content**: add a `section('testimonials', 'Testimonials', [...])` field to `studio/schemaTypes/documents/homePage.js`, add `testimonials { eyebrow, title, items[]{...} }` to `HOME_QUERY` in `src/services/queries.js`, and fill it in the Studio.
2. **Folder**: create `src/pages/Home/sections/TestimonialsSection/` with `TestimonialsSection.jsx` and `TestimonialsSection.css`. The name must end in `Section`.
3. **Component**: start from this skeleton:
   ```jsx
   import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
   import Reveal from '../../../../components/Reveal/Reveal';
   import './TestimonialsSection.css';

   export default function TestimonialsSection({ content }) {
     return (
       <section className="section testimonials">
         <div className="container">
           <Reveal>
             <SectionHeader eyebrow={content.eyebrow} title={content.title} />
           </Reveal>
           {/* your markup, using classes like .testimonials__item */}
         </div>
       </section>
     );
   }
   ```
4. **Place it**: import it in `Home.jsx` and add `<TestimonialsSection content={content.testimonials} />` where it belongs.
5. **Style**: use the `testimonials__…` class pattern in its CSS (see [styling.md](styling.md#class-naming)).

Per `AGENTS.md`, a new section needs an approved design in `design/` first.

## Recipe: add a new page

1. Create a `blogPage` schema in `studio/schemaTypes/documents/` (add it to `schemaTypes` and `SINGLETON_TYPES`), a `BLOG_QUERY` + `getBlogPage` in `src/services/`, and `src/pages/Blog/Blog.jsx` (+ `sections/`).
2. Register the URL in `src/routes.jsx`:
   ```js
   { path: 'blog', loader: withSignal(getBlogPage), lazy: page(() => import('./pages/Blog/Blog')) },
   ```
3. Add `<PageMeta title="…" description="…" />` at the top of the page (sets the browser tab title).
4. Add a menu item in Studio → Site settings → Menu if it should be in the orb menu.
5. Add the path to the routes test in `src/routes.test.jsx` (and fake data in `src/test/fixtures.js`).

---

## Tests

| File | What it checks |
|---|---|
| `src/utils/utils.test.js` | link helpers (incl. safe rich-text links), Sanity image URLs, orb curve maths |
| `src/components/RichText/RichText.test.jsx` | bold text, safe links open in a new tab, unsafe/unknown links render as plain text |
| `src/services/services.test.js` | Sanity query URLs (CDN, published only, no credentials), error handling, missing documents |
| `src/components/OrbNav/OrbNav.test.jsx` | burger ↔ ✕ icon, menu opens/closes, Escape, click outside, focus trap, current page highlight, CV download |
| `src/routes.test.jsx` | every page renders with one `<h1>` (content service mocked with `src/test/fixtures.js`), redirects (incl. old `/apps` → `/my-products`), external links open safely, CV downloads, My products download button, install steps, rich text and "Read more" link, Projects "Download app" button, error page |

Tests never call Sanity. Content correctness (required fields, HTTPS URLs, link targets, alt text) is checked by the Studio's validation instead: `cd studio && npx sanity documents validate`.
