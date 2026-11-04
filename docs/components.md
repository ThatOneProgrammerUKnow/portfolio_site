# Shared components

Reusable building blocks in `src/components/`. Each has its own folder. Use these instead of writing raw `<a>`, `<img>` or heading markup, so links, images and accessibility stay consistent.

The page shell components (`Layout`, `Logo`, `OrbNav`, `Footer`) are covered in [navigation.md](navigation.md).

| Component | Use it for |
|---|---|
| [ButtonLink](#buttonlink) | anything that looks like a button (all buttons on this site are links) |
| [SmartLink](#smartlink) | any link: picks internal / external / download / email automatically |
| [Icons (Lucide)](#icons-lucide) | every icon: arrows, download, burger menu, ✕ |
| [SectionHeader](#sectionheader) | blue eyebrow + H2 at the top of a section |
| [Headline](#headline) | a title with a blue highlighted part |
| [ImageSlot](#imageslot) | every image: shows a placeholder until a photo is added |
| [Reveal](#reveal) | fade-up-on-scroll animation |
| [PageMeta](#pagemeta) | browser tab title + meta description |

Import paths are relative. From a section file that's 4 levels up, e.g. `import ButtonLink from '../../../../components/ButtonLink/ButtonLink';`

---

## ButtonLink

[src/components/ButtonLink/](../src/components/ButtonLink/ButtonLink.jsx). A pill-shaped link styled as a button.

| Prop | Values | Default |
|---|---|---|
| `variant` | `"primary"` (blue), `"secondary"` (white + border), `"dark"` (navy) | `"primary"` |
| `size` | `"sm"` (44px tall, e.g. "Download app" on Projects), `"lg"` (the big contact email button) | normal |
| `icon` | a Lucide icon **component** (not a string), shown after the text at 18px (16px for `sm`, 28px for `lg`) | none |
| `to` / `href` | where it goes (passed to [SmartLink](#smartlink)) | |
| `className` | extra classes, e.g. for spacing | |

```jsx
import { ArrowRight, Download } from 'lucide-react';

<ButtonLink to="/projects" icon={ArrowRight}>See my work</ButtonLink>
<ButtonLink variant="secondary" href="/cv/Kobus-van-Schalkwyk-CV.pdf" icon={Download}>Download CV</ButtonLink>
```

With content that uses `{ to }` or `{ linkKey }`, spread `resolveLink()` from `utils/links.js`:

```jsx
<ButtonLink {...resolveLink(content.cta)} icon={Download}>{content.cta.label}</ButtonLink>
```

Classes: `.button`, `.button--primary`, `.button--secondary`, `.button--dark`, `.button--lg`.

---

## SmartLink

[src/components/SmartLink/SmartLink.jsx](../src/components/SmartLink/SmartLink.jsx). One component for every kind of link. It decides from the destination:

| You pass | It renders | Why |
|---|---|---|
| `to="/about"` | React Router `<Link>` | page change without a full reload |
| `href="https://…"` | `<a target="_blank" rel="noopener noreferrer">` | external sites open in a new tab, safely (security rule in AGENTS.md) |
| `href="/cv/….pdf"` | `<a download>` | the browser downloads the file |
| `href="mailto:…"` or anything else | plain `<a>` | |

Any other props (`className`, `onClick`, …) are passed through.

---

## Icons (Lucide)

All icons come from the **[lucide-react](https://lucide.dev/icons)** library. Its default style (24px, 2px stroke, round caps) is exactly the icon spec in `design.md`. Import each icon by name where you use it; only the icons you import end up in the bundle.

```jsx
import { ArrowRight } from 'lucide-react';

<ArrowRight />                        // 24px, 2px stroke, text colour
<ArrowRight size={18} />              // smaller
<ArrowRight strokeWidth={2.4} />      // bolder
<ArrowRight className="my-class" />   // extra class (it always has .lucide and .lucide-arrow-right too)
```

| Icon | Used in |
|---|---|
| `ArrowRight` | "See my work", "Read the case study", email buttons, "All projects →", next-project card |
| `ArrowUpRight` | the blue circle on Home's project rows |
| `ArrowLeft` | "← All projects" on the case-study page |
| `Download` | "Download CV" buttons |
| `Menu` / `X` | the orb menu button: burger when closed, ✕ when open ([navigation.md](navigation.md#step-by-step-through-the-code)) |

- Icons take the **text colour** (`currentColor`), so colour them with CSS `color` on the parent.
- Lucide adds **`aria-hidden="true"`** automatically, because our icons always sit next to text or inside a labelled button. If an icon is ever the *only* content of a link or button, give that element an `aria-label`.
- `.lucide { flex-shrink: 0; }` in `index.css` stops icons squashing in flex rows.
- **To add an icon:** find it on [lucide.dev/icons](https://lucide.dev/icons), then import it by its PascalCase name (e.g. "external-link" → `ExternalLink`).

---

## SectionHeader

[src/components/SectionHeader/SectionHeader.jsx](../src/components/SectionHeader/SectionHeader.jsx). The blue mono eyebrow + big heading used at the top of most sections.

| Prop | Meaning | Default |
|---|---|---|
| `eyebrow` | small blue label above | none |
| `title` | the heading text | |
| `as` | heading tag | `"h2"` |
| `headingClass` | heading style class | `"h2"` |
| `className` | extra class on the wrapper | |
| `children` | anything shown under the heading (e.g. an intro paragraph) | |

```jsx
<SectionHeader eyebrow={content.eyebrow} title={content.title}>
  <p className="muted">{content.intro}</p>
</SectionHeader>
```

---

## Headline

[src/components/Headline/Headline.jsx](../src/components/Headline/Headline.jsx). Renders a title stored in content as three parts, colouring the middle part blue:

```json
"title": { "before": "I found software by ", "highlight": "fixing things.", "after": "" }
```

```jsx
<h1 className="display"><Headline title={content.title} /></h1>
```

`after` is optional (only "Problems I spotted, and what I **built** for them." uses it). Mind the spaces at the end of `before` and the start of `after`.

---

## ImageSlot

[src/components/ImageSlot/ImageSlot.jsx](../src/components/ImageSlot/ImageSlot.jsx). **Every image on the site goes through this.** It reads an image object from Sanity (shaped by the queries in `src/services/queries.js`):

```json
{ "src": null, "alt": "", "placeholder": "[Your photo: professional portrait]" }
```

| `src` is… | It renders |
|---|---|
| `null` (no image uploaded) | a grey dashed box with the `placeholder` text (hidden from screen readers) |
| a Sanity CDN URL | a real `<img>` with its `alt` text, requested at 2× `width` as WebP/AVIF (`imageUrl`), lazy-loaded unless `eager` |

| Prop | Meaning |
|---|---|
| `image` | the image object from content |
| `className` | sizing/shape class from the section (e.g. `home-hero__photo` makes it round) |
| `eager` | load immediately with high priority (only for the top-of-page image) |
| `width`, `height` | intrinsic size hints to prevent layout shift; `width` also sets the requested image size |

The image fills its slot with `object-fit: cover`, so it's cropped to fit, never stretched. Full guide: [content-and-images.md → Images](content-and-images.md#images).

---

## Reveal

[src/components/Reveal/Reveal.jsx](../src/components/Reveal/Reveal.jsx). Fades its children up 16px over 0.4s the first time they scroll into view.

| Prop | Meaning | Default |
|---|---|---|
| `as` | which HTML tag to render (`"div"`, `"li"`, …) | `"div"` |
| `delay` | seconds before starting (used for staggered cards: `index * 0.06`) | 0 |
| `className`, other props | passed to the element | |

```jsx
<ul role="list">
  {items.map((item, i) => (
    <Reveal as="li" key={item.title} className="card" delay={i * 0.06}>…</Reveal>
  ))}
</ul>
```

- If the visitor has **reduced motion** on, it renders a plain element with no animation.
- Hero sections deliberately don't use it, so the first thing people see is never invisible (good for loading speed / LCP).
- It uses Motion's `m` component, which only works inside `Layout`'s `<LazyMotion>`. **Use `m.div`, never `motion.div`**: `strict` mode throws an error for `motion.*` to keep the bundle small.

---

## PageMeta

[src/components/PageMeta/PageMeta.jsx](../src/components/PageMeta/PageMeta.jsx). Put one at the top of every page:

```jsx
<PageMeta title="About" description="…" />   // tab: "About · Kobus van Schalkwyk"
<PageMeta description="…" />                  // tab: "Kobus van Schalkwyk · Junior Software Engineer"
```

React 19 moves `<title>` and `<meta>` into `<head>` automatically.

---

## Helpers in `src/utils/`

| Function | File | Does |
|---|---|---|
| `getSiteLink(links, key)` | `links.js` | returns `{ label, href }` from Site settings' `links` (throws if the key doesn't exist) |
| `resolveLink({ to, linkKey, href }, links)` | `links.js` | turns a content link into props for `SmartLink` / `ButtonLink` (`links` from `useSite()`) |
| `isExternal(href)` / `isDownload(href)` | `links.js` | used by `SmartLink` |
| `joinMeta(["a", "b"])` | `links.js` | → `"a · b"` (all the mono meta lines) |
| `orbCurveOffset(i, n)` | `orbCurve.js` | x-offset for each open menu pill |
| `imageUrl(src, width)` | `images.js` | Sanity CDN URL at 2× `width`, WebP/AVIF (`auto=format`); other URLs unchanged |

## Hook: `useSite`

[src/hooks/useSite.js](../src/hooks/useSite.js). `const site = useSite()` returns Site settings (name, role, email, `links`, `nav`, `footer`), loaded once by the root route. Use it in pages and sections. `Logo`, `OrbNav` and `Footer` get the same data as props from `Layout` instead, so they can be tested outside a router.

## Hook: `useDismissableMenu`

[src/hooks/useDismissableMenu.js](../src/hooks/useDismissableMenu.js). `useDismissableMenu(containerRef, isOpen, onClose)`. While open: Escape → `onClose({ restoreFocus: true })`, click outside → `onClose({ restoreFocus: false })`, Tab wraps within the container. Reusable for any future dropdown or modal.
