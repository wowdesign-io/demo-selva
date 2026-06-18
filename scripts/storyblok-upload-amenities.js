'use strict';
// Upload /public/images/amenities/* to Storyblok CDN.
// Merges into existing storyblok-assets.json (does not overwrite renders).
// Run: node scripts/storyblok-upload-amenities.js

const fs   = require('fs');
const path = require('path');

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';
const ASSETS_FILE    = path.join(__dirname, '../storyblok-assets.json');
const AMENITIES_DIR  = path.join(__dirname, '../public/images/amenities');

const MIME = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png' };

const ALT = {
  'pool-deck.webp':         'SELVA — infinity-edge pool terrace above the canopy',
  'spa-room.webp':          'SELVA — private wellness spa treatment room',
  'sky-terrace.webp':       'SELVA — rooftop sky terrace at golden hour',
  'lounge.webp':            "SELVA — residents' lounge with living greenery",
  'fitness.webp':           'SELVA — fitness studio facing the vertical garden',
  'coworking-library.webp': 'SELVA — oak-panelled library and co-working space',
  'garden-courtyard.webp':  'SELVA — botanical garden courtyard with water feature',
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

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
    throw new Error(`S3 ${r.status}: ${(await r.text().catch(() => '')).slice(0, 200)}`);
  }
}

async function finishUpload(assetId) {
  await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/assets/${assetId}/finish_upload`, {
    method: 'POST', headers: { Authorization: TOKEN },
  });
}

function makeAsset(id, prettyUrl, name) {
  const cdnUrl = prettyUrl.startsWith('//') ? `https:${prettyUrl}` : prettyUrl;
  return { id, alt: ALT[name] || '', name, focus: '', title: '', source: '', filename: cdnUrl, copyright: '', fieldtype: 'asset', meta_data: {} };
}

async function main() {
  if (!TOKEN) throw new Error('STORYBLOK_PERSONAL_TOKEN not set');

  const existing = JSON.parse(fs.readFileSync(ASSETS_FILE, 'utf8'));
  const files = fs.readdirSync(AMENITIES_DIR).filter(f => MIME[path.extname(f)]);

  console.log(`\nUploading ${files.length} amenities images...\n`);
  let uploaded = 0;

  for (const file of files) {
    if (existing[file]) { console.log(`  skip  ${file}`); continue; }
    process.stdout.write(`  ${file}...`);
    const ext  = path.extname(file);
    const mime = MIME[ext];
    const buf  = fs.readFileSync(path.join(AMENITIES_DIR, file));
    await sleep(300);
    const signed = await signAsset(file, mime);
    await uploadToS3(signed, buf, mime);
    await finishUpload(signed.id);
    existing[file] = makeAsset(signed.id, signed.pretty_url, file);
    console.log(` ✓  ${existing[file].filename}`);
    uploaded++;
  }

  fs.writeFileSync(ASSETS_FILE, JSON.stringify(existing, null, 2));
  console.log(`\n${uploaded} uploaded. storyblok-assets.json updated.`);
}

main().catch(err => { console.error(err); process.exit(1); });
