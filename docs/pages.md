# Pages & sections

Every page, top to bottom: which file renders each part, which JSON key feeds it, and its CSS classes.

How to read the tables:
- **Section**: the component, in `src/pages/<Page>/sections/<Name>/<Name>.jsx` with its `.css` next to it.
- **JSON**: the key in that page's content file that the section receives as `content`.
- **Classes**: the main classes, so you can find them in the CSS or in the browser dev tools. Every section's classes start with its own prefix (e.g. `home-hero__…`), so a search for the prefix finds everything.

Images are marked 🖼; see [content-and-images.md](content-and-images.md#images) for sizes and how to add them.

---

## Home: `/`

Page: [src/pages/Home/Home.jsx](../src/pages/Home/Home.jsx) · Content: [src/content/home.json](../src/content/home.json) · Design: `design/home-desktop.png`

| # | Section | JSON | Classes | What it is |
|---|---|---|---|---|
| 1 | `HeroSection` | `hero` | `.home-hero`, `__badge`, `__title`, `__lead`, `__actions`, `__visual`, `__ring`, `__photo`, `__tag--1/2/3`, `__tag--light/dark` | Badge pill, big H1 with blue highlight, intro, "See my work" + "Download CV" buttons, round portrait in a blue ring with 3 floating tags |
| 2 | `HowIWorkSection` | `howIWork` | `.how-i-work`, `__steps`, `__step`, `__number`, `__line`, `__title`, `__body`, `__images`, `__image` | White band, "Three things I do on purpose": 3 numbered steps; step 03 has 3 round photos |
| 3 | `SelectedWorkSection` | `selectedWork` | `.selected-work`, `__header`, `__all`, `__list`; rows: `.project-row`, `__image`, `__meta`, `__title`, `__link`, `__text`, `__stack`, `__arrow` | "Things I've built": 3 clickable project rows + "All projects →" |
| 4 | `RightNowSection` | `rightNow` | `.right-now`, `__panel`, `__intro`, `__title`, `__items`, `__item`, `__label`, `__text` | Blue rounded panel, "What I'm busy with", 2×2 list |
| 5 | `ContactCtaSection` | `contactCta` | `.contact-cta`, `__orb`, `__title`, `__button` | Small orb, "Got a problem worth solving?", dark email button (email from `site.json`) |

Notes:
- 🖼 **Hero portrait**: `hero.image`. It's the most important image on the site and loads first (`eager`, `fetchpriority="high"`).
- 🖼 **Step 03 circles**: `howIWork.steps[2].images` (coffee, music, hiking).
- 🖼 **Project row thumbnails**: `selectedWork.projects[n].image`. These are separate from the ones in `projects.json`.
- Each project row is one big link: the title `<a>` stretches over the whole card with `.project-row__link::after`. The arrow circle is decoration.
- Tag colours: `"tone": "light"` = white pill, `"tone": "dark"` = navy pill. Positions come from `.home-hero__tag--1`, `--2`, `--3` (by order in the JSON).

---

## About: `/about`

Page: [src/pages/About/About.jsx](../src/pages/About/About.jsx) · Content: [src/content/about.json](../src/content/about.json) · Design: `design/about-desktop.png`

| # | Section | JSON | Classes | What it is |
|---|---|---|---|---|
| 1 | `AboutHeroSection` | `hero` | `.about-hero`, `__title`, `__body`, `__cta`, `__visual`, `__circle`, `__photo` | H1 "I found software by fixing things.", 2 paragraphs, Download CV, arch-shaped photo with a blue circle behind it |
| 2 | `ExperienceSection` | `experience` | `.experience`, `__header` (sticky on desktop); `.timeline`, `__item`, `.is-current`, `__title`, `__bullets`, `__text` | White band, "Where I've worked": vertical timeline |
| 3 | `LeadershipSection` | `leadership` | `.leadership`, `__intro`, `__cards`, `__card`, `__title` | "Leading at my church": intro + church link + 3 cards |
| 4 | `LearningSection` | `learning` **and** `techStack` | `.learning`, `__list`, `__item`, `__item-title`, `__item-detail`; `.tech-stack`, `__group`, `__label`, `__chips`, `__chip` | Two columns: certifications list (left), tech chips (right) |
| 5 | `BeyondCodeSection` | `beyondCode` | `.beyond-code`, `__grid`, `__image`, `__caption` | "Life outside the editor": 6 photos with captions |

Notes:
- 🖼 **Arch photo**: `hero.image`.
- 🖼 **Six life photos**: `beyondCode.items[n].image`.
- Timeline dots: `"current": true` → filled dot with a soft ring; `false` → outlined dot. A role uses **either** `"bullets": [...]` (Teclogix) **or** `"text": "..."`.
- `LearningSection` gets two props (`learning`, `techStack`), not `content`, because it shows two headings side by side.

---

## Projects: `/projects`

Page: [src/pages/Projects/Projects.jsx](../src/pages/Projects/Projects.jsx) · Content: [src/content/projects.json](../src/content/projects.json) · Design: `design/projects-desktop.png`

| # | Section | JSON | Classes | What it is |
|---|---|---|---|---|
| 1 | `ProjectsHeroSection` | `hero` | `.projects-hero`, `__title`, `__lead` | H1 "Problems I spotted, and what I built for them." |
| 2 | `FeaturedProjectSection` | the project with `"featured": true` + `featuredCta` | `.featured-project`, `__panel`, `__text`, `__meta`, `__title`, `__summary`, `__cta`, `__phones`, `__phone` | Big blue panel with 2 phone screens + "Read the case study" |
| 3 | `ProjectGridSection` | every other project | `.project-grid`, `__list`; cards: `.project-card`, `__image`, `__meta`, `__title`, `__stack` | 2-column grid of cards |

Notes:
- `Projects.jsx` splits the `projects` array: the one with `"featured": true` goes to the panel, the rest to the grid.
- Every card has `id="<slug>"`, so `/projects#brighthire` scrolls straight to the Brighthire card. Home's project rows use these anchors.
- The "Read the case study" button only appears if the featured project has a `detail` block.
- 🖼 **Featured phones**: `images[0]` and `images[1]` of the featured project.
- 🖼 **Card image**: `images[0]` of each other project.

---

## Project detail: `/projects/:slug`

Page: [src/pages/ProjectDetail/ProjectDetail.jsx](../src/pages/ProjectDetail/ProjectDetail.jsx) · Content: the project's `detail` block in `projects.json` · Design: `design/project-budget-tracker-desktop.png`

This is a **template**: one page component serves any project. `:slug` in the URL is read with `useParams()`, then `findProjectWithDetail(slug)` (in `utils/projects.js`) looks it up. If the project doesn't exist **or has no `detail` block**, the visitor is redirected to `/projects`. Today only `budget-tracker` has one.

| # | Section | JSON | Classes | What it is |
|---|---|---|---|---|
| 1 | `ProjectHeaderSection` | `title`, `meta`, `summary`, `detail.facts`, top-level `backLink` | `.project-header`, `__back`, `__meta`, `__title`, `__summary`, `__facts`, `__fact` | "← All projects", H1, summary, white facts strip (Role / Status / Platforms / Stack) |
| 2 | `ProjectScreensSection` | `detail.screens` | `.project-screens`, `__panel`, `__phone` | Blue panel with 3 phone screens (middle one lower) |
| 3 | `ProjectStorySection` | `detail.goal`, `detail.built`, `detail.process` | `.project-story`; rows: `.story-row`, `__title`, `__body`; `.project-story__goal`, `__parts`, `__part`, `__part-label`, `__part-list`, `__steps`, `__step`, `__step-number` | "The goal" / "What I built" (2 cards) / "How I work on it" (numbered steps) |
| 4 | `NextProjectSection` | `detail.next`, top-level `nextLabel` | `.next-project`, `__card`, `__text`, `__title`, `__arrow` | Big "Next project" card link |

Notes:
- 🖼 **Three phone screens**: `detail.screens[0..2]`.
- Step numbers (`01`, `02`…) are generated from the order, so don't type them in the JSON.

---

## Contact: `/contact`

Page: [src/pages/Contact/Contact.jsx](../src/pages/Contact/Contact.jsx) · Content: [src/content/contact.json](../src/content/contact.json) · Design: `design/contact-desktop.png`

| # | Section | JSON | Classes | What it is |
|---|---|---|---|---|
| 1 | `ContactHeroSection` | `hero` (+ `site.json → email`) | `.contact-hero`, `__title`, `__lead`, `__email`, `__orb` | "Let's talk.", big blue email button, large decorative orb (hidden below 1024px) |
| 2 | `ContactCardsSection` | `cards` | `.contact-cards`, `__list`; `.contact-card`, `__title`, `__link`, `__text` | 4 cards: LinkedIn, GitHub, CV, Based in |

Notes:
- A card has **either** `"link": { "label", "linkKey" }` (shows a blue link) **or** `"text"` (shows grey text, like "South Africa").
- `linkKey` points into `site.json → links`, so the URL is only stored once.

---

## Unknown URLs

`routes.jsx` sends any unknown path (`*`) to `/` because there's no 404 design yet. When one exists, replace that route's `element` with a NotFound page.
