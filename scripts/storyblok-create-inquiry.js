'use strict';
// Creates doc_masthead + inquiry_form_block blocks, then creates and publishes the inquiry story.
// Run: node scripts/storyblok-create-inquiry.js

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';

function uid() { return Math.random().toString(36).slice(2, 10); }

const BLOCKS = [
  {
    name: 'doc_masthead',
    display_name: 'Document Header',
    is_root: false, is_nestable: true,
    schema: {
      label: { type: 'text',     pos: 0, display_name: 'Tagline' },
      title: { type: 'text',     pos: 1, display_name: 'Title' },
      lead:  { type: 'textarea', pos: 2, display_name: 'Lead Text' },
    },
  },
  {
    name: 'inquiry_form_block',
    display_name: 'Inquiry Form',
    is_root: false, is_nestable: true,
    schema: {
      submit_endpoint: { type: 'text', pos: 0, display_name: 'Submit Endpoint' },
    },
  },
];

const story = {
  name: 'Inquiry',
  slug: 'inquiry',
  content: {
    _uid: uid(),
    component: 'page',
    body: [
      {
        _uid: uid(), component: 'doc_masthead',
        label: 'SELVA Residences · Coconut Grove',
        title: 'Inquire',
        lead:  'Pre-sales are now open, from $300,000. Share a few details and a member of our sales team will be in touch.',
      },
      {
        _uid: uid(), component: 'inquiry_form_block',
        submit_endpoint: '',
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

  console.log('Creating inquiry blocks...');
  for (const block of BLOCKS) await createBlock(block);

  const check = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories?starts_with=inquiry`, {
    headers: { Authorization: TOKEN },
  });
  const { stories } = await check.json();
  const existing = stories?.find(s => s.slug === 'inquiry');

  if (existing) {
    console.log(`\nUpdating existing inquiry story (id=${existing.id})...`);
    const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${existing.id}`, {
      method: 'PUT',
      headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ story, publish: 1 }),
    });
    const d = await r.json();
    if (!r.ok) { console.error('PUT failed', d); process.exit(1); }
    console.log(`Updated and published: ${d.story.full_slug}`);
  } else {
    console.log('\nCreating inquiry story...');
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
