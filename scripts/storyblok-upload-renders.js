'use strict';
// Upload all /public/images/renders/* to Storyblok CDN, then link them in
// Vision and Residences stories (and clear img_src/bg_src text overrides).
// Run: node scripts/storyblok-upload-renders.js

const fs   = require('fs');
const path = require('path');

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';
const VISION_ID     = '188866154629753';
const RESIDENCES_ID = '188859761921168';
const TEAM_ID       = '189133310384052';

const RENDERS_DIR = path.join(__dirname, '../public/images/renders');

const MIME = {
  '.webp': 'image/webp',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
};

const ALT = {
  'vision-01.webp':        'SELVA — aerial view of the botanical complex',
  'vision-02.webp':        'SELVA — the low-rise building emerging from the forest canopy',
  'vision-hero.webp':      'SELVA — tropical botanical entrance at golden hour',
  'team-hero.webp':        'SELVA — tropical botanical entrance at dusk',
  'exterior-02.webp':      'SELVA — bold tropical facade at golden hour',
  'exterior-03.webp':      'SELVA — lush canopy rising above the building',
  'exterior-04.webp':      'SELVA — planted terraces against a warm-white facade',
  'exterior-05.webp':      'SELVA — sweeping garden courtyard at dusk',
  'interior-01.jpg':       'SELVA — open-plan living with floor-to-ceiling glass',
  'interior-02.jpg':       'SELVA — where living and nature converge',
  'interior-03.jpg':       'SELVA — premium finishes throughout',
  'interior-04.jpg':       'SELVA — refined master bedroom',
  'kitchen.webp':          'SELVA — oak, travertine and brushed-brass interiors',
  'kitchen-wide.webp':     "SELVA — the chef's kitchen, open to the garden",
  'terrace.webp':          'SELVA — a planted private terrace in the canopy',
  'balcony.webp':          'SELVA — private balcony with canopy views',
  'bathroom.webp':         'SELVA — spa-grade master bathroom',
  'bayfront-marina.jpg':   'Coconut Grove — bayfront marina',
  'amenity-01.jpg':        'SELVA — resort-style pool and deck',
  'amenity-02.jpg':        'SELVA — co-working and library',
  'amenity-03.jpg':        'SELVA — fitness centre',
  'amenity-01-sharp.jpg':  'SELVA — resort-style pool and deck',
  'amenity-02-sharp.jpg':  'SELVA — co-working and library',
  'amenity-03-sharp.jpg':  'SELVA — fitness centre',
};

// ─── Storyblok upload helpers ─────────────────────────────────────────────────

async function sbGet(path) {
  const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}${path}`, {
    headers: { Authorization: TOKEN },
  });
  if (!r.ok) throw new Error(`GET ${path}: ${r.status} ${await r.text()}`);
  return r.json();
}

async function sbPut(path, body) {
  const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}${path}`, {
    method: 'PUT',
    headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`PUT ${path}: ${r.status} ${await r.text()}`);
  return r.json();
}

