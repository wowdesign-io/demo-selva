'use strict';
// Create and publish the neighborhood story in Storyblok.
// Run: node scripts/storyblok-create-neighborhood.js

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';

function uid() { return Math.random().toString(36).slice(2, 11); }

function asset(id, filename, alt = '') {
  return { id, alt, name: '', focus: '', title: '', source: '', filename, copyright: '', fieldtype: 'asset', meta_data: {} };
}

function link(url) {
  return { id: '', url, linktype: 'url', fieldtype: 'multilink', cached_url: url };
}

const CDN = {
  sidewalk:  { id: 188931338557935, url: 'https://a.storyblok.com/f/293255653505523/eab6ccf35e/sidewalk-storefronts.webp' },
  outdoor:   { id: 188931335596526, url: 'https://a.storyblok.com/f/293255653505523/c19db9fe97/outdoor-dining.webp' },
  cultural:  { id: 188931332823533, url: 'https://a.storyblok.com/f/293255653505523/f782a4da4b/cultural-district.webp' },
  bayfront:  { id: 188931327637996, url: 'https://a.storyblok.com/f/293255653505523/4371e167ca/bayfront-marina.webp' },
};

const story = {
  name: 'Neighborhood',
  slug: 'neighborhood',
  content: {
    component: 'page',
    body: [

      // 1. Hero
      {
        component: 'page_hero', _uid: uid(),
        pre_label:     'Miami · The Neighborhood',
        title:         'Rooted in\nthe Grove',
        tagline:       'Coconut Grove’s banyan canopy, bayfront and design quarter — steps beyond your door.',
        delivery_note: 'Delivery Mid-2027',
        wordmark_style: false,
        image: asset(CDN.cultural.id, CDN.cultural.url, 'SELVA — the design quarter of Coconut Grove at golden hour'),
        alt:   'SELVA — the design quarter of Coconut Grove at golden hour',
      },

      // 2. Proximity strip (light theme)
      {
        component: 'res_stats_bridge', _uid: uid(),
        light_theme: true,
        items: [
          { component: 'stat_item', _uid: uid(), value: '6 min',  label: 'Design District' },
          { component: 'stat_item', _uid: uid(), value: '12 min', label: 'Brickell' },
          { component: 'stat_item', _uid: uid(), value: '14 min', label: 'South Beach' },
          { component: 'stat_item', _uid: uid(), value: '18 min', label: 'Miami Int’l Airport' },
        ],
      },

      // 3. Intro band
      {
        component: 'nbhd_intro', _uid: uid(),
        label:    'The Neighborhood',
        heading:  'A canopy<br/><em>with a pulse</em>',
        lead:     'SELVA stands where Coconut Grove’s century-old tree canopy gives way to the open water of Biscayne Bay — a rare pocket of Miami that still moves at a human pace.',
        body_1:   'The Grove is Miami’s oldest neighborhood, and it wears its history lightly: banyan-shaded sidewalks, family-run cafés, sailboats on the bay, and a design quarter that draws collectors and creatives from across the city.',
        body_2:   'From SELVA’s door, the day unfolds on foot — a morning coffee beneath the trees, an afternoon among the galleries, an evening table under string lights, and the marina never more than a short walk away.',
        cta_text: 'Explore the Residences',
        cta_href: link('/residences#digital-twin'),
      },

      // 4. Sticky scroll story
      {
        component: 'nbhd_story', _uid: uid(),
        eyebrow: 'A Day in the Grove',
        items: [
          {
            component: 'nbhd_story_panel', _uid: uid(),
            num:     '01 — The Morning',
            title:   'Sidewalk <em>mornings</em>',
            para_1:  'The Grove wakes slowly. Light filters through the oak and banyan canopy onto narrow, walkable streets, and the neighborhood’s cafés set out their first tables long before the heat arrives.',
            para_2:  'Order a cortado at the counter, wander the tree-lined blocks, and watch a community that still knows its shopkeepers by name come quietly to life.',
            pills:   'Coffee Houses, Tree-Lined Streets, Local Boutiques',
            cta_text: 'Explore the Residences',
            cta_href: link('/residences#digital-twin'),
            image: asset(CDN.sidewalk.id, CDN.sidewalk.url, 'Coconut Grove — sunlit sidewalk storefronts beneath the oak canopy'),
            alt:   'Coconut Grove — sunlit sidewalk storefronts beneath the oak canopy',
          },
          {
            component: 'nbhd_story_panel', _uid: uid(),
            num:     '02 — The Evening',
            title:   'A table <em>outdoors</em>',
            para_1:  'As the light softens, the Grove’s courtyards fill. String lights flicker on between the trees, and chef-led kitchens spill out onto the pavement.',
            para_2:  'From garden bistros to candlelit terraces, dinner here is an unhurried, open-air ritual — the kind of evening that never asks you to drive across town.',
            pills:   'Garden Dining, Wine Bars, Chef’s Tables',
            cta_text: 'Explore the Residences',
            cta_href: link('/residences#digital-twin'),
            image: asset(CDN.outdoor.id, CDN.outdoor.url, 'Coconut Grove — candlelit courtyard dining under string lights at dusk'),
            alt:   'Coconut Grove — candlelit courtyard dining under string lights at dusk',
          },
          {
            component: 'nbhd_story_panel', _uid: uid(),
            num:     '03 — The Culture',
            title:   'The design <em>quarter</em>',
            para_1:  'A few blocks inland, the neighborhood turns to art. Independent galleries, design showrooms and a year-round calendar of openings give the Grove a creative current that never quite settles.',
            para_2:  'It is a place to collect, to stay curious, and to live alongside the makers and gallerists who shape Miami’s cultural life.',
            pills:   'Galleries, Design Showrooms, Open-Air Cinema',
            cta_text: 'Explore the Residences',
            cta_href: link('/residences#digital-twin'),
            image: asset(CDN.cultural.id, CDN.cultural.url, 'Coconut Grove — design quarter gallery facades at golden hour'),
            alt:   'Coconut Grove — design quarter gallery facades at golden hour',
          },
          {
            component: 'nbhd_story_panel', _uid: uid(),
            num:     '04 — The Water',
            title:   'Out on <em>the water</em>',
            para_1:  'And then there is the bay. The Grove’s sheltered waterfront has been Miami’s sailing heart for generations, its marinas lined with everything from weekend dinghies to bluewater yachts.',
            para_2:  'Step off the dock at dawn, cross to the islands for lunch, or simply watch the masts catch the last of the light from the shore.',
            pills:   'Marina, Sailing Club, Bayfront Park',
            cta_text: 'Explore the Residences',
            cta_href: link('/residences#digital-twin'),
            image: asset(CDN.bayfront.id, CDN.bayfront.url, 'Coconut Grove — sailboats moored at the bayfront marina at sunrise'),
            alt:   'Coconut Grove — sailboats moored at the bayfront marina at sunrise',
          },
        ],
      },

      // 5. Interactive map
      {
        component: 'nbhd_map', _uid: uid(),
        label:   'The Map',
        heading: 'Discover the pulse <em>of the Grove</em>',
        sub:     'Hover any place to find it on the map — the everyday pleasures that surround SELVA, all within the neighborhood.',
        categories: [
          {
            component: 'map_category', _uid: uid(),
            name: 'Dining & Cafés', color_var: 'var(--color-accent)',
            pois: [
              { component: 'map_poi', _uid: uid(), name: 'Sidewalk Café',    type: 'Coffee', key: 'cafe'   },
              { component: 'map_poi', _uid: uid(), name: 'Open-Air Market', type: 'Market', key: 'market' },
              { component: 'map_poi', _uid: uid(), name: 'Garden Bistro',   type: 'Dining', key: 'bistro' },
            ],
          },
          {
            component: 'map_category', _uid: uid(),
            name: 'Design & Culture', color_var: 'var(--color-primary)',
            pois: [
              { component: 'map_poi', _uid: uid(), name: 'The Design District', type: 'Design', key: 'design'  },
              { component: 'map_poi', _uid: uid(), name: 'Gallery Row',          type: 'Art',    key: 'gallery' },
              { component: 'map_poi', _uid: uid(), name: 'Open-Air Cinema',      type: 'Film',   key: 'cinema'  },
            ],
          },
          {
            component: 'map_category', _uid: uid(),
            name: 'Bay & Outdoors', color_var: 'var(--color-water)',
            pois: [
              { component: 'map_poi', _uid: uid(), name: 'Bayfront Marina', type: 'Boating', key: 'marina'  },
              { component: 'map_poi', _uid: uid(), name: 'Coastal Park',    type: 'Park',    key: 'coast'   },
              { component: 'map_poi', _uid: uid(), name: 'Sailing Club',    type: 'Sailing', key: 'sailing' },
            ],
          },
          {
            component: 'map_category', _uid: uid(),
            name: 'Everyday Essentials', color_var: 'var(--color-text-muted)',
            pois: [
              { component: 'map_poi', _uid: uid(), name: 'Boutique Grocer', type: 'Grocery', key: 'grocer'   },
              { component: 'map_poi', _uid: uid(), name: 'Wellness & Spa',  type: 'Spa',     key: 'wellness' },
              { component: 'map_poi', _uid: uid(), name: 'Tennis & Padel',  type: 'Sport',   key: 'tennis'   },
            ],
          },
        ],
        pins: [
          { component: 'map_pin', _uid: uid(), key: 'cafe',     label: 'Sidewalk Café',    x: 38, y: 30, color_var: 'var(--color-accent)'     },
          { component: 'map_pin', _uid: uid(), key: 'market',   label: 'Open-Air Market', x: 66, y: 24, color_var: 'var(--color-accent)'     },
          { component: 'map_pin', _uid: uid(), key: 'bistro',   label: 'Garden Bistro',   x: 70, y: 62, color_var: 'var(--color-accent)'     },
          { component: 'map_pin', _uid: uid(), key: 'design',   label: 'The Design District', x: 60, y: 40, color_var: 'var(--color-primary)'  },
          { component: 'map_pin', _uid: uid(), key: 'gallery',  label: 'Gallery Row',          x: 74, y: 46, color_var: 'var(--color-primary)'  },
          { component: 'map_pin', _uid: uid(), key: 'cinema',   label: 'Open-Air Cinema',      x: 44, y: 66, color_var: 'var(--color-primary)'  },
          { component: 'map_pin', _uid: uid(), key: 'marina',   label: 'Bayfront Marina', x: 17, y: 60, color_var: 'var(--color-water)'      },
          { component: 'map_pin', _uid: uid(), key: 'coast',    label: 'Coastal Park',    x: 25, y: 36, color_var: 'var(--color-water)'      },
          { component: 'map_pin', _uid: uid(), key: 'sailing',  label: 'Sailing Club',    x: 13, y: 76, color_var: 'var(--color-water)'      },
          { component: 'map_pin', _uid: uid(), key: 'grocer',   label: 'Boutique Grocer', x: 50, y: 22, color_var: 'var(--color-text-muted)' },
          { component: 'map_pin', _uid: uid(), key: 'wellness', label: 'Wellness & Spa',  x: 58, y: 72, color_var: 'var(--color-text-muted)' },
          { component: 'map_pin', _uid: uid(), key: 'tennis',   label: 'Tennis & Padel',  x: 82, y: 66, color_var: 'var(--color-text-muted)' },
        ],
      },

      // 6. CTA
      {
        component: 'page_cta', _uid: uid(),
        label:    'Explore Next',
        heading:  'Find your place<br/><em>at SELVA</em>',
        cta_text: 'Explore Floorplans',
        cta_href: link('/residences#digital-twin'),
      },

    ],
  },
};

async function main() {
  if (!TOKEN) throw new Error('STORYBLOK_PERSONAL_TOKEN not set');
  console.log('\nCreating neighborhood story...');
  const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
    method: 'POST',
    headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ story, publish: 1 }),
  });
  if (!r.ok) {
    const err = await r.text();
    throw new Error(`${r.status} ${err}`);
  }
  const data = await r.json();
  console.log(`\n  ✓ Story created: ${data.story.name} (ID: ${data.story.id})`);
  console.log(`  ✓ Slug: ${data.story.full_slug}\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
