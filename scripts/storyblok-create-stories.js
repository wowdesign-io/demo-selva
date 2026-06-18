// Full setup: uploads images to Storyblok CDN, then creates stories pre-populated with content.
// Usage: node scripts/storyblok-create-stories.js <personal_access_token>

const path = require('path');
const fs   = require('fs');
const { randomUUID } = require('crypto');

const TOKEN    = process.argv[2];
const SPACE_ID = process.env.STORYBLOK_SPACE_ID || '293255653505523';
const BASE     = 'https://mapi.storyblok.com/v1';
const PUBLIC   = path.resolve(__dirname, '../public');

if (!TOKEN) { console.error('Usage: node scripts/storyblok-create-stories.js <token>'); process.exit(1); }

const uid  = () => randomUUID();
const wait = (ms) => new Promise(r => setTimeout(r, ms));

function mime(filename) {
  const ext = path.extname(filename).toLowerCase();
  return { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' }[ext] ?? 'image/jpeg';
}

async function api(method, endpoint, body) {
  const res = await fetch(`${BASE}${endpoint}`, {
    method,
    headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${endpoint}: ${JSON.stringify(data)}`);
  return data;
}

async function uploadAsset(relPath, alt = '') {
  const fullPath = path.join(PUBLIC, relPath);
  const filename = path.basename(fullPath);
  const buffer   = fs.readFileSync(fullPath);
  const contentType = mime(filename);

  // 1. Request signed S3 upload URL
  const sign = await api('POST', `/spaces/${SPACE_ID}/assets/`, {
    filename,
    size: buffer.length,
    content_type: contentType,
  });

  // 2. Upload file to S3 (S3 requires fields before file)
  const form = new FormData();
  for (const [k, v] of Object.entries(sign.fields)) form.append(k, v);
  form.append('file', new Blob([buffer], { type: contentType }), filename);
  const s3 = await fetch(sign.post_url, { method: 'POST', body: form });
  if (s3.status !== 204 && s3.status !== 200 && s3.status !== 201) {
    const txt = await s3.text();
    throw new Error(`S3 upload failed for ${filename}: ${s3.status} ${txt}`);
  }

  // 3. Finalise in Storyblok
  await fetch(`${BASE}/spaces/${SPACE_ID}/assets/${sign.id}/finish_upload`, {
    headers: { Authorization: TOKEN },
  });

  const cdnUrl = sign.pretty_url.startsWith('//') ? 'https:' + sign.pretty_url : sign.pretty_url;
  console.log(`  ✓  ${relPath.padEnd(50)} ${cdnUrl}`);

  return {
    id: sign.id, filename: cdnUrl, alt,
    name: filename, focus: '', title: '', source: '', copyright: '',
    fieldtype: 'asset', meta_data: {}, is_private: false,
  };
}

async function uploadAll(list) {
  const results = {};
  for (const [key, relPath, alt] of list) {
    results[key] = await uploadAsset(relPath, alt);
    await wait(300); // stay under 6 req/s Storyblok rate limit
  }
  return results;
}

async function upsertStory(story) {
  try {
    // Try create first
    await api('POST', `/spaces/${SPACE_ID}/stories/`, { story });
    console.log(`  ✓  Created ${story.name} (/${story.slug})`);
  } catch (e) {
    if (!e.message.includes('422')) { console.error(`  ✗  ${story.name}: ${e.message}`); return; }
    // Story exists — find its ID and update
    const { stories } = await api('GET', `/spaces/${SPACE_ID}/stories/?starts_with=${story.slug}`);
    const existing = stories?.find(s => s.slug === story.slug);
    if (!existing) { console.error(`  ✗  ${story.name}: exists but could not find ID`); return; }
    await api('PUT', `/spaces/${SPACE_ID}/stories/${existing.id}/`, { story });
    console.log(`  ✓  Updated ${story.name} (/${story.slug})`);
  }
}

async function main() {
  console.log(`Space: ${SPACE_ID}\n`);

  // ── Upload images (sequential to respect rate limit) ──────────────────────
  console.log('Uploading images…');
  const img = await uploadAll([
    ['hero',         'images/hero/360-front.jpg',                     'SELVA Residences — botanical luxury, Miami'],
    ['overviewRes',  'images/renders/interior-01.jpg',                'SELVA Residences — curated interiors'],
    ['overviewAmen', 'images/amenities/pool-deck.webp',               'SELVA Amenities — botanical setting'],
    ['overviewHood', 'images/neighborhood/sidewalk-storefronts.webp', 'SELVA — Miami neighborhood'],
    ['vision',       'images/renders/exterior-03.webp',               'SELVA — where living and nature converge'],
    ['cardC',        'images/renders/terrace.webp',                   'Model C — Patio 1BR Suite'],
    ['cardD',        'images/renders/balcony.webp',                   'Model D — 1BR + Den Suite'],
    ['cardB',        'images/renders/kitchen-wide.webp',              'Model B — 2BR Suite'],
    ['hood',         'images/neighborhood/bayfront-marina.webp',      'SELVA — waterfront promenade and botanical residences'],
  ]);

  // ── Create home story ─────────────────────────────────────────────────────
  console.log('\nCreating stories…');
  await upsertStory({
    name: 'Home',
    slug: 'home',
    content: {
      component: 'page', _uid: uid(),
      body: [

        // Hero
        {
          component: 'home_hero', _uid: uid(),
          pre_label:     'Miami · 40 Residences',
          title:         'SELVA',
          tagline:       'Where the forest meets the sky.',
          delivery_note: 'Delivery Mid-2027',
          bg_image: img.hero,
          bg_alt:   img.hero.alt,
        },

        // Overview
        {
          component: 'overview_section', _uid: uid(),
          intro_text: "Nestled where Miami's botanical soul meets the open sky, SELVA presents forty private residences — a rare collection where verdant canopy, bespoke interiors, and the city converge.",
          panels: [
            { component: 'overview_panel', _uid: uid(), label: 'Residences',   href: '/residences',   image: img.overviewRes,  alt: img.overviewRes.alt },
            { component: 'overview_panel', _uid: uid(), label: 'Amenities',    href: '/amenities',    image: img.overviewAmen, alt: img.overviewAmen.alt },
            { component: 'overview_panel', _uid: uid(), label: 'Neighborhood', href: '/neighborhood', image: img.overviewHood, alt: img.overviewHood.alt },
          ],
        },

        // Vision Teaser
        {
          component: 'vision_teaser', _uid: uid(),
          label:    'The Vision',
          headline: "Where Miami's Botanical Soul Becomes Home",
          body_1:   "SELVA is a rare collection of forty private residences where Miami's lush canopy, refined interiors, and open sky converge. Conceived for those who seek the extraordinary — a home that breathes, grows, and endures.",
          body_2:   "Every detail, from the hand-selected material palette to the seamless indoor–outdoor flow, reflects a singular vision: to create a living environment as alive and generous as the nature that surrounds it.",
          cta_text: 'Explore the Vision',
          cta_href: '/vision',
          image: img.vision,
          alt:   img.vision.alt,
        },

        // Residences Teaser
        {
          component: 'residences_teaser', _uid: uid(),
          label:    'Residences',
          heading:  'Curated for Private Living',
          sub:      'Forty bespoke one- and two-bedroom residences — several with private dens — each thoughtfully proportioned for a life of botanical luxury and urban ease.',
          cta_text: 'View Residences',
          cta_href: '/residences',
        },

        // Res Hscroll
        {
          component: 'res_hscroll', _uid: uid(),
          header_label:    'Residences · Three Models · 40 Suites',
          header_cta_text: 'Explore in Digital Twin →',
          header_cta_href: '/residences#planpoint',
          intro_overline:  'SELVA · Miami · Pre-Sales',
          intro_heading:   'Curated for Private Living.',
          intro_body:      'Three signature layouts — Models B, C and D — across forty residences and three floors, each opening to the green canopy.',
          intro_cta_text:  'Explore All Floorplans',
          intro_cta_href:  '/residences#planpoint',
          cards: [
            {
              component: 'res_card', _uid: uid(),
              model_tag: 'Model C', name: 'Patio 1BR Suite',
              sf: '575', layout: '1', outdoor: 'Patio',
              image: img.cardC, alt: img.cardC.alt,
              planpoint_floor: 'Floor 1', planpoint_unit: '110',
              cta_text: 'View Floorplan →',
            },
            {
              component: 'res_card', _uid: uid(),
              model_tag: 'Model D', name: '1BR + Den Suite',
              sf: '700–880', layout: '1 + Den', outdoor: 'Balcony',
              image: img.cardD, alt: img.cardD.alt,
              planpoint_floor: 'Floor 1', planpoint_unit: '113',
              cta_text: 'View Floorplan →',
            },
            {
              component: 'res_card', _uid: uid(),
              model_tag: 'Model B', name: '2BR Suite',
              sf: '880', layout: '2', outdoor: 'Terrace',
              image: img.cardB, alt: img.cardB.alt,
              planpoint_floor: 'Floor 1', planpoint_unit: '112',
              cta_text: 'View Floorplan →',
            },
          ],
        },

        // Amenities Teaser
        {
          component: 'amenities_teaser', _uid: uid(),
          label:    'Amenities',
          heading:  'A Life Lived Beautifully',
          sub:      "From the skylit wellness terrace to the botanical residents' lounge, every amenity at SELVA is conceived to enrich daily life with nature, light, and unhurried luxury.",
          cta_text: 'View Amenities',
          cta_href: '/amenities',
        },

        // Neighborhood Teaser
        {
          component: 'neighborhood_teaser', _uid: uid(),
          image: img.hood, alt: img.hood.alt,
          label:   'The Neighborhood',
          heading: 'One Foot in the Canopy. One Foot in the City.',
          body:    "SELVA rises in one of Miami's last green enclaves — where the canopy meets the bay, and the city's culture, dining, and design districts sit just minutes away. A rare address that offers seclusion without distance.",
          address: '3000 Hibiscus Lane · Coconut Grove · Miami, FL 33133',
          cta_text: 'Explore the Neighborhood',
          cta_href: '/neighborhood',
          stats: [
            { component: 'stat_item', _uid: uid(), value: '6 min',  label: 'Design District' },
            { component: 'stat_item', _uid: uid(), value: '12 min', label: 'Brickell' },
            { component: 'stat_item', _uid: uid(), value: '14 min', label: 'South Beach' },
            { component: 'stat_item', _uid: uid(), value: '18 min', label: "Miami Int'l Airport" },
          ],
        },

      ],
    },
  });

  console.log('\nDone — check Assets + Content in Storyblok.');
}

main().catch(e => { console.error(e.message); process.exit(1); });
