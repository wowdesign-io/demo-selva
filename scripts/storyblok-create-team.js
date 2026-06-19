'use strict';
// Creates team_intro, partner_row, team_partners in Block Library,
// then creates and publishes the team story.
// Run: node scripts/storyblok-create-team.js

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

// ── Block definitions ─────────────────────────────────────────────────────────

const BLOCKS = [
  {
    name: 'team_intro',
    display_name: 'Team Intro',
    is_root: false, is_nestable: true,
    schema: {
      label: { type: 'text',     pos: 0, display_name: 'Tagline' },
      lead:  { type: 'textarea', pos: 1, display_name: 'Lead Text' },
      body:  { type: 'textarea', pos: 2, display_name: 'Body Text' },
    },
  },
  {
    name: 'partner_row',
    display_name: 'Partner Row',
    is_root: false, is_nestable: true,
    schema: {
      img:           { type: 'asset',   pos: 0,  display_name: 'Image' },
      alt:           { type: 'text',    pos: 1,  display_name: 'Image - Alt Text' },
      eyebrow:       { type: 'text',    pos: 2,  display_name: 'Eyebrow' },
      heading_line_1:{ type: 'text',    pos: 3,  display_name: 'Heading Line 1' },
      heading_line_2:{ type: 'text',    pos: 4,  display_name: 'Heading Line 2' },
      person:        { type: 'text',    pos: 5,  display_name: 'Person Name' },
      role:          { type: 'text',    pos: 6,  display_name: 'Role' },
      body_1:        { type: 'textarea',pos: 7,  display_name: 'Text 1' },
      body_2:        { type: 'textarea',pos: 8,  display_name: 'Text 2' },
      pills:         { type: 'text',    pos: 9,  display_name: 'Skills / Tags (comma-separated)' },
      reverse:       { type: 'boolean', pos: 10, display_name: 'Reverse Layout' },
    },
  },
  {
    name: 'team_partners',
    display_name: 'Team Partners',
    is_root: false, is_nestable: true,
    schema: {
      partners: { type: 'bloks', pos: 0, display_name: 'Partners', component_whitelist: ['partner_row'], restrict_components: true },
    },
  },
];

// ── Story content ─────────────────────────────────────────────────────────────

