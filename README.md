# SELVA Residences — wowdesign Demo Site

Fictive luxury presales project. Full decisions, sitemap, and brand brief: `references/demo-selva-inspiration.md` (pinned on dashboard). This file covers the technical build only.

**Live:** demo.wowdesign.io  
**Local:** `npm run dev` → http://localhost:3000  
**Stack:** Next.js 16.2 (App Router) · CSS Modules · Framer Motion 12 · Lenis · Vercel  
**GitHub:** https://github.com/wowdesign-io/demo-selva  
**Note:** Swiper removed 2026-06-13 — replaced by custom carousel in AmenitiesSection.

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
| 6 | AmenitiesSection | ✅ Done | Custom carousel — grow-into-slot mechanic, green nav panel, infinite loop, keyboard + swipe |
| 7 | NeighborhoodSection | ✅ Done | Full-bleed break image + green proximity strip + centered statement |
| 8 | Footer | ✅ Done | Light/airy — action tiles + SELVA wordmark + bottom bar with wowdesign credit |

**Home page is complete.** All sections from the `design_handoff_selva_home` bundle are integrated.

### Remaining — Inner Pages

| Page | Status | Notes |
|---|---|---|
| /residences | ⬜ Planned | Residences detail + Planpoint embed at #planpoint |
| /amenities | ⬜ Planned | Full amenities page |
| /neighborhood | ⬜ Planned | Full neighborhood page |
| /gallery | ⬜ Planned | Lightbox gallery |
| /vision | ⬜ Planned | Vision/story page |
| /press | ⬜ Planned | Press mentions |
| /team | ⬜ Planned | Sales team |

### Future Polish

- **Real amenity renders** — `amenity-0{1,2,3}-sharp.jpg` are 2× upscales of low-res placeholders. Swap in real high-res renders at the same filenames.
- **Storyblok wiring** — `SLIDES` in AmenitiesSection + stats/copy in NeighborhoodSection + footer fields are all hardcoded arrays. Per the handoff spec, these map 1:1 to Storyblok repeatable bloks when CMS wiring begins.
- **Brochure + Private Tour links** — Footer action tiles point to `#`. Wire to actual form/booking flow.
- **Instagram link** — Footer social button points to `#`. Wire to SELVA Instagram when live.

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
│   ├── ResidencesSection/
│   ├── AmenitiesSection/    ← custom carousel (grow-into-slot, tripled slides, CSS var geometry)
│   └── NeighborhoodSection/ ← break image + proximity strip + centered statement
└── ui/
    ├── Nav/
    ├── Footer/              ← global, mounted in layout.tsx (light/airy, 3 bands)
    ├── AnimateIn/           ← Framer Motion scroll-reveal wrapper
    ├── ZoomImage/           ← useScroll parallax zoom (fromScale→1.0)
    ├── ScrollProgress/
    └── SmoothScroll/
```

---

## Image Assets (`public/images/`)

```
backgrounds/
  leaves-bg.jpg              ← Full-section bg (VisionSection + AmenitiesSection texture)
  leaves-closeup.jpg         ← Close-up texture (Residences center + Amenities green panel)
hero/
  hero-back.jpg              ← NeighborhoodSection full-bleed break image (~5000px source)
  360-front.jpg              ← Hero/other use
renders/
  exterior-01.jpg            ← Hero left panel
  interior-01/02/03/04.jpg   ← OverviewSection panels + ResidencesSection + Amenities carousel slides 4–7
  amenity-01/02/03.jpg       ← OverviewSection panel (amenity-03) + low-res originals
  amenity-01/02/03-sharp.jpg ← AmenitiesSection carousel slides 1–3 (2× upscales — swap for real renders)
```
