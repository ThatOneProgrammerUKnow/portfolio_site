# Content & images

All text, links, images and the CV live in **Sanity**. You edit them in the Studio, not in code:

```bash
cd studio
npm run dev        # → http://localhost:3333 (log in with Email / password)
```

Edit, then press **Publish**. The site only shows published content, and the next page load picks it up. No rebuild or deploy needed.

| Studio document | Holds |
|---|---|
| **Site settings** | name, role, email, **all shared links** (GitHub, LinkedIn, Email, CV), menu items, footer, skip-link text |
| **Home page** | everything on `/` |
| **About page** | everything on `/about` |
| **Projects page** | the `/projects` hero, the "Read the case study" button, the case-study back/next labels |
| **Contact page** | everything on `/contact` |
| **Project** (one per project) | a project card, and optionally its case-study page |

Each page document has one collapsible group per section (Hero, How I work, …). Which group feeds which section: see [pages.md](pages.md). Schemas and how the site queries them: [sanity.md](sanity.md).

The Studio checks your edits: required fields, HTTPS URLs, link targets, and alt text on uploaded images. Red markers block publishing.

---

## Links

Shared links are defined **once**, in **Site settings → Shared links** (GitHub, LinkedIn, Email label, CV). Everywhere else, a link picks one of them under **Shared link**, so changing a URL there updates the menu, footer, buttons and contact cards at once.

Internal links use **Page path** instead: `/about`, `/projects/funds-view`, or `/projects#brighthire` (scrolls to that card). A link has either a page path or a shared link, never both.

- **LinkedIn / GitHub**: Site settings → Shared links → URL.
- **Email**: Site settings → Email. The `mailto:` link is built from it automatically.

Links to projects (Home "Selected work" rows, a case study's "Next project") are **references** to the project, not typed paths. The site builds the URL: `/projects/<slug>` if the project has a case study, otherwise `/projects#<slug>`. Renaming a slug can't break them.

## The CV

Site settings → Shared links → CV → upload the PDF. Every "Download CV" link uses it and downloads it under its original file name. Uploaded files are public.

---

## Images

### How it works

Every image spot is an **Image** field in the Studio with:

- the image itself (drag and drop; use the crop/hotspot tool to choose what stays in frame),
- **Alt text**: one short sentence of what's in the photo, for screen readers. Required once an image is uploaded.
- **Placeholder**: the text in the dashed grey box shown while no image is uploaded. Ignored once there's an image.

Sanity's CDN resizes each image to 2× its on-screen width and serves WebP/AVIF automatically ([ImageSlot](components.md#imageslot) asks for it). Upload a good-quality original (JPG/PNG/WebP), ideally at least the "upload size" below. No need to resize it yourself.

Images are cropped to fill their slot (`object-fit: cover`), never stretched. If a face gets cut off, crop the photo closer to the shape below, or add `object-position` to that slot's class (e.g. `.home-hero__photo { object-position: center top; }`).

### Every image slot on the site

| Page | Where on the page | Studio field | Shape on screen (desktop) | Upload at least | Slot class |
|---|---|---|---|---|---|
| Home | hero portrait, inside the blue ring | Home page → Hero → Portrait | circle, 312 × 312 | **640 × 640** (square) | `.home-hero__photo` |
| Home | "Live" step: coffee / music / hiking | Home page → How I work → Steps → Live → Images (1–3) | circle, 112 × 112 | 240 × 240 | `.how-i-work__image` |
| Home | project rows | Home page → Selected work → Projects → (row) → Image | 150 × 112 (full width on phones) | 600 × 450 (4:3) | `.project-row__image` |
| About | arch photo (hero) | About page → Hero → Photo | arch, 340 × 420 | **680 × 840** (portrait) | `.about-hero__photo` |
| About | Beyond code tiles (6), *section hidden for now* | About page → Beyond code → Items → (item) → Image | 380 × 300 | 760 × 600 | `.beyond-code__image` |
| Projects | featured phones (2) | Project "Funds View" → Card → Images (1–2) | phone, 160 × 340 | 320 × 680 (app screenshot) | `.featured-project__phone` |
| Projects | grid cards | Project → Card → Images (first one) | 546 × 230 | 1100 × 460 | `.project-card__image` |
| Funds View | case-study screens (3) | Project "Funds View" → Case study → Screens | phone, 210 × 410 | 420 × 820 | `.project-screens__phone` |

Home's project rows and the Projects page cards are **separate** image fields. Upload the same image to both if you like.

The **hero portrait** is the only image loaded straight away (it's what people see first). All others load lazily as you scroll.

---

## Add a project

In the Studio: **Project → + (create)**.

- **Title**, then **Slug → Generate**. The slug becomes the card's anchor (`/projects#my-new-app`) and, with a case study, its URL. It must be unique.
- **Order**: lower numbers show first in the grid.
- **Meta** (e.g. "Personal", "2026", "On GitHub"), **Summary**, **Stack**, **Images**.
- To feature it in the big blue panel instead, switch on **Featured** and fill in **Featured label**, and switch Featured off on Funds View. Only one project should be featured.
- **Download link** (Card tab): set it when people can download and use the app. The project then appears on the **Apps** page (`/apps`) with a Download button (this URL) and a View project button (its case study, or its card on /projects), and its Projects-page card/panel gets a small "Download app" button that links to `/apps#<slug>`. Must be `https://`. Leave it empty to keep the project off the Apps page.
- To show it on Home as well, add a row under **Home page → Selected work → Projects** and pick the project.

## Add a case-study page

Open the project → **Case study** tab → switch on **Has a case study page**, then fill in Facts, Screens, The goal, What I built, How I work on it and Next project.

Publish, and `/projects/<slug>` works. If it's the featured project, the "Read the case study" button appears. Links that reference the project (Home rows, other projects' "Next project") switch to the new page automatically.

---

## Text with special formatting

| Field | Used for | Example |
|---|---|---|
| **Title with highlight** (Before / Highlighted words / After) | page titles with a blue part | Before `Let's `, Highlighted `talk.` Mind the spaces. |
| **Meta** / **Stack** lists | mono lines joined with " · " | `OrbTech`, `In progress` → `OrbTech · In progress` |
| **Current role** | filled timeline dot (About) | |
| **Tone** light / dark | white or navy hero tag (Home) | |

Screen-reader-only text (not visible) is in **Site settings**: Skip link text, and Menu → Menu label / Open button label / Close button label.

---

## If the site can't reach Sanity

The site shows a short "This page couldn't load" page with a **Try again** button. That's the only text not in Sanity, in `src/constants/fallbackText.js`, because it has to work when Sanity doesn't.
