'use strict';
// Creates gallery_filter, gallery_item, gallery_grid_block in Block Library,
// then creates and publishes the gallery story.
// Run: node scripts/storyblok-create-gallery.js

const fs   = require('fs');
const path = require('path');

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';

const assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../storyblok-assets.json'), 'utf8'));
const a = name => assets[name] || { filename: '', alt: '', fieldtype: 'asset', id: null };

function uid() { return Math.random().toString(36).slice(2, 10); }

function sbLink(url) {
  return { linktype: 'url', url, cached_url: url, fieldtype: 'multilink', target: '' };
}

// ── Block definitions ──────────────────────────────────────────────────────────

const BLOCKS = [
  {
    name: 'gallery_filter',
    display_name: 'Filter',
    is_root: false, is_nestable: true,
    schema: {
      cat:   { type: 'text', pos: 0, display_name: 'Category Key' },
      label: { type: 'text', pos: 1, display_name: 'Label' },
    },
  },
  {
    name: 'gallery_item',
    display_name: 'Gallery Item',
    is_root: false, is_nestable: true,
    schema: {
      src:          { type: 'asset',    pos: 0, display_name: 'Image' },
      alt:          { type: 'text',     pos: 1, display_name: 'Image - Alt Text' },
      cat:          { type: 'text',     pos: 2, display_name: 'Category' },
      aspect_ratio: { type: 'text',     pos: 3, display_name: 'Aspect Ratio' },
      cap_cat:      { type: 'text',     pos: 4, display_name: 'Caption Category' },
      cap_name:     { type: 'text',     pos: 5, display_name: 'Caption Name' },
    },
  },
  {
    name: 'gallery_grid_block',
    display_name: 'Gallery Grid',
    is_root: false, is_nestable: true,
    schema: {
      label:   { type: 'text',     pos: 0, display_name: 'Tagline' },
      heading: { type: 'text',     pos: 1, display_name: 'Heading' },
      filters: { type: 'bloks',    pos: 2, display_name: 'Filters',       component_whitelist: ['gallery_filter'], restrict_components: true },
      items:   { type: 'bloks',    pos: 3, display_name: 'Gallery Items',  component_whitelist: ['gallery_item'],   restrict_components: true },
    },
  },
];

// ── Gallery items (all 21, mapped from existing Storyblok assets) ─────────────

