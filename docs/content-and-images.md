# Content & images

All text, links and image slots live in `src/content/`. You almost never need to touch a `.jsx` file to change what the site says or shows.

| File | Holds |
|---|---|
| [site.json](../src/content/site.json) | name, role, email, **all shared links** (GitHub, LinkedIn, Email, CV), menu items, footer |
| [home.json](../src/content/home.json) | everything on `/` |
| [about.json](../src/content/about.json) | everything on `/about` |
| [projects.json](../src/content/projects.json) | the projects page **and** every case-study page |
| [contact.json](../src/content/contact.json) | everything on `/contact` |

Which key feeds which section: see [pages.md](pages.md).

**JSON tips:** strings use double quotes; no comma after the last item in a list or object; an apostrophe (`'`) inside a string is fine. If the dev server shows a red error after an edit, it's usually a missing or extra comma. Run `npm test` after editing: the content tests catch broken links.

---

## Links

Shared links are defined **once**, in `site.json → links`:

```json
"links": {
  "github":   { "label": "GitHub",      "href": "https://github.com/ThatOneProgrammerUKnow" },
  "linkedin": { "label": "LinkedIn",    "href": "https://linkedin.com/in/kobus-van-schalkwyk-190794382" },
  "email":    { "label": "Email",       "href": "mailto:kobus.vs.2006@gmail.com" },
  "cv":       { "label": "Download CV", "href": "/cv/Kobus-van-Schalkwyk-CV.pdf" }
}
```

Everywhere else, content refers to them by **`linkKey`** (e.g. `"linkKey": "linkedin"`), so changing a URL here updates the menu, footer, buttons and contact cards at once.

Internal links use **`to`**: `"/about"`, `"/projects/budget-tracker"`, or `"/projects#brighthire"` (scrolls to that card).

- **LinkedIn**: change `links.linkedin.href`.
- **Email**: change both `site.json → email` (the visible text) and `links.email.href`.

## The CV

1. Export your CV as a PDF.
2. Save it as **`public/cv/Kobus-van-Schalkwyk-CV.pdf`** (create the `cv` folder).
3. Done. Every "Download CV" link already points there. To use a different file name, change `site.json → links.cv.href`.

Files in `public/` are served from the site root: `public/cv/x.pdf` → `/cv/x.pdf`.

---

## Images

### How it works

Every image spot on the site is an **image object** in the JSON:

```json
{ "src": null, "alt": "", "placeholder": "[Your photo: professional portrait]" }
```

