'use strict';
// Creates downloads_masthead, downloads_grid, download_card, downloads_request blocks,
// then creates and publishes the downloads story.
// Run: node scripts/storyblok-create-downloads.js

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';

function uid() { return Math.random().toString(36).slice(2, 10); }

function sbLink(url) {
  return { linktype: 'url', url, cached_url: url, fieldtype: 'multilink', target: '' };
}

const BLOCKS = [
  {
    name: 'download_card',
    display_name: 'Download Card',
    is_root: false, is_nestable: true,
    schema: {
      icon_type: {
        type: 'option', pos: 0, display_name: 'Icon Type',
        options: [
          { value: 'doc',   name: 'Document' },
          { value: 'plan',  name: 'Floor Plan' },
          { value: 'sheet', name: 'Fact Sheet' },
        ],
        default_value: 'doc',
      },
      name:   { type: 'text',     pos: 1, display_name: 'Name' },
      format: { type: 'text',     pos: 2, display_name: 'Format' },
      desc:   { type: 'textarea', pos: 3, display_name: 'Description' },
      file:   { type: 'asset',    pos: 4, display_name: 'File' },
    },
  },
  {
    name: 'downloads_grid',
    display_name: 'Downloads Grid',
    is_root: false, is_nestable: true,
    schema: {
      section_label: { type: 'text',  pos: 0, display_name: 'Section Label' },
      cards:         { type: 'bloks', pos: 1, display_name: 'Download Cards', component_whitelist: ['download_card'], restrict_components: true },
    },
  },
  {
    name: 'downloads_request',
    display_name: 'Downloads Request Band',
    is_root: false, is_nestable: true,
    schema: {
      label:            { type: 'text',      pos: 0, display_name: 'Tagline' },
      heading:          { type: 'text',      pos: 1, display_name: 'Heading' },
      email_cta_text:   { type: 'text',      pos: 2, display_name: 'Email Button Text' },
      email_href:       { type: 'multilink', pos: 3, display_name: 'Email Link' },
      explore_cta_text: { type: 'text',      pos: 4, display_name: 'Explore Button Text' },
      explore_href:     { type: 'multilink', pos: 5, display_name: 'Explore Link' },
    },
  },
];

const story = {
  name: 'Downloads',
  slug: 'downloads',
  content: {
    _uid: uid(),
    component: 'page',
    body: [
      {
        _uid: uid(), component: 'doc_masthead',
        label: 'SELVA Residences · Coconut Grove',
        title: 'Downloads',
        lead:  'A small library of resources to guide your pre-sales journey — the brochures, conceptual floor plans and the essentials, all in one place.',
      },
      {
        _uid: uid(), component: 'downloads_grid',
        section_label: 'The Collection',
        cards: [
          { _uid: uid(), component: 'download_card', icon_type: 'doc',   format: 'PDF · 12 pp', name: 'Teaser Brochure',         desc: 'A first look at SELVA — the vision, the architecture and the canopy setting in Coconut Grove.' },
          { _uid: uid(), component: 'download_card', icon_type: 'doc',   format: 'PDF · 48 pp', name: 'The Residences Brochure',  desc: 'The full presentation — residences, finishes, amenities and the three models that make up the building.' },
          { _uid: uid(), component: 'download_card', icon_type: 'plan',  format: 'PDF · 8 pp',  name: 'Floor Plans',              desc: 'Conceptual layouts for the three models — B, C and D — across the building\'s three storeys.' },
          { _uid: uid(), component: 'download_card', icon_type: 'sheet', format: 'PDF · 2 pp',  name: 'Fact Sheet',               desc: 'The essentials at a glance — forty residences across three storeys, with delivery scheduled for mid-2027.' },
        ],
      },
      {
        _uid: uid(), component: 'downloads_request',
        label:            'By Request',
        heading:          'Looking for something <em>specific?</em>',
        email_cta_text:   'Email Sales',
        email_href:       sbLink('mailto:sales@selvaresidences.com'),
        explore_cta_text: 'Explore Floorplans',
        explore_href:     sbLink('/residences#digital-twin'),
      },
    ],
  },
};

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

async function main() {
  if (!TOKEN) throw new Error('STORYBLOK_PERSONAL_TOKEN not set');

  console.log('Creating downloads blocks...');
  for (const block of BLOCKS) await createBlock(block);

  const check = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories?starts_with=downloads`, {
    headers: { Authorization: TOKEN },
  });
  const { stories } = await check.json();
  const existing = stories?.find(s => s.slug === 'downloads');

  if (existing) {
    console.log(`\nUpdating existing downloads story (id=${existing.id})...`);
    const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${existing.id}`, {
      method: 'PUT',
      headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ story, publish: 1 }),
    });
    const d = await r.json();
    if (!r.ok) { console.error('PUT failed', d); process.exit(1); }
    console.log(`Updated and published: ${d.story.full_slug}`);
  } else {
    console.log('\nCreating downloads story...');
    const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
      method: 'POST',
      headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ story, publish: 1 }),
    });
    const d = await r.json();
    if (!r.ok) { console.error('POST failed', d); process.exit(1); }
    console.log(`Created and published: ${d.story.full_slug} (id=${d.story.id})`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
