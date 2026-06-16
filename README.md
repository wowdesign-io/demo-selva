# SELVA Residences — wowdesign Demo Site

Fictive luxury presales project — the reference build for wowdesign's presales product. Full brand brief: `references/demo-selva-inspiration.md`.

**Live:** https://demo.wowdesign.io
**Local:** `npm run dev` → http://localhost:3000
**Stack:** Next.js 16.2 (App Router, Turbopack) · TypeScript · Lenis (smooth scroll) · Vercel
**GitHub:** https://github.com/wowdesign-io/demo-selva (org `wowdesign-io`)

> ⚠️ **Read this whole file before touching the project.** The build method is specific and was hard-won. Deviating from it (e.g. writing CSS from scratch) caused a full rebuild once already.

---

## THE METHOD — how to build a page (do not deviate)

The handoff is a complete, validated static HTML prototype. **We port it verbatim — we do not redesign.**

**Handoff source (read-only canonical):** `C:\Users\info\Downloads\wowdesign Demo\`
- `SELVA <Page>.html` — the exact HTML for each page
- `selva/selva.css` — tokens/reset/typography/reveal system
- `selva/components/*.css` + `selva/pages/*.css` — all styles
- `selva/*.js` — interaction logic (home.js, residences.js, amenities.js, loader.js)

### Steps for each new inner page

1. **Read the handoff HTML first** — `C:\Users\info\Downloads\wowdesign Demo\SELVA <Page>.html`. Note the `<head>` `<link>` tags — they tell you exactly which CSS files the page needs.
2. **Copy any missing CSS** from `…\selva\components\` and `…\selva\pages\` into `styles/selva/`, then add an `@import` line in `styles/globals.css`. (Component CSS imports go with the components group; page CSS with the pages group.)
   - ⚠️ **Strip the UTF-8 BOM after copying.** The handoff CSS files carry a BOM; when bundled it gets prepended to the file's FIRST selector (e.g. `﻿ .amen`), silently invalidating that rule — symptom: missing background + collapsed layout on desktop only (media-query variants still work, so mobile looks fine). Fix: `node -e 'const fs=require("fs");const f="styles/selva/<file>.css";let s=fs.readFileSync(f,"utf8");if(s.charCodeAt(0)===0xFEFF)fs.writeFileSync(f,s.slice(1))'`. Detect BOMs: `head -c3 file.css | od -An -tx1` → `ef bb bf` means BOM. (carousel.css, prose-band.css, residences.css were hit on 2026-06-16.)
3. **Copy + optimize any new images** — see *Image optimization* below. Renders are huge PNGs; convert to WebP.
4. **Build the page** at `app/<route>/page.tsx`:
   - Use the **exact handoff class names and DOM structure**. No CSS Modules for sections.
   - Convert `public/images/...` → `/images/...` and `.png`/`.jpg` → `.webp` where converted.
   - Convert `SELVA X.html` links → app routes (`/vision`, `/residences#planpoint`, etc.).
   - `data-lines` attribute: write `data-lines=""`. Keep `.reveal` and `data-delay="…"` as-is.
   - Hero image: `decoding="async" fetchPriority="high"`. All other images: `loading="lazy" decoding="async"`.
   - Page is a **server component**; drop `<HomeScript />` at the end of `<main>` to drive reveals / hero animation / zoom. Interactive bits (carousels, embeds) become small `'use client'` components.
5. **Nav/Footer/ScrollProgress/Loader/SmoothScroll are global** (in `app/layout.tsx`) — never re-add them per page.
6. **Build → commit → push → deploy** (see *Deploy* below). Zero TS errors required.
7. **Stop and get Andy's approval before starting the next page.** One page at a time.

---

## Architecture

- **Styles:** all handoff CSS lives in `styles/selva/` and is imported once via `styles/globals.css`. Global class names used directly in JSX — **no CSS Modules for page sections.** (Old `*.module.css` files may linger unused; ignore them.)
- **Shared chrome (global, in `layout.tsx`):** `Loader`, `Nav`, `Footer`, `ScrollProgress`, `SmoothScroll`.
- **`components/ui/HomeScript/`** — ports `home.js`: `.reveal` IntersectionObserver, `[data-lines]` stagger, hero scroll animation (image width 50→100%, text fade/scale), `.zoom-panel`/`.zoom-img` scroll zoom, Miami temperature fetch. Include on **every page that has a hero**.
- **Hero entrance stagger** — pure CSS in `styles/selva/hero.css` (`heroRise` keyframes). Replays on every client-side navigation because the hero remounts. Global to all heroes.
- **Loader** — `components/ui/Loader/`. Shows once per session (sessionStorage `selvaLoaded`). An inline script in `layout.tsx` adds `.selva-loaded` to `<html>` pre-paint so it never flashes on repeat visits. Lenis init is deferred ~2.3s on first visit so it doesn't stutter the loader animation.

---

## Page status

| Route | Status | Handoff source | Notes |
|---|---|---|---|
| `/` | ✅ Done · approved | `SELVA Home.html` | loader, hero, overview, vision, residences teaser, sticky hscroll slider, amenities carousel, neighborhood |
| `/vision` | ✅ Done · approved | `SELVA Vision.html` | hero, stat-strip, vision band, 3 pillars (icon-grid), 2 feature rows, manifesto, page-cta |
| `/residences` | ✅ Done · approved | `SELVA Residences.html` | hero, light stat-strip, inline models slider (cursor-nav + `goToUnit`), **Planpoint embed**, 8 features, page-cta |
| `/amenities` | ✅ Done · approved | `SELVA Amenities.html` | hero, intro+carousel (shared `AmenitiesCarousel`), motion band, 7-item grid, "A Day at SELVA" sticky slider, page-cta |
| `/neighborhood` | ✅ Done · approved | `SELVA Neighborhood.html` | hero, proximity strip, intro band, sticky crossfade story, interactive SVG map (`NeighborhoodScript`), page-cta |
| `/gallery` | ✅ Done · approved | `SELVA Gallery.html` | filterable masonry (`GalleryGrid`, React state), no lightbox |
| `/team` | ✅ Done · approved | `SELVA Team.html` | 6 partner feature rows; team photos → WebP |
| `/legal` | ✅ Done | `SELVA Legal.html` | shared `LegalDoc` (masthead + TOC scrollspy), 9 sections |
| `/privacy` | ✅ Done | `SELVA Privacy.html` | shared `LegalDoc`, 10 sections |
| `/downloads` | ✅ Done | `SELVA Downloads.html` | doc masthead, 4 download cards, request band |
| `/press` | ⬜ **Next** | `SELVA Press.html` | + `/press/[slug]` articles (generateStaticParams) |
| `/inquiry` | ⬜ Planned | `SELVA Inquiry.html` | form + address/contact |

---

## Key interactive components (already built — reuse)

- **`components/blocks/PlanpointEmbed/`** — the digital-twin iframe (`app.planpoint.io/miami-wowdesign/laurent`). Fixed 100vh immersive embed: deep-link `f`/`u` params, UTM, fullscreen only. **Do NOT add parent scroll/click forwarding or auto-resize** — that broke floor-hover hit-testing (flicker) with Lenis. Full Planpoint embed spec, deep-link format, postMessage events, and this gotcha: `references/sops/planpoint-embed.md` (in the wowdesign OS repo). Used on `/residences`.
- **`components/blocks/ResModelsSlider/`** — inline horizontal models track with the floating arrow cursor-nav and `goToUnit(unit, floor)` deep-linking into the embed.
- **`components/blocks/AmenitiesSection/`** — the home carousel (tripled-DOM grow-into-slot mechanic, geometry from live DOM, keyboard + swipe).

---

## Image optimization (mandatory)

Handoff renders are 8–13 MB PNGs. **Never ship them raw** — a page of them hangs the tab for seconds.

`scripts/optimize-images.js` converts the handoff render/amenity/neighborhood PNGs → WebP (q80, max 2400px), reading from the lossless handoff source to avoid double compression:

```bash
node scripts/optimize-images.js
```

Then update references in code to `.webp`. Rule of thumb: **photographic renders → WebP**; keep the hero image eager, everything else `loading="lazy" decoding="async"`. (110 MB → ~9 MB on the home page this way.)

Favicon: `app/icon.png` (SELVA green/gold "S"). Do **not** let a default `app/favicon.ico` exist — it overrides the icon.

---

## Deploy (every change)

**Vercel Git auto-deploy is DISCONNECTED (2026-06-16)** — it kept racing the CLI and grabbing the `demo.wowdesign.io` alias with stale builds. Deploys are CLI-only now. `git push` is just source control; it does NOT deploy.

```bash
cd projects/demo-presales
npm run build                          # must be zero errors
git add -A && git commit -m "…"
gh auth switch --user wowdesign-andy   # uixandy lacks access to wowdesign-io org
git push origin main                   # source control only (no deploy)
vercel --prod --yes                    # manual prod deploy (MCP token lacks team scope)
```

If `demo.wowdesign.io` ever serves a stale build, pin the alias explicitly:
```bash
vercel alias set <new-deployment-url> demo.wowdesign.io
```
To re-enable auto-deploy later: `vercel git connect`.

---

## Brand quick-ref

- **SELVA Residences** — "Where the forest meets the sky" · 40 units · 3 floors · Models B/C/D · Miami (fictive) · Mid-2027
- Warm white `#FAFAF7` · Forest green `#2D4E2D` · Amber `#C9975A`
- Cormorant Garamond (headings, light italic) · DM Sans (body) · Barlow (labels)
- Pre-sales from $300K · 575–800 SF

---

## Known follow-ups (not blockers)

- **Spark CRM test account** for the Planpoint embed — pending from Laurent.
- **Storyblok wiring** — content is currently hardcoded in page files; maps to bloks once design is locked across all pages (do not start until every page is approved).
- Footer Brochure / Private Tour / Instagram links point to real routes or `#` — wire when those flows exist.
- Stale unused `*.module.css` files from the pre-rebuild era can be deleted in a cleanup pass.