While `src` is `null`, a dashed grey placeholder shows the `placeholder` text. Set `src`, and the [ImageSlot](components.md#imageslot) component shows your photo instead. You don't need to change any code.

### Add a photo in 4 steps

1. **Prepare it.** Crop to roughly the shape in the table below, export as **WebP** (or AVIF) at about the "export size". That's 2× the on-screen size, for sharp phone/retina screens. Aim for under ~200 KB each (the hero portrait under ~150 KB).
2. **Save it** under `public/images/`, in a folder per page:
   ```
   public/images/home/portrait.webp
   public/images/about/espresso.webp
   public/images/projects/budget-tracker-1.webp
   ```
3. **Point to it** in the JSON (path starts with `/images/…`, **without** `public`):
   ```json
   { "src": "/images/home/portrait.webp", "alt": "Kobus smiling in a navy shirt", "placeholder": "[Your photo: professional portrait]" }
   ```
4. **Write the `alt` text**: one short sentence of what's in the photo, for screen readers and if the image fails to load. Leave the `placeholder` as is; it's ignored once `src` is set.

Images are cropped to fill their slot (`object-fit: cover`), never stretched. If a face gets cut off, either crop the photo closer to the shape below, or add `object-position` to that slot's class (e.g. `.home-hero__photo { object-position: center top; }`).

### Every image slot on the site

| Page | Where on the page | JSON path | Shape on screen (desktop) | Export size (2×) | Slot class |
|---|---|---|---|---|---|
| Home | hero portrait, inside the blue ring | `home.json → hero.image` | circle, 312 × 312 | **640 × 640** (square) | `.home-hero__photo` |
| Home | "Live" step: coffee | `home.json → howIWork.steps[2].images[0]` | circle, 112 × 112 | 240 × 240 | `.how-i-work__image` |
| Home | "Live" step: music | `… steps[2].images[1]` | circle, 112 × 112 | 240 × 240 | `.how-i-work__image` |
| Home | "Live" step: hiking | `… steps[2].images[2]` | circle, 112 × 112 | 240 × 240 | `.how-i-work__image` |
| Home | Budget Tracker row | `home.json → selectedWork.projects[0].image` | 150 × 112 (full width on phones) | 600 × 450 (4:3) | `.project-row__image` |
| Home | Brighthire row | `… projects[1].image` | same | 600 × 450 | `.project-row__image` |
| Home | WEG row | `… projects[2].image` | same | 600 × 450 | `.project-row__image` |
| About | arch photo (hero) | `about.json → hero.image` | arch, 340 × 420 | **680 × 840** (portrait) | `.about-hero__photo` |
| About | girlfriend | `about.json → beyondCode.items[0].image` | 380 × 300 | 760 × 600 | `.beyond-code__image` |
| About | singing | `… items[1].image` | 380 × 300 | 760 × 600 | `.beyond-code__image` |
| About | barista | `… items[2].image` | 380 × 300 | 760 × 600 | `.beyond-code__image` |
| About | hiking | `… items[3].image` | 380 × 300 | 760 × 600 | `.beyond-code__image` |
| About | 3D printing | `… items[4].image` | 380 × 300 | 760 × 600 | `.beyond-code__image` |
| About | books | `… items[5].image` | 380 × 300 | 760 × 600 | `.beyond-code__image` |
| Projects | featured phone 1 | `projects.json → projects[0].images[0]` (Budget Tracker) | phone, 160 × 340 | 320 × 680 (app screenshot) | `.featured-project__phone` |
| Projects | featured phone 2 | `… projects[0].images[1]` | phone, 160 × 308 | 320 × 680 | `.featured-project__phone` |
| Projects | Brighthire card | `… projects[1].images[0]` | 546 × 230 | 1100 × 460 | `.project-card__image` |
| Projects | WEG card | `… projects[2].images[0]` | 546 × 230 | 1100 × 460 | `.project-card__image` |
| Projects | VSI Sales card | `… projects[3].images[0]` | 546 × 230 | 1100 × 460 | `.project-card__image` |
| Projects | Smart Assistant card | `… projects[4].images[0]` | 546 × 230 | 1100 × 460 | `.project-card__image` |
| Budget Tracker | screen 1 (monthly budgets) | `projects.json → projects[0].detail.screens[0]` | phone, 210 × 410 | 420 × 820 | `.project-screens__phone` |
| Budget Tracker | screen 2 (log income & expenses) | `… detail.screens[1]` | phone, 210 × 410 | 420 × 820 | `.project-screens__phone` |
| Budget Tracker | screen 3 (JSON export) | `… detail.screens[2]` | phone, 210 × 410 | 420 × 820 | `.project-screens__phone` |

Home's project rows and the Projects page cards are **separate** image slots. Use the same file for both if you like (e.g. `/images/projects/brighthire.webp`).

The **hero portrait** is the only image loaded straight away (it's what people see first). All others load lazily as you scroll.

---

## Add a project

Add an object to the `projects` array in `projects.json`:

```json
{
  "slug": "my-new-app",
  "meta": ["Personal", "2026", "On GitHub"],
  "title": "My New App",
  "summary": "One or two sentences about the problem and what you built.",
  "stack": ["React", "Spring Boot"],
  "images": [{ "src": null, "alt": "", "placeholder": "[My New App screenshot]" }]
}
```

- `slug`: lowercase-with-dashes and unique. It becomes the card's anchor (`/projects#my-new-app`) and, with a case study, its URL.
- It appears in the grid in array order.
- To feature it in the big blue panel instead, give it `"featured": true` and `"featuredLabel": "Featured"`, and remove `featured` from Budget Tracker. Only one project should be featured.
- To show it on Home as well, add a row to `home.json → selectedWork.projects` with `"to": "/projects#my-new-app"`.

## Add a case-study page

Give the project a `detail` block (copy Budget Tracker's and edit it):

```json
"detail": {
  "facts":   [{ "label": "Role", "value": "…" }, { "label": "Status", "value": "…" }, …],
  "screens": [{ "src": null, "alt": "", "placeholder": "[Screen: …]" }, …],
  "goal":    { "title": "The goal", "text": "…" },
  "built":   { "title": "What I built", "parts": [{ "label": ["Mobile app", "v1"], "items": ["…"] }] },
  "process": { "title": "How I work on it", "steps": ["…", "…"] },
  "next":    { "title": "Name of the next project", "to": "/projects/next-slug-or-#anchor" }
}
```

That's it: `/projects/<slug>` now works, and if it's the featured project the "Read the case study" button appears. Then update links that should point to it (e.g. the home row's `"to"`, or another project's `next.to`).

---

## Text with special formatting

| Pattern | Used for | Example |
|---|---|---|
| `{ "before", "highlight", "after" }` | page titles with a blue part | `"title": { "before": "Let's ", "highlight": "talk." }` |
| `["a", "b", "c"]` meta/stack lists | mono lines joined with " · " | `"meta": ["OrbTech", "In progress"]` → `OrbTech · In progress` |
| `"current": true` | filled timeline dot (About) | |
| `"tone": "light" \| "dark"` | white or navy hero tag (Home) | |

Screen-reader-only text (not visible) also lives in `site.json`: `skipLink`, `nav.ariaLabel`, `nav.openLabel`, `nav.closeLabel`.
