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
   - Convert `SELVA X.html` links → app routes (`/vision`, `/residences#digital-twin`, etc.).
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
| `/press` | ✅ Done · Session 8 | `SELVA Press.html` | **Storyblok-driven.** Index page fetches `press/index` story (PressIndex blok) + `starts_with=press/` article list. Article pages use StoryblokStory (PressArticle blok, async RSC fetches related). 6 new blocks (press_index, press_article, body_paragraph, body_heading, body_quote, body_figure) + 9 article stories in Storyblok folder `press/`. Script: `scripts/storyblok-create-press.js`. |
| `/inquiry` | ✅ Done | `SELVA Inquiry.html` | doc-head masthead + two-column inquiry section. `components/blocks/InquiryForm/` (client) ports inquiry.js: HTML5 validation → inline thank-you state (no backend). Static contact/location aside |

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

## Storyblok Integration — IN PROGRESS

Full integration plan: `C:\Users\info\.claude\plans\i-went-into-storyblok-refactored-clock.md`

### Space credentials
- **Space:** Selva Demo (Partner Portal — free dev space)
- **Space ID:** 293255653505523
- **Preview token:** `IOVXHrVadtekRL4pdBdzOQtt` (in `.env.local` — not committed)
- **Public token:** `LY0QTOCaUhVq3T1nykIHrAtt` (use in Vercel production env var)

### Session status

| Session | Scope | Status | Last updated |
|---|---|---|---|
| 0 — Setup | SDK install, env, next.config, lib/storyblok.ts, StoryblokProvider, layout.tsx | ✅ Done | 2026-06-17 |
| 1 — Home | 7 sections wired, all blocks created in Storyblok, home story filled | ✅ Done | 2026-06-17 |
| 2 — Residences | ResModelsSlider, PlanpointEmbed, ResHscroll, ResidenceFeatures wired | ✅ Done | 2026-06-18 |
| 3 — Vision | VisionCopyBand, DesignPillars, VisFeature ×2, Manifesto, VisionStatsBridge | ✅ Done | 2026-06-18 |
| 4 — Amenities | 7 images uploaded, 7 blocks created, AmenitiesIntroSection + CinematicBand + AmenitiesGridSection extracted, story published | ✅ Done | 2026-06-18 |
| 5 — Neighborhood | 4 images uploaded, 8 blocks created (nbhd_intro, nbhd_story, nbhd_story_panel, nbhd_map + map sub-blocks), NbhdIntro + NbhdStory + NbhdMap extracted, story published | ✅ Done | 2026-06-18 |
| 5b — Bug fixes | (1) PageCta heading renders raw HTML → dangerouslySetInnerHTML added; (2) Neighborhood hero used wrong field names (image/alt vs bg_image/bg_alt) + map_pin x/y were numbers not strings → fixed + republished; (3) Home hero missing from production → home story was published before page_hero rename — republished draft | ✅ Done | 2026-06-19 |
| 6 — Gallery + Team | GalleryGrid (blok? prop, 21 items from Storyblok CDN, content team can add images via editor), TeamIntro + TeamPartners (6 partner_row bloks), 6 team images uploaded to CDN, gallery + team stories published | ✅ Done | 2026-06-19 |
| 7 — Inquiry + Downloads | DocMasthead (shared), InquiryFormBlock wrapper, DownloadsGrid (icon_type option, file Asset), DownloadsRequest (multilink CTAs) | ✅ Done | 2026-06-19 |
| 8 — Press | Replace articles.ts with Storyblok stories | ✅ Done | 2026-06-19 |
| 9 — Legal + Privacy | Wire LegalDoc sections (Richtext) | ✅ Done | 2026-06-19 |
| 10 — Production | ISR webhook, token swap, catch-all route, deploy | ⬜ | — |

### Storyblok field ordering — critical rule

**Two separate ordering systems exist in Storyblok:**

| Where | What controls order | How to fix |
|---|---|---|
| Visual Editor sidebar (content editors) | `pos` value on each field | `PUT /components/{id}` — update pos only. **Zero content risk.** |
| Block Library schema editor (developers) | Insertion order (order fields were added via API) | Delete + recreate — only safe on dev/demo. **Never on live.** |

**On any live client project: only ever update `pos` values via PUT. Never delete+recreate.**

Story content is stored by component name + field key, not component ID — so delete+recreate does preserve content. But there is a brief window between delete and recreate where a cached preview could serve unresolved blocks. Unacceptable on live.

**Prevention (always do this on initial creation):** Use `[ordered]@{}` in PowerShell (or an ordered object in JS) so field insertion order matches `pos` order from the start. Convention:

```
Tagline → Heading → Text → Button Text → Button Link
→ [grouped extras e.g. Carousel Overlay Text, Carousel Overlay Link, Slides]
→ Image → Image - Alt Text
→ [boolean toggles last]
```

### Storyblok standards (apply from Session 4 onward — already done for 0–3)

All rules are baked into the full integration plan. Summary:

