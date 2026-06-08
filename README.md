# SELVA Residences — wowdesign Demo Site

Fictive luxury presales project. Full decisions, sitemap, and brand brief: `references/demo-selva-inspiration.md` (pinned on dashboard). This file covers the technical build only.

**Live:** demo.wowdesign.io  
**Local:** `npm run dev` → http://localhost:3000  
**Stack:** Next.js 15 (App Router) · CSS Modules · Framer Motion · Swiper · Vercel  
**GitHub:** https://github.com/wowdesign-io/demo-selva

---

## Brand (quick ref — full brief in demo-selva-inspiration.md)

- **Name:** SELVA Residences — "Where the forest meets the sky"
- **Units:** 40 total · 3 floors · Models B / C / D · Miami (fictive) · Mid-2027
- **Price range:** $300k – $950k
- **Palette:** Warm white `#FAFAF7` · Forest green `#2D4E2D` · Amber `#C9975A`
- **Fonts:** Cormorant Garamond (headings, light italic) · DM Sans (body) · Barlow (labels)

---

## Agreed Sitemap

```
/ (Home)
/vision
/residences          ← content + Planpoint embed on ONE page (scroll to #planpoint)
/amenities
/neighborhood
/gallery
/press
/team
Inquiry              ← footer only, no separate page
```

**Nav:**
```
[SELVA wordmark]   Vision  Residences  Amenities  Neighborhood  Gallery  Press  Team   [Explore Floorplans →]
```
- "Explore Floorplans" = green pill CTA → `/residences#planpoint`
- Transparent over hero → solid warm white on scroll

---

## Home Page — Build Status

| # | Section | Status | Notes |
|---|---|---|---|
| 1 | Nav | ✅ Done | Transparent → solid on scroll, announcement bar hides on scroll |
| 2 | HeroSection | ✅ Done | 50/50 — full-bleed render left, copy + pill CTAs right |
| 3 | OverviewSection | ✅ Done | Intro mask reveal + 3-panel scroll-zoom (1.14→1.0) + hover labels |
| 4 | VisionSection | ✅ Done | Right render + left text, leaves-bg + sage overlay |
| 5 | ResidencesSection | ✅ Done | 3-image grid, CTA below copy, hover overlays on renders |
| 6 | AmenitiesSection | ⬜ Next | — |
| 7 | Footer | ⬜ Planned | Dark green #1A2820, 3-col: info / nav links / inquiry form |
| — | Highlights strip | ⬜ Planned | 3–4 key stats |
| — | Neighborhood teaser | ⬜ Planned | — |
| — | Gallery teaser | ⬜ Planned | Lightbox entry |
| — | Planpoint CTA | ⬜ Planned | Home teaser → /residences#planpoint |

---

## CSS Architecture

CSS Modules + CSS Custom Properties only. No Tailwind. No CSS-in-JS.
- One `Component.module.css` per component, co-located
- All values via `var(--token-name)` from `styles/tokens.css`
- Never hardcode colors, spacing, or type sizes

### Key Patterns

**Full-width background band** (VisionSection):
```css
.section { position: relative; isolation: isolate; overflow: hidden; }
.bg      { position: absolute; inset: 0; z-index: -2; background-image: url('...'); }
.overlay { position: absolute; inset: 0; z-index: -1; background-color: rgba(224, 237, 218, 0.82); }
```

**CTA button — slide-up hover:**
```css
.cta { position: relative; overflow: hidden; height: 3rem; line-height: 3rem; }
.cta span:first-child { transition: transform 0.35s var(--ease-out); }
.cta span:last-child  { position: absolute; inset: 0; transform: translateY(100%); }
.cta:hover span:first-child { transform: translateY(-100%); }
.cta:hover span:last-child  { transform: translateY(0); }
```

---

## Component Map

```
components/
├── blocks/
│   ├── HeroSection/
│   ├── OverviewSection/
│   ├── VisionSection/
│   └── ResidencesSection/
└── ui/
    ├── Nav/
    ├── AnimateIn/        ← Framer Motion scroll-reveal wrapper
    ├── ZoomImage/        ← useScroll parallax zoom (1.14→1.0)
    └── SmoothScroll/
```

---

## Image Assets (`public/images/`)

```
backgrounds/
  leaves-bg.jpg           ← Full-section bg (VisionSection)
  leaves-closeup.jpg      ← Close-up texture (Residences center placeholder)
renders/
  exterior-01.jpg         ← Hero left panel
  interior-01/02/03.jpg   ← OverviewSection panels + ResidencesSection large
  interior-04.jpg         ← ResidencesSection small
  amenity-01/02/03.jpg    ← available for AmenitiesSection (not yet built)
```
