'use strict';
// Upload /public/images/team/*.webp to Storyblok CDN.
// Run: node scripts/storyblok-upload-team.js

const fs   = require('fs');
const path = require('path');

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';
const ASSETS_FILE = path.join(__dirname, '../storyblok-assets.json');
const DIR         = path.join(__dirname, '../public/images/team');

const MIME = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };

const ALT = {
  'developer.webp':       'Banyan Bay Development — boutique residential developer',
  'architect.webp':       'Estudio Frondoso — principal architect',
  'interior-design.webp': 'Taller Lumina — interior design studio',
  'landscape.webp':       'Raíz Landscape Studio — studio director',
  'sales-marketing.webp': 'Meridian Residential — sales and marketing',
  'andy-bittner.webp':    'Andy Bittner — wowdesign, digital experience',
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

async function uploadToS3(signed, buf, mime) {
  const form = new FormData();
  for (const [k, v] of Object.entries(signed.fields)) form.append(k, v);
  form.append('file', new Blob([buf], { type: mime }), path.basename(signed.fields.key));
  const r = await fetch(signed.post_url, { method: 'POST', body: form });
  if (![200, 201, 204].includes(r.status)) throw new Error(`S3 ${r.status}`);
}

async function finishUpload(id) {
  await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/assets/${id}/finish_upload`, {
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
  const files = fs.readdirSync(DIR).filter(f => MIME[path.extname(f)]);
  console.log(`\nUploading ${files.length} team images...\n`);
  let uploaded = 0;
  for (const file of files) {
    if (existing[file]) { console.log(`  skip  ${file}`); continue; }
    const ext  = path.extname(file);
    const mime = MIME[ext];
    const buf  = fs.readFileSync(path.join(DIR, file));
    try {
      const signed = await signAsset(file, mime);
      await uploadToS3(signed, buf, mime);
      await finishUpload(signed.id);
      existing[file] = makeAsset(signed.id, signed.pretty_url, file);
      console.log(`  ✓  ${file}  →  ${existing[file].filename}`);
      uploaded++;
      await sleep(300);
    } catch (e) {
      console.error(`  ✗  ${file}: ${e.message}`);
    }
  }
  fs.writeFileSync(ASSETS_FILE, JSON.stringify(existing, null, 2));
  console.log(`\nDone. ${uploaded} uploaded, ${files.length - uploaded} skipped.`);
  console.log(`Asset map updated: storyblok-assets.json`);
}

main().catch(err => { console.error(err); process.exit(1); });