const GALLERY_ITEMS = [
  { file: 'exterior-02.webp',          cat: 'exterior', ar: '2752/1536', alt: 'Twilight facade among the canopy',                   capCat: 'Exterior',  capName: 'Twilight Facade' },
  { file: 'terrace.webp',              cat: 'interior', ar: '1792/2400', alt: 'Patio suite opening to a planted terrace',           capCat: 'Interior',  capName: 'Patio Suite' },
  { file: 'pool-deck.webp',            cat: 'amenity',  ar: '1792/2400', alt: 'Infinity pool terrace above the canopy',             capCat: 'Amenity',   capName: 'Pool Terrace' },
  { file: 'cultural-district.webp',    cat: 'grove',    ar: '2816/1536', alt: 'The design quarter at golden hour',                   capCat: 'The Grove', capName: 'The Design Quarter' },
  { file: 'balcony.webp',              cat: 'interior', ar: '1792/2400', alt: 'Den suite with ocean-view balcony',                  capCat: 'Interior',  capName: 'Ocean-View Den' },
  { file: 'exterior-04.webp',          cat: 'exterior', ar: '1792/2400', alt: 'Architecture wrapped in the Coconut Grove canopy',   capCat: 'Exterior',  capName: 'Canopy Facade' },
  { file: 'sky-terrace.webp',          cat: 'amenity',  ar: '1792/2400', alt: 'Rooftop sky terrace at dusk',                        capCat: 'Amenity',   capName: 'Sky Terrace' },
  { file: 'kitchen-wide.webp',         cat: 'interior', ar: '2752/1536', alt: 'Open oak kitchen with travertine island',            capCat: 'Interior',  capName: 'Open Kitchen' },
  { file: 'bayfront-marina.webp',      cat: 'grove',    ar: '2816/1536', alt: 'Bayfront marina lined with sailboats',               capCat: 'The Grove', capName: 'Bayfront Marina' },
  { file: 'spa-room.webp',             cat: 'amenity',  ar: '1792/2400', alt: 'Wellness spa treatment room',                        capCat: 'Amenity',   capName: 'Wellness Spa' },
  { file: 'vision-02.webp',            cat: 'exterior', ar: '1376/768',  alt: 'Aerial view of SELVA among the treetops',            capCat: 'Exterior',  capName: 'Among the Canopy' },
  { file: 'lounge.webp',               cat: 'amenity',  ar: '1792/2400', alt: "Residents' lounge with living greenery",             capCat: 'Amenity',   capName: "Residents' Lounge" },
  { file: 'bathroom.webp',             cat: 'interior', ar: '1792/2400', alt: 'Primary bath with oak vanity and palm views',        capCat: 'Interior',  capName: 'Primary Bath' },
  { file: 'sidewalk-storefronts.webp', cat: 'grove',    ar: '2816/1536', alt: 'Tree-lined sidewalks and storefronts',               capCat: 'The Grove', capName: 'Grove Sidewalks' },
  { file: 'garden-courtyard.webp',     cat: 'amenity',  ar: '1792/2400', alt: 'Botanical garden courtyard',                         capCat: 'Amenity',   capName: 'Garden Courtyard' },
  { file: 'kitchen.webp',              cat: 'interior', ar: '1792/2400', alt: 'Kitchen detail in warm oak and stone',               capCat: 'Interior',  capName: 'The Kitchen' },
  { file: 'outdoor-dining.webp',       cat: 'grove',    ar: '2816/1536', alt: 'Garden dining under string lights',                  capCat: 'The Grove', capName: 'Garden Dining' },
  { file: 'fitness.webp',              cat: 'amenity',  ar: '1792/2400', alt: 'Fitness studio facing a vertical garden',            capCat: 'Amenity',   capName: 'Fitness Studio' },
  { file: 'exterior-05.webp',          cat: 'amenity',  ar: '2752/1536', alt: 'Rooftop pool above the treetops',                    capCat: 'Amenity',   capName: 'Rooftop Pool' },
  { file: 'coworking-library.webp',    cat: 'amenity',  ar: '1792/2400', alt: 'Oak-panelled library and co-working room',           capCat: 'Amenity',   capName: 'Library & Co-Work' },
  { file: 'vision-01.webp',            cat: 'interior', ar: '1376/768',  alt: 'Living space opening to a botanical terrace',        capCat: 'Interior',  capName: 'Garden Terrace' },
];

// ── Story content ─────────────────────────────────────────────────────────────

const story = {
  name: 'Gallery',
  slug: 'gallery',
  content: {
    _uid: uid(),
    component: 'page',
    body: [

      // ── HERO ──────────────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'page_hero',
        wordmark_style: false,
        pre_label:     'Miami · Gallery',
        title:         'A closer look',
        tagline:       'Architecture, interiors and the life around SELVA — frame by frame.',
        delivery_note: 'Delivery Mid-2027',
        bg_image: a('exterior-03.webp'),
        bg_alt:   'SELVA Residences — the botanical entrance loggia among the canopy',
      },

      // ── GALLERY GRID ──────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'gallery_grid_block',
        label:   'The Gallery',
        heading: 'Forty residences,<br />one botanical world',
        filters: [
          { _uid: uid(), component: 'gallery_filter', cat: 'all',      label: 'All' },
          { _uid: uid(), component: 'gallery_filter', cat: 'exterior', label: 'Exteriors' },
          { _uid: uid(), component: 'gallery_filter', cat: 'interior', label: 'Interiors' },
          { _uid: uid(), component: 'gallery_filter', cat: 'amenity',  label: 'Amenities' },
          { _uid: uid(), component: 'gallery_filter', cat: 'grove',    label: 'The Grove' },
        ],
        items: GALLERY_ITEMS.map(it => ({
          _uid:         uid(),
          component:    'gallery_item',
          src:          a(it.file),
          alt:          it.alt,
          cat:          it.cat,
          aspect_ratio: it.ar,
          cap_cat:      it.capCat,
          cap_name:     it.capName,
        })),
      },

      // ── CTA ───────────────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'page_cta',
        label:    'Explore Next',
        heading:  'See it for <em>yourself</em>',
        cta_text: 'Explore Floorplans',
        cta_href: sbLink('/residences#digital-twin'),
      },

    ],
  },
};

