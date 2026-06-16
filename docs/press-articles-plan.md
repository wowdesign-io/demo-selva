# Plan — 9 Press Articles on One Template (Storyblok-ready)

_Created 2026-06-16. For the SELVA demo `/press` section._

## Goal

Turn the single hardcoded press article into **9 distinct articles** that all render
through the same `/press/[slug]` template — and shape the data now so the later
Storyblok migration is a **data-source swap, not a rewrite**.

## Current state (what exists)

- `app/press/page.tsx` — index, 9 coverage cards, all pointing at one slug.
- `app/press/[slug]/page.tsx` — template, but the **article body is hardcoded JSX**.
- `app/press/articles.ts` — slug-keyed `ARTICLES` map (1 entry) + `PRESS_CARDS`.

**Blocker:** body lives in the component, not the data. Until body is data, every
slug renders the same prose.

---

## The core decision: model `body` as a typed block array

A raw HTML string would force `dangerouslySetInnerHTML` and would **not** map to
Storyblok's editor. Instead, model the body as an ordered discriminated union —
this maps 1:1 to Storyblok nested bloks (and to a clean renderer today):

```ts
type Block =
  | { type: 'paragraph'; text: string }   // allows <em> and <a> inline
  | { type: 'heading'; text: string }      // h2 subhead
  | { type: 'quote'; text: string; cite: string }
  | { type: 'figure'; src: string; alt: string; caption: string };
```

Full `Article` interface (the contract the component depends on — keep stable
across the Storyblok swap):

```ts
interface Article {
  slug: string;
  publication: string;
  date: string;             // "May 2026"
  title: string;
  dek: string;
  byline: string;           // author name
  readTime: string;         // "6 min read"
  leadImage: { src: string; alt: string; caption: string };
  body: Block[];
  related: string[];        // slugs — resolve to cards from the map, no duplication
  seo: { title: string; description: string };
}
```

Note on inline marks: paragraph `text` carries a tiny known set (`<em>`, `<a>`).
In Storyblok these become richtext inline marks; quote/figure become nested bloks.

---

## Work items (in order)

### 1. Refactor the template into a renderer (no visual change)
- `[slug]/page.tsx`: map over `article.body`, switch on `block.type`, render with the
  **existing handoff classes** (`.article__body p`, `h2`, `.article__quote`,
  `.article__figure`). Drop-cap stays automatic (`p:first-of-type::first-letter` in CSS).
- Pull `leadImage`, masthead fields, `seo`, and `related` from data.
- `related: string[]` → look up each slug in `ARTICLES` to build the "More coverage" cards.

### 2. Give every card its own slug
- `PRESS_CARDS`: derive a unique slug per title (kebab-case).
- `generateStaticParams` then prerenders all 9 pages (already wired — just more slugs).

### 3. Write the 9 articles' content
- Only 8 have titles/publications today; bodies must be drafted.
- Voice: match the one written piece (Continuum) — calm, editorial, fictive coverage.
  The index already labels it "Illustrative coverage, created for this presentation."
- ~250–400 words each, 1–2 subheads, optional 1 pull-quote + 1 inline figure.
- Reuse existing render WebPs for lead/figure images (interior/exterior/vision sets) —
  no new image optimization needed.
- `related` per article = 3 siblings (rotate through the set).
- This is the bulk of the effort — it's content creation, best done in one pass and
  reviewed by Andy before deploy.

### 4. Build → deploy (per README CLI flow)
- `npm run build` (zero errors) → commit → push → `vercel --prod --yes` → pin alias.

---

## Storyblok migration (LATER — do not start until all pages approved)

The README is explicit: no Storyblok wiring until every page is locked. The data shape
above makes this a swap, not a rebuild.

1. **`press_article` blok schema** — fields mirror the `Article` interface:
   - publication (text), date (text), title (text), dek (textarea), byline (text),
     readTime (text), leadImage (asset), seo (plugin or two text fields)
   - **body** → nested bloks (`paragraph`, `heading`, `quote`, `figure`) rather than a
     plain richtext field, because quote + inline figure need custom styling the default
     richtext resolver makes awkward. Editors add/reorder blocks visually.
   - **related** → multi-option reference to other `press_article` stories.
2. **Index** — either a `press_index` story referencing articles, or query by
   content-type sorted by date. Cards derive from the same stories (single source).
3. **Swap the data source** — replace `getArticle` / `getAllSlugs` in `articles.ts` with
   `fetchStory` / `getStories({ content_type: 'press_article' })`. Components don't change
   because the `Article` interface is the contract.
4. **Rendering** — map Storyblok bloks → the same block renderer from work item 1.
5. **ISR** — `revalidate = 60`; `generateStaticParams` from `getStories`.

---

## Recommended sequencing

- Work items 1–4 (data-driven body + 9 written articles) can happen **now** — they're
  still local data, independent of Storyblok, and unblock real distinct articles for the demo.
- Storyblok migration happens in the later CMS pass across the whole site, once all pages
  (incl. `/inquiry`) are approved.
- Net: write the content once, shaped correctly, and never touch the component again.
