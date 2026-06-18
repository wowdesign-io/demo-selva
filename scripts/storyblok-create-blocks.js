// One-time setup: creates all Session 1 Storyblok blocks via Management API
// Usage: node scripts/storyblok-create-blocks.js <personal_access_token>

const TOKEN = process.argv[2] || process.env.STORYBLOK_PERSONAL_TOKEN;
if (!TOKEN) {
  console.error('No token found. Set STORYBLOK_PERSONAL_TOKEN env var or pass it as an argument.');
  process.exit(1);
}

const BASE = 'https://mapi.storyblok.com/v1';

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${JSON.stringify(data)}`);
  return data;
}

async function createComponent(spaceId, def) {
  try {
    await api('POST', `/spaces/${spaceId}/components/`, { component: def });
    console.log(`  ✓  ${def.name}`);
  } catch (e) {
    if (e.message.includes('422')) {
      console.log(`  –  ${def.name} (already exists — skipped)`);
    } else {
      console.error(`  ✗  ${def.name}: ${e.message}`);
    }
  }
}

const t   = (pos) => ({ type: 'text',     pos });
const ta  = (pos) => ({ type: 'textarea', pos });
const a   = (pos) => ({ type: 'asset',    pos });
const blk = (pos, whitelist) => ({
  type: 'bloks',
  pos,
  ...(whitelist && { component_whitelist: whitelist, restrict_components: true }),
});

const COMPONENTS = [
  {
    name: 'page', display_name: 'Page',
    is_root: true, is_nestable: false,
    schema: { body: blk(0) },
  },
  {
    name: 'home_hero', display_name: 'Home Hero',
    is_root: false, is_nestable: true,
    schema: {
      pre_label:     t(0),
      title:         t(1),
      tagline:       t(2),
      delivery_note: t(3),
      bg_image:      a(4),
      bg_alt:        t(5),
    },
  },
  {
    name: 'overview_section', display_name: 'Overview Section',
    is_root: false, is_nestable: true,
    schema: {
      intro_text: ta(0),
      panels:     blk(1, ['overview_panel']),
    },
  },
  {
    name: 'overview_panel', display_name: 'Overview Panel',
    is_root: false, is_nestable: true,
    schema: { label: t(0), href: t(1), image: a(2), alt: t(3) },
  },
  {
    name: 'vision_teaser', display_name: 'Vision Teaser',
    is_root: false, is_nestable: true,
    schema: {
      label:    t(0),
      headline: t(1),
      body_1:   ta(2),
      body_2:   ta(3),
      cta_text: t(4),
      cta_href: t(5),
      image:    a(6),
      alt:      t(7),
    },
  },
  {
    name: 'residences_teaser', display_name: 'Residences Teaser',
    is_root: false, is_nestable: true,
    schema: {
      label:    t(0),
      heading:  t(1),
      sub:      ta(2),
      cta_text: t(3),
      cta_href: t(4),
    },
  },
  {
    name: 'res_card', display_name: 'Residence Card',
    is_root: false, is_nestable: true,
    schema: {
      model_tag:       t(0),
      name:            t(1),
      sf:              t(2),
      layout:          t(3),
      outdoor:         t(4),
      image:           a(5),
      alt:             t(6),
      planpoint_floor: t(7),
      planpoint_unit:  t(8),
      cta_text:        t(9),
    },
  },
  {
    name: 'res_hscroll', display_name: 'Residences Horizontal Scroll',
    is_root: false, is_nestable: true,
    schema: {
      header_label:    t(0),
      header_cta_text: t(1),
      header_cta_href: t(2),
      intro_overline:  t(3),
      intro_heading:   t(4),
      intro_body:      ta(5),
      intro_cta_text:  t(6),
      intro_cta_href:  t(7),
      cards:           blk(8, ['res_card']),
    },
  },
  {
    name: 'amenities_teaser', display_name: 'Amenities Teaser',
    is_root: false, is_nestable: true,
    schema: {
      label:    t(0),
      heading:  t(1),
      sub:      ta(2),
      cta_text: t(3),
      cta_href: t(4),
    },
  },
  {
    name: 'stat_item', display_name: 'Stat Item',
    is_root: false, is_nestable: true,
    schema: { value: t(0), label: t(1) },
  },
  {
    name: 'neighborhood_teaser', display_name: 'Neighborhood Teaser',
    is_root: false, is_nestable: true,
    schema: {
      image:    a(0),
      alt:      t(1),
      label:    t(2),
      heading:  t(3),
      body:     ta(4),
      address:  t(5),
      cta_text: t(6),
      cta_href: t(7),
      stats:    blk(8, ['stat_item']),
    },
  },
];

async function main() {
  // Space ID from .env.local — Selva Demo in Partner Portal
  const space = { id: process.env.STORYBLOK_SPACE_ID || '293255653505523', name: 'Selva Demo' };
  console.log(`Space: ${space.name} (ID: ${space.id})\n`);

  for (const def of COMPONENTS) {
    await createComponent(space.id, def);
  }

  console.log('\nDone — check Block Library in Storyblok.');
}

main().catch(e => { console.error(e.message); process.exit(1); });
