'use strict';
// Session 8 patch — upload inline body images from richtext to Storyblok asset library.
// Run: node scripts/storyblok-migrate-body-images.js

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function api(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'mapi.storyblok.com', path: apiPath, method,
      headers: { Authorization: TOKEN, 'Content-Type': 'application/json', ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}) },
    }, (res) => {
      let d = ''; res.on('data', (c) => (d += c));
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch { resolve(d); } });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function contentTypeOf(filename) {
  if (filename.endsWith('.webp')) return 'image/webp';
  if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
  return 'image/png';
}

function uploadToS3(postUrl, postFields, fileBuffer, filename, contentType) {
  return new Promise((resolve, reject) => {
    const boundary = `----FormBoundary${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
    const buffers  = [];
    for (const [key, value] of Object.entries(postFields)) {
      buffers.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}\r\n`, 'utf8'));
    }
    buffers.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: ${contentType}\r\n\r\n`, 'utf8'));
    buffers.push(fileBuffer);
    buffers.push(Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8'));
    const body = Buffer.concat(buffers);
    const urlObj = new URL(postUrl);
    const lib = urlObj.protocol === 'https:' ? https : http;
    const req = lib.request({
      hostname: urlObj.hostname, path: urlObj.pathname + (urlObj.search || ''), method: 'POST',
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': body.length },
    }, (res) => {
      let d = ''; res.on('data', (c) => (d += c));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve();
        else reject(new Error(`S3 upload failed (${res.statusCode}): ${d.slice(0, 200)}`));
      });
    });
    req.on('error', reject);
    req.write(body); req.end();
  });
}

async function uploadAsset(localRelPath, altText) {
  const absPath = path.join(PUBLIC_DIR, localRelPath);
  if (!fs.existsSync(absPath)) { console.error(`  ✗ File not found: ${absPath}`); return null; }
  const fileBuffer  = fs.readFileSync(absPath);
  const filename    = path.basename(localRelPath);
  const contentType = contentTypeOf(filename);
  console.log(`    Uploading ${filename} (${Math.round(fileBuffer.length / 1024)}KB)…`);
  await sleep(400);
  const createRes = await api('POST', `/v1/spaces/${SPACE_ID}/assets/`, {
    filename, size: fileBuffer.length, content_type: contentType, asset_folder_id: null,
  });
  if (!createRes.id || !createRes.post_url) { console.error(`    ✗ Asset create failed:`, JSON.stringify(createRes).slice(0, 200)); return null; }
  await uploadToS3(createRes.post_url, createRes.fields, fileBuffer, filename, contentType);
  const publicUrl = createRes.pretty_url ? 'https:' + createRes.pretty_url : `https://a.storyblok.com/f/${SPACE_ID}/${filename}`;
  console.log(`    ✓ ${publicUrl.slice(0, 90)}`);
  return { id: createRes.id, filename: publicUrl, alt: altText || '', fieldtype: 'asset' };
}

(async () => {
  if (!TOKEN) { console.error('STORYBLOK_PERSONAL_TOKEN not set'); process.exit(1); }

  console.log('\n→ Fetching press articles…');
  const list = await api('GET', `/v1/spaces/${SPACE_ID}/stories/?starts_with=press%2F&per_page=25&excluding_slugs=press%2Findex`);
  const stories = list.stories || [];
  console.log(`  Found ${stories.length} articles`);

  for (const s of stories) {
    await sleep(700);
    const full = await api('GET', `/v1/spaces/${SPACE_ID}/stories/${s.id}`);
    if (!full.story) { console.error(`  ✗ Could not fetch ${s.slug}`); continue; }
    const story   = full.story;
    const content = story.content;
    const body    = content?.body;

    if (!body?.content) { console.log(`  – [${story.full_slug}] no body, skipping`); continue; }

    // Find image nodes that still have local paths
    const localImgNodes = body.content.filter(
      (n) => n.type === 'image' && n.attrs?.src && !n.attrs.src.startsWith('http')
    );

    if (localImgNodes.length === 0) {
      console.log(`  – [${story.full_slug}] body images already CDN, skipping`);
      continue;
    }

    console.log(`\n  [${story.full_slug}] — ${localImgNodes.length} local image(s)`);

    // Upload and replace each local image node
    let updated = false;
    for (const node of localImgNodes) {
      const asset = await uploadAsset(node.attrs.src, node.attrs.alt || '');
      if (!asset) continue;
      node.attrs.src = asset.filename;  // replace with Storyblok CDN URL
      updated = true;
    }

    if (!updated) continue;

    await sleep(600);
    const upd = await api('PUT', `/v1/spaces/${SPACE_ID}/stories/${story.id}`, {
      story: { content: { ...content, body }, publish: 1 },
    });
    if (upd.story?.id) {
      console.log(`  ✓ Story updated + published`);
    } else {
      console.error(`  ✗ Story update failed:`, JSON.stringify(upd).slice(0, 200));
    }
  }

  console.log('\n✓ Body image migration complete.\n');
})();