// ── API helpers ───────────────────────────────────────────────────────────────

async function createBlock(def) {
  try {
    const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components/`, {
      method: 'POST',
      headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ component: def }),
    });
    const d = await r.json();
    if (!r.ok) {
      if (r.status === 422) { console.log(`  –  ${def.name} (already exists — skipped)`); return; }
      throw new Error(`${r.status}: ${JSON.stringify(d)}`);
    }
    console.log(`  ✓  ${def.name}`);
  } catch (e) {
    console.error(`  ✗  ${def.name}: ${e.message}`);
  }
}

const REQUIRED_GALLERY_IMAGES = [
  'exterior-03.webp',    // hero
  'exterior-02.webp', 'terrace.webp', 'pool-deck.webp', 'cultural-district.webp',
  'balcony.webp', 'exterior-04.webp', 'sky-terrace.webp', 'kitchen-wide.webp',
  'bayfront-marina.webp', 'spa-room.webp', 'vision-02.webp', 'lounge.webp',
  'bathroom.webp', 'sidewalk-storefronts.webp', 'garden-courtyard.webp',
  'kitchen.webp', 'outdoor-dining.webp', 'fitness.webp', 'exterior-05.webp',
  'coworking-library.webp', 'vision-01.webp',
];

async function main() {
  if (!TOKEN) throw new Error('STORYBLOK_PERSONAL_TOKEN not set');

  // Preflight: verify all gallery images are in the Storyblok asset map
  const missing = REQUIRED_GALLERY_IMAGES.filter(f => !assets[f] || !assets[f].filename);
  if (missing.length > 0) {
    console.error('\n❌ Gallery images not yet uploaded to Storyblok:');
    missing.forEach(f => console.error(`     ${f}`));
    console.error('\nThese should already be in storyblok-assets.json from prior sessions.');
    console.error('Run the relevant upload script if any are missing.\n');
    process.exit(1);
  }
  console.log('✓ All gallery images confirmed in Storyblok CDN');

  // 1. Create blocks
  console.log('\nCreating gallery blocks...');
  for (const block of BLOCKS) await createBlock(block);

  // 2. Create or update story
  const check = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories?starts_with=gallery`, {
    headers: { Authorization: TOKEN },
  });
  const { stories } = await check.json();
  const existing = stories?.find(s => s.slug === 'gallery');

  let storyId;
  if (existing) {
    console.log(`\nUpdating existing gallery story (id=${existing.id})...`);
    storyId = existing.id;
    const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${storyId}`, {
      method: 'PUT',
      headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ story, publish: 1 }),
    });
    const d = await r.json();
    if (!r.ok) { console.error('PUT failed', d); process.exit(1); }
    console.log(`Updated and published: ${d.story.full_slug}`);
  } else {
    console.log('\nCreating gallery story...');
    const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
      method: 'POST',
      headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ story, publish: 1 }),
    });
    const d = await r.json();
    if (!r.ok) { console.error('POST failed', d); process.exit(1); }
    storyId = d.story.id;
    console.log(`Created and published: ${d.story.full_slug} (id=${storyId})`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