1. **Upload images first** — run `node scripts/storyblok-upload-renders.js` (extend for new image folders) before wiring any session
2. **Marketing-friendly labels** — `cta_href` → "Button Link", `cta_text` → "Button Text", `bg_image` → "Image", `bg_alt` → "Image - Alt Text", etc. Do this when creating blocks, not after
3. **All link fields = `multilink` type** — never `text`. Use `resolveLink()` from `@/lib/resolveLink` in components
4. **No Planpoint wording in editor UI** — use "Digital Twin" in block/field labels and `#digital-twin` for HTML anchors/IDs
5. **Check for reusable blocks before creating new ones** — before creating any block or component, scan what already exists. Same layout = same block. Reuse `page_hero`, `page_cta`, `res_stats_bridge`, `stat_item`, `vis_feature`, `feature_item` across pages before making new variants.
6. **HTML in heading/title fields** — some fields need `<em>` or `<br/>` for italics and line breaks (e.g. story panel titles, map headings, CTA headings). Store raw HTML in the text field and render via `dangerouslySetInnerHTML`. Document these fields as "HTML ok" in the block display name.

### What is currently wired (Sessions 0–3)

**lib/resolveLink.ts** — handles multilink objects + backward-compat strings. Import in every component with a link field.

**Stories created:** Home, Residences, Vision (all 14 href fields stored as multilink objects — not strings)

**22 render images** uploaded to Storyblok CDN via `scripts/storyblok-upload-renders.js`. Asset map: `storyblok-assets.json`.

### What to do at start of Session 6 (Gallery + Team)
1. Upload any new images (gallery images, team photos) to Storyblok CDN via `node scripts/storyblok-upload-renders.js` (extend script for new image folders)
2. Check for reusable blocks: `page_hero`, `page_cta` already exist — do not recreate
3. Create blocks: `gallery_intro`, `gallery_grid_block`, `gallery_filter`, `gallery_item`, `team_intro`, `team_partners`, `partner_row`
4. Extract GalleryGrid (has `useState` filter = client component), TeamPartners (reuses VisFeature)
5. Create gallery and team stories, fill content, publish
6. Push commit + `vercel --prod --yes`

### Block fallback pattern (use in every component)
```tsx
import { storyblokEditable } from '@storyblok/react/rsc'

export default function HeroSection({ blok }: { blok?: HeroBlok }) {
  const title = blok?.title ?? 'SELVA'  // falls back to hardcoded if blok missing
  return <div {...(blok ? storyblokEditable(blok) : {})}> ... </div>
}
```

---

## Automated Follow-Up System

**Rule: treat this as a live client project, not a demo. Every email must land and convince like real.**

### Stack decision (2026-06-18)
- **Email delivery:** Resend only — branded SELVA emails. No CRM. Demo is not indexed or publicly linked — shown on calls only.
- **Automation:** Zapier free plan — 2 Zaps (trigger + 1 action each)
- **Trigger:** Planpoint native Zapier "New Lead" (pending Laurent's invite) OR HubSpot free as short-term bridge (Planpoint → HubSpot native → Zapier HubSpot trigger) until invite arrives
- **Demo inbox:** andy@wowdesign.io with Gmail label `SELVA` — filter on subject containing "SELVA", skip inbox

### The 2 Zaps
| Zap | Trigger | Action | Notes |
|---|---|---|---|
| 1 | Planpoint New Lead | Resend → Add to "SELVA Prospects" audience → automation fires (instant + 30min + 60min sequence) | Prospect-facing branded emails |
| 2 | Planpoint New Lead | Resend → Send sales alert to andy@wowdesign.io | Subject contains "SELVA" → routes to label |

### Email content (to build)
- **Zap 1 — Sales alert:** Lead name, email, phone, unit requested, timestamp. Clear subject: "New Inquiry — SELVA Unit X"
- **Zap 2 — Prospect confirmation:** Branded SELVA header, references unit by name, what happens next (sales team will be in touch), project highlights, CTA to explore the site
- **Zap 3 — Follow-up (day 2 in production):** Softer touch, highlights the specific unit model, link back to Planpoint viewer

### Status
- [ ] Resend account set up + wowdesign.io domain verified
- [ ] Zap 1 built + tested
- [ ] Zap 2 built + tested (email template designed)
- [ ] Zap 3 built + tested
- [x] Gmail SELVA label + filter configured (andy@wowdesign.io)
- [ ] Trigger confirmed: waiting on Laurent (Zapier invite) + Richard (Spark.re call 2026-06-19)
- [ ] Inquiry form `/inquiry` wired to backend (currently static HTML5 validation only)

### Demo access — security
- Demo lives at https://demo.wowdesign.io — **never share URL publicly**
- [ ] Vercel deployment protection (password) — to be enabled on Vercel Pro
- [ ] robots.txt noindex — verify this is in place

---

## Known follow-ups (not blockers)

- **Spark CRM test account** for the Planpoint embed — pending from Laurent. Richard Causton call 2026-06-19.
- **Zapier integration invite** — requested from Laurent 2026-06-18. Determines trigger path for automation.
- Footer Brochure / Private Tour / Instagram links point to real routes or `#` — wire when those flows exist.
- Stale unused `*.module.css` files from the pre-rebuild era can be deleted in a cleanup pass.