async function signAsset(filename, contentType) {
  const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/assets`, {
    method: 'POST',
    headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, content_type: contentType }),
  });
  if (!r.ok) throw new Error(`Sign: ${r.status} ${await r.text()}`);
  return r.json();
}

async function uploadToS3(signed, buf, contentType) {
  const form = new FormData();
  for (const [k, v] of Object.entries(signed.fields)) form.append(k, v);
  form.append('file', new Blob([buf], { type: contentType }), path.basename(signed.fields.key));
  const r = await fetch(signed.post_url, { method: 'POST', body: form });
  if (![200, 201, 204].includes(r.status)) {
    const txt = await r.text().catch(() => '');
    throw new Error(`S3 ${r.status}: ${txt.slice(0, 300)}`);
  }
}

async function finishUpload(assetId) {
  await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/assets/${assetId}/finish_upload`, {
    method: 'POST',
    headers: { Authorization: TOKEN },
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function makeAsset(id, prettyUrl, name) {
  const cdnUrl = prettyUrl.startsWith('//') ? `https:${prettyUrl}` : prettyUrl;
  return {
    id,
    alt: ALT[name] || '',
    name,
    focus: '',
    title: '',
    source: '',
    filename: cdnUrl,
    copyright: '',
    fieldtype: 'asset',
    meta_data: {},
  };
}

// ─── Upload all renders ───────────────────────────────────────────────────────

async function uploadAllRenders() {
  const files = fs.readdirSync(RENDERS_DIR).filter(f => MIME[path.extname(f)]);
  console.log(`\nUploading ${files.length} renders to Storyblok CDN...\n`);

  const map = {};
  for (const file of files) {
    process.stdout.write(`  ${file}...`);
    try {
      const ext  = path.extname(file);
      const mime = MIME[ext];
      const buf  = fs.readFileSync(path.join(RENDERS_DIR, file));
      await sleep(300); // stay under 6 req/s rate limit
      const signed = await signAsset(file, mime);
      await uploadToS3(signed, buf, mime);
      await finishUpload(signed.id);
      map[file] = makeAsset(signed.id, signed.pretty_url, file);
      console.log(` ✓`);
    } catch (e) {
      console.log(` ✗  ${e.message}`);
    }
  }
  return map;
}

// ─── Update stories ───────────────────────────────────────────────────────────

async function updateVision(map) {
  const { story } = await sbGet(`/stories/${VISION_ID}`);
  const body = story.content.body;
  let visIdx = 0;

  for (const blok of body) {
    switch (blok.component) {
      case 'page_hero':
        blok.bg_src   = '';
        blok.bg_image = map['vision-hero.webp'];
        break;
      case 'vision_copy_band':
        blok.image = map['interior-02.jpg'];
        break;
      case 'vis_feature':
        visIdx++;
        blok.img_src = '';
        blok.image   = visIdx === 1 ? map['exterior-04.webp'] : map['kitchen.webp'];
        break;
      case 'manifesto':
        blok.image = map['terrace.webp'];
        break;
    }
  }

  const { story: updated } = await sbPut(`/stories/${VISION_ID}`, {
    story: { content: { _uid: story.content._uid, component: story.content.component, body } },
    publish: 1,
  });
  console.log(`  vision → published`);
}

async function updateResidences(map) {
  const { story } = await sbGet(`/stories/${RESIDENCES_ID}`);
  const body = story.content.body;

  const cardImg = {
    'Model C': map['terrace.webp'],
    'Model D': map['balcony.webp'],
    'Model B': map['kitchen-wide.webp'],
  };

  for (const blok of body) {
    if (blok.component === 'page_hero') {
      blok.bg_src   = '';
      blok.bg_image = map['exterior-02.webp'];
    } else if (blok.component === 'res_models_slider' && blok.cards) {
      for (const card of blok.cards) {
        if (cardImg[card.model_tag]) {
          card.img_src = '';
          card.image   = cardImg[card.model_tag];
        }
      }
    }
  }

  await sbPut(`/stories/${RESIDENCES_ID}`, {
    story: { content: { _uid: story.content._uid, component: story.content.component, body } },
    publish: 1,
  });
  console.log(`  residences → published`);
}

async function updateTeam(map) {
  const { story } = await sbGet(`/stories/${TEAM_ID}`);
  const body = story.content.body;

  for (const blok of body) {
    if (blok.component === 'page_hero') {
      blok.bg_src   = '';
      blok.bg_image = map['team-hero.webp'];
    }
  }

  await sbPut(`/stories/${TEAM_ID}`, {
    story: { content: { _uid: story.content._uid, component: story.content.component, body } },
    publish: 1,
  });
  console.log(`  team → published`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!TOKEN) throw new Error('STORYBLOK_PERSONAL_TOKEN env var not set');

  const map = await uploadAllRenders();

  const mapPath = path.join(__dirname, '../storyblok-assets.json');
  fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
  console.log(`\nSaved asset map → storyblok-assets.json`);

  console.log('\nLinking assets in stories...');
  await updateVision(map);
  await updateResidences(map);
  await updateTeam(map);

  console.log('\nDone. All renders are in Storyblok CDN and linked in stories.');
}

main().catch(err => { console.error(err); process.exit(1); });
