# Design — Kobus van Schalkwyk portfolio

Approved designs: the PNGs in this folder (desktop, 1440px wide, exported at 2x).
Source of truth for exact values is THIS file; PNGs show layout and feel.
Text placeholders like `[Your photo: ...]` mean an image is still to come.

| Page | File | Route |
|---|---|---|
| Home | `home-desktop.png` | `/` |
| About | `about-desktop.png` | `/about` |
| Projects | `projects-desktop.png` | `/projects` |
| Project detail (template) | `project-budget-tracker-desktop.png` | `/projects/budget-tracker` |
| Contact | `contact-desktop.png` | `/contact` |
| Orb navigation (open) | `orb-nav-open.png` | all pages |

Mobile designs are not done yet: adapt sensibly (stack columns, keep spacing scale) and list decisions in `progress.md`.

---

## Colours

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F6F7F9` | Page background |
| `--surface` | `#FFFFFF` | Cards, alternate sections, footer |
| `--surface-muted` | `#E9EDF5` | Image placeholders, soft fills |
| `--text` | `#0E1726` | Headings, body, dark buttons |
| `--text-muted` | `#5A6474` | Secondary text, labels |
| `--primary` | `#2450FF` | Accent, primary buttons, links, orb |
| `--primary-hover` | `#1433B8` | Link / button hover |
| `--primary-light` | `#8FA8FF` | Orb gradient highlight |
| `--primary-soft` | `#DCE4FF` | Timeline dot ring |
| `--on-primary-muted` | `#E8EDFF` | Labels on blue panels |
| `--border` | `#E3E7EE` | Card and section borders |
| `--border-strong` | `#DDE2EA` / `#C9D0DB` | Chips, secondary button border |

Orb gradient: `radial-gradient(circle at 35% 30%, #8FA8FF 0%, #2450FF 50%, #1433B8 100%)`
Orb shadow: `0 0 0 6px rgba(36,80,255,.14), 0 12px 28px rgba(36,80,255,.35)`

## Typography (Google Fonts)

| Role | Font | Weight | Size | Line height | Letter spacing |
|---|---|---|---|---|---|
| Display H1 | Space Grotesk | 700 | `clamp(48px, 6.8vw, 92px)` | 1.0 | -0.04em |
| H2 | Space Grotesk | 700 | `clamp(36px, 4.4vw, 56px)` | 1.05 | -0.035em |
| H3 / card title | Space Grotesk | 700 | 26–32px | 1.2 | -0.02em |
| Body | Inter | 400 | 17px (lead: 19px) | 1.6 | 0 |
| Button | Inter | 600 | 17px | — | 0 |
| Label / eyebrow | IBM Plex Mono | 400–500 | 13–14px | 1.4 | 0 |

## Layout & spacing

- Content max-width **1200px**, side padding `clamp(16px, 4vw, 40px)`.
- Section vertical padding: **112px** (hero 72px top, final CTA 140px).
- Spacing scale (px): 4, 8, 10, 14, 16, 20, 24, 28, 32, 40, 48, 64, 72, 112.
- Radii: chips/buttons `999px`; cards `28–32px`; large panels `36–40px`; small images `18–22px`.
- Shadows used sparingly: primary button `0 10px 24px rgba(36,80,255,.25)`; floating tags `0 10px 24px rgba(14,23,38,.10)`.
- Breakpoints (desktop-first): `1024px` (two columns → stack where needed), `768px` (tablet), `480px` (phone).

## Components

- **OrbNav** (fixed, top-right 24px): 64px blue orb button, three-dot icon closed, ✕ open. Opens a vertical, slightly curved stack of pill links (44px tall, 56px apart): 01 Home, 02 About, 03 Projects, 04 Download CV, 05 Contact. Current page pill is blue. Must be a real `<button aria-expanded>`, close on Escape and on link click, trap focus while open, animate with Motion (respect reduced motion).
- **Logo link** (top-left): small blue dot + "Kobus van Schalkwyk".
- **Buttons**: primary (blue, white text), secondary (white, border), dark (`--text` bg). Min height 54px, pill shape, trailing arrow icon.
- **Eyebrow**: mono label in `--primary` above every H2.
- **Project row** (home) / **project card** (projects): image, mono meta line, title, one-liner, tech stack in mono.
- **Blue panel**: "Right now" (home), featured project (projects), phone screens (project detail).
- **Timeline** (about): vertical line, filled dots for current roles, outlined dots for past.
- **Footer**: © line, Colossians 3:23 in italics, GitHub / LinkedIn / Email links.

## Icons

Simple 24px stroke icons (2px stroke, round caps): arrow-right, arrow-up-right, arrow-left, download. Inline SVG — no icon library needed.

## Motion (suggested, use Motion library)

- Orb menu: pills fan out with a short stagger (≈40ms each), spring.
- Sections: subtle fade-up on scroll (≈16px, 0.4s).
- Cards: hover lift 2–4px.
- All disabled when `prefers-reduced-motion` is set.

## Images still needed

Professional portrait (hero), casual photo (about), photo with girlfriend, music, coffee, hiking/camping, 3D printing, books, plus project screenshots (Budget Tracker ×3, Brighthire, WEG, VSI Sales, Smart Assistant).
