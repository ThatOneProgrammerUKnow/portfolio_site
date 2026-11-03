# Developer docs: start here

How this portfolio is put together, where everything lives, and how to change it.

| Doc | Read it when you want to… |
|---|---|
| [navigation.md](navigation.md) | understand the page shell (logo, orb menu, footer) and how the orb menu works |
| [pages.md](pages.md) | find a page or section: its file, its content, its CSS classes |
| [components.md](components.md) | reuse a shared building block (buttons, links, images, headings, animation) |
| [content-and-images.md](content-and-images.md) | change text, links, the CV, or **add your photos** |
| [styling.md](styling.md) | find colours, fonts, global classes, breakpoints and the class-naming pattern |
| [progress.md](progress.md) | see what's done and what's still waiting |

---

## Run it

```bash
npm install        # once
npm run dev        # dev server → http://localhost:5173
npm test           # run all tests once
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

---

## How a page gets on screen

```
index.html
  └─ src/main.jsx            creates the router, loads global CSS (index.css)
       └─ src/routes.jsx     URL → page (each page is lazy-loaded)
            └─ Layout        skip link, logo, OrbNav, <main>, footer   (same on every page)
                 └─ Page     e.g. pages/Home/Home.jsx: imports its JSON and stacks its sections
                      └─ Sections   e.g. HeroSection: receives its slice of JSON as `content` and renders it
```

**The rule that ties it together:** components never contain copy. Every word on the site lives in `src/content/*.json`. A page imports its JSON file and hands each section its part:

```jsx
// src/pages/Home/Home.jsx
import content from '../../content/home.json';
<HeroSection content={content.hero} />          // → home.json  "hero": { ... }
<HowIWorkSection content={content.howIWork} />  // → home.json  "howIWork": { ... }
```

So to find where something comes from, look at the section's `content.something` and open the matching key in the JSON.

---

## Folder map

```
public/                         files served as-is (favicon, and later /images and /cv)
src/
  main.jsx                      app entry: router + global CSS
  routes.jsx                    every URL and which page it loads
  index.css                     design tokens (colours, fonts, spacing) + global classes
  content/                      ALL site text, links and image slots (JSON)
    site.json                   shared: name, email, links, nav items, footer
    home.json  about.json  projects.json  contact.json
  components/                   shared building blocks, one folder each (Name.jsx + Name.css)
    Layout/  Logo/  OrbNav/  Footer/
    ButtonLink/  SmartLink/  SectionHeader/  Headline/  ImageSlot/  Reveal/  PageMeta/
                                (icons come from the lucide-react library, see components.md → Icons)
  pages/                        one folder per page
    Home/  About/  Projects/  ProjectDetail/  Contact/
      Page.jsx                  imports its JSON, stacks its sections
      sections/
        SomethingSection/       SomethingSection.jsx + SomethingSection.css
  hooks/
    useDismissableMenu.js       Escape / click-outside / focus trap for the orb menu
  utils/
    links.js                    resolve link keys, detect external/download links, join "a · b"
    orbCurve.js                 the curve of the open orb menu
    projects.js                 find a project that has a case-study page
    motionFeatures.js           Motion animation code, loaded on demand
  test/setup.js                 test environment setup
design/                         approved design PNGs + design.md (the visual source of truth)
docs/                           these docs + progress.md
```

---

## "I want to…" → go here

| I want to… | Go to |
|---|---|
| change any text | the page's JSON in `src/content/`; see [content-and-images.md](content-and-images.md) |
| add my photos | [content-and-images.md → Images](content-and-images.md#images) |
| add the CV | put the PDF at `public/cv/Kobus-van-Schalkwyk-CV.pdf` |
| change the LinkedIn / GitHub / email link | `src/content/site.json` → `links` |
| change the menu items | `src/content/site.json` → `nav.items`; see [navigation.md](navigation.md) |
| change how the orb menu looks or animates | `src/components/OrbNav/`; see [navigation.md](navigation.md) |
| add or swap an icon | import it from `lucide-react`; see [components.md → Icons](components.md#icons-lucide) |
| change a colour or font everywhere | `src/index.css` → `:root`; see [styling.md](styling.md) |
| restyle one section | that section's `.css` file; class names are listed in [pages.md](pages.md) |
| add a project | [content-and-images.md → Add a project](content-and-images.md#add-a-project) |
| give a project its own case-study page | [content-and-images.md → Add a case study](content-and-images.md#add-a-case-study-page) |
| add a new section to a page | [Recipe below](#recipe-add-a-new-section) |
| add a new page | [Recipe below](#recipe-add-a-new-page) |

---

## Recipe: add a new section

Example: a "Testimonials" section on Home.

1. **Content**: add a key to `src/content/home.json`:
   ```json
   "testimonials": { "eyebrow": "Kind words", "title": "What people say.", "items": [] }
   ```
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

1. Create `src/content/blog.json` and `src/pages/Blog/Blog.jsx` (+ `sections/`).
2. Register the URL in `src/routes.jsx`:
   ```js
   { path: 'blog', lazy: page(() => import('./pages/Blog/Blog')) },
   ```
3. Add `<PageMeta title="…" description="…" />` at the top of the page (sets the browser tab title).
4. Add a menu item in `site.json → nav.items` if it should be in the orb menu.
5. Add the path to the routes test in `src/routes.test.jsx`.

---

## Tests

| File | What it checks |
|---|---|
| `src/utils/utils.test.js` | link helpers, orb curve maths, project lookup |
| `src/content/content.test.js` | every internal link points to a real page/anchor, every `linkKey` exists, external links are HTTPS |
| `src/components/OrbNav/OrbNav.test.jsx` | burger ↔ ✕ icon, menu opens/closes, Escape, click outside, focus trap, current page highlight, CV download |
| `src/routes.test.jsx` | every page renders with one `<h1>`, redirects, external links open safely |

If you change content and a test fails, it's usually a broken link (for example a renamed project `slug`).