const story = {
  name: 'Team',
  slug: 'team',
  content: {
    _uid: uid(),
    component: 'page',
    body: [

      // ── HERO ──────────────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'page_hero',
        wordmark_style: false,
        pre_label:     'Miami · The Team',
        title:         'The people\nbehind SELVA',
        tagline:       'Architects, designers and makers shaping a building that lives with the forest.',
        delivery_note: 'Delivery Mid-2027',
        bg_image: a('vision-01.webp'),
        bg_alt:   'A SELVA residence opening to the botanical canopy',
      },

      // ── INTRO ─────────────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'team_intro',
        label: 'The Makers',
        lead:  'SELVA is the work of a small, like-minded group of partners — the developer, architects, interior and landscape designers, and the people who bring it to the world — united by one idea: that a home should feel grown, not built.',
        body:  'Each discipline shaped the next, in close collaboration, so that structure, interior and planting read as a single, continuous gesture — a building that belongs to its corner of Coconut Grove.',
      },

      // ── PARTNER ROWS ──────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'team_partners',
        partners: [
          {
            _uid: uid(), component: 'partner_row',
            img:            a('developer.webp'),
            alt:            'Banyan Bay Development',
            reverse:        false,
            eyebrow:        'Developer',
            heading_line_1: 'Banyan Bay',
            heading_line_2: 'Development',
            person:         'David Calloway',
            role:           'Founding Partner',
            body_1:         'Banyan Bay Development conceived SELVA as a deliberately small project — forty residences across three intimate storeys — and has shepherded it from raw land to delivery in mid-2027.',
            body_2:         'Their approach favours the long view of Coconut Grove over the quick exit: fewer homes, finer detailing, and a building made to belong to its street for decades.',
            pills:          'Boutique Residential,Coconut Grove,Long-Term Hold',
          },
          {
            _uid: uid(), component: 'partner_row',
            img:            a('architect.webp'),
            alt:            'Estudio Frondoso',
            reverse:        true,
            eyebrow:        'Architecture',
            heading_line_1: 'Estudio',
            heading_line_2: 'Frondoso',
            person:         'Marisol Rivera',
            role:           'Principal Architect',
            body_1:         'Estudio Frondoso shaped SELVA around the canopy rather than above it — three low storeys, cantilevered terraces and deep eaves that fold planting into the structure.',
            body_2:         'Warm-white stone and fluted timber let the architecture recede, so that from the street the building reads as part of the forest it sits within.',
            pills:          'Biophilic Design,Low-Rise,Tropical Modern',
          },
          {
            _uid: uid(), component: 'partner_row',
            img:            a('interior-design.webp'),
            alt:            'Taller Lumina',
            reverse:        false,
            eyebrow:        'Interior Design',
            heading_line_1: 'Taller',
            heading_line_2: 'Lumina',
            person:         'Clara Bennett',
            role:           'Design Director',
            body_1:         'Taller Lumina drew SELVA’s interior palette straight from nature — white oak, honed travertine, woven cane and brushed brass, framed by glass that opens to the green.',
            body_2:         'Each room is composed to feel grown rather than installed, with light that shifts across the day and planting never more than a glance away.',
            pills:          'Natural Materials,Custom Millwork,Light & Calm',
          },
          {
            _uid: uid(), component: 'partner_row',
            img:            a('landscape.webp'),
            alt:            'Raíz Landscape Studio',
            reverse:        true,
            eyebrow:        'Landscape',
            heading_line_1: 'Raíz Landscape',
            heading_line_2: 'Studio',
            person:         'Mateo Fuentes',
            role:           'Studio Director',
            body_1:         'Raíz Landscape Studio treats planting as architecture, not decoration. Vertical gardens, terrace plantings and a courtyard at the building’s heart keep green within reach of every residence.',
            body_2:         'Native and tropical species are layered through the structure so the landscape matures with the building, softening it year on year.',
            pills:          'Native Planting,Vertical Gardens,Courtyards',
          },
          {
            _uid: uid(), component: 'partner_row',
            img:            a('sales-marketing.webp'),
            alt:            'Meridian Residential',
            reverse:        false,
            eyebrow:        'Sales & Marketing',
            heading_line_1: 'Meridian',
            heading_line_2: 'Residential',
            person:         'Karen Whitfield',
            role:           'Sales Director',
            body_1:         'Meridian Residential leads SELVA’s pre-sales and private previews from the Coconut Grove gallery, guiding residents through floorplans, finishes and the story of the building.',
            body_2:         'Their team accompanies each buyer from first visit to closing, with the unhurried, personal service a boutique address of forty homes allows.',
            pills:          'Pre-Sales,Private Previews,Grove Gallery',
          },
          {
            _uid: uid(), component: 'partner_row',
            img:            a('andy-bittner.webp'),
            alt:            'Andy Bittner — wowdesign',
            reverse:        true,
            eyebrow:        'Digital Experience',
            heading_line_1: 'wowdesign',
            heading_line_2: '',
            person:         'Andy Bittner',
            role:           'Founder',
            body_1:         'wowdesign designed SELVA’s digital experience — the website and the interactive floorplan tools — translating the architecture’s quiet, botanical character into every screen.',
            body_2:         'From the first scroll to the live availability map, the goal was a digital home as considered and calm as the residences themselves.',
            pills:          'Web Design,Interactive Floorplans,UX & Product',
          },
        ],
      },

      // ── CTA ───────────────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'page_cta',
        label:    'Explore Next',
        heading:  'Find your place<br /><em>at SELVA</em>',
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

const REQUIRED_TEAM_IMAGES = [
  'developer.webp', 'architect.webp', 'interior-design.webp',
  'landscape.webp', 'sales-marketing.webp', 'andy-bittner.webp',
];

async function main() {
  if (!TOKEN) throw new Error('STORYBLOK_PERSONAL_TOKEN not set');

  // Preflight: verify all team images are uploaded to Storyblok
  const missing = REQUIRED_TEAM_IMAGES.filter(f => !assets[f] || !assets[f].filename);
  if (missing.length > 0) {
    console.error('\n❌ Team images not yet uploaded to Storyblok:');
    missing.forEach(f => console.error(`     ${f}`));
    console.error('\nRun this first:\n  node scripts/storyblok-upload-team.js\n');
    process.exit(1);
  }
  console.log('✓ All team images confirmed in Storyblok CDN');

  // 1. Create blocks
  console.log('\nCreating team blocks...');
  for (const block of BLOCKS) await createBlock(block);

  // 2. Create or update story
  const check = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories?starts_with=team`, {
    headers: { Authorization: TOKEN },
  });
  const { stories } = await check.json();
  const existing = stories?.find(s => s.slug === 'team');

  let storyId;
  if (existing) {
    console.log(`\nUpdating existing team story (id=${existing.id})...`);
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
    console.log('\nCreating team story...');
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
