'use strict';
// Session 8 patch — migrate press_article lead images to Storyblok asset library.
// Uploads each lead image, changes schema field to asset type, updates stories.
// Run: node scripts/storyblok-migrate-press-assets.js

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Management API helper
// ---------------------------------------------------------------------------

function api(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'mapi.storyblok.com',
      path: apiPath,
      method,
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch { resolve(d); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// S3 multipart upload (used by Storyblok asset creation)
// ---------------------------------------------------------------------------

function uploadToS3(postUrl, postFields, fileBuffer, filename, contentType) {
  return new Promise((resolve, reject) => {
    const boundary = `----FormBoundary${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
    const buffers  = [];

    // All S3 presigned policy fields first
    for (const [key, value] of Object.entries(postFields)) {
      buffers.push(Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}\r\n`,
        'utf8'
      ));
    }
    // File must be the last field per S3 policy
    buffers.push(Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: ${contentType}\r\n\r\n`,
      'utf8'
    ));
    buffers.push(fileBuffer);
    buffers.push(Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8'));

    const body    = Buffer.concat(buffers);
    const urlObj  = new URL(postUrl);
    const lib     = urlObj.protocol === 'https:' ? https : http;

    const req = lib.request({
      hostname: urlObj.hostname,
      path:     urlObj.pathname + (urlObj.search || ''),
      method:  'POST',
      headers: {
        'Content-Type':   `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
      },
    }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        // S3 browser upload returns 204 No Content on success
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else {
          reject(new Error(`S3 upload failed (${res.statusCode}): ${d.slice(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Upload one image file to Storyblok asset library
// ---------------------------------------------------------------------------

function contentTypeOf(filename) {
  if (filename.endsWith('.webp')) return 'image/webp';
  if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
  if (filename.endsWith('.png')) return 'image/png';
  return 'image/jpeg';
}

async function uploadAsset(localRelPath, altText) {
  const absPath = path.join(PUBLIC_DIR, localRelPath);
  if (!fs.existsSync(absPath)) {
    console.error(`  ✗ File not found: ${absPath}`);
    return null;
  }

  const fileBuffer  = fs.readFileSync(absPath);
  const filename    = path.basename(localRelPath);
  const contentType = contentTypeOf(filename);

  console.log(`    Uploading ${filename} (${Math.round(fileBuffer.length / 1024)}KB)…`);

  // Step 1 — ask Storyblok for a presigned S3 upload URL
  await sleep(400);
  const createRes = await api('POST', `/v1/spaces/${SPACE_ID}/assets/`, {
    filename,
    size:         fileBuffer.length,
    content_type: contentType,
    asset_folder_id: null,
  });

  if (!createRes.id) {
    console.error(`    ✗ Asset create failed:`, JSON.stringify(createRes).slice(0, 200));
    return null;
  }

  // Storyblok response: {id, post_url, fields, pretty_url, public_url}
  const s3Url    = createRes.post_url;
  const s3Fields = createRes.fields;
  if (!s3Url || !s3Fields) {
    console.error(`    ✗ No S3 upload URL in response:`, JSON.stringify(createRes).slice(0, 200));
    return null;
  }

  // Step 2 — upload to S3
  await uploadToS3(s3Url, s3Fields, fileBuffer, filename, contentType);

  // Step 3 — use Storyblok CDN URL (pretty_url starts with //)
  const publicUrl = createRes.pretty_url
    ? 'https:' + createRes.pretty_url
    : `https://a.storyblok.com/f/${SPACE_ID}/${filename}`;

  console.log(`    ✓ ${publicUrl.slice(0, 90)}`);

  return {
    id:             createRes.id,
    alt:            altText || '',
    name:           filename.replace(/\.[^.]+$/, '').replace(/-/g, ' '),
    focus:          null,
    title:          '',
    filename:       publicUrl,
    copyright:      '',
    fieldtype:      'asset',
    is_external_url: false,
  };
}

// ---------------------------------------------------------------------------
// 1. Update press_article schema: lead_image_src → lead_image (asset)
// ---------------------------------------------------------------------------

async function updateSchema() {
  console.log('\n→ Updating press_article schema…');
  const list = await api('GET', `/v1/spaces/${SPACE_ID}/components/`);
  const comp = list.components?.find((c) => c.name === 'press_article');
  if (!comp) { console.error('  ✗ press_article component not found'); return; }

  const schema = { ...comp.schema };

  // Skip if already done
  if (schema.lead_image?.type === 'asset') {
    console.log('  – lead_image already asset type, skipping schema update');
    return;
  }

  // Add lead_image as asset field (replaces lead_image_src + lead_image_alt)
  const srcPos = schema.lead_image_src?.pos ?? 7;
  delete schema.lead_image_src;
  delete schema.lead_image_alt;

  schema.lead_image = {
    type:         'asset',
    pos:          srcPos,
    display_name: 'Lead Image',
    filetypes:    ['images'],
  };

  // Keep lead_image_caption at pos srcPos + 1
  if (schema.lead_image_caption) schema.lead_image_caption.pos = srcPos + 1;

  await sleep(600);
  const res = await api('PUT', `/v1/spaces/${SPACE_ID}/components/${comp.id}`, {
    component: { ...comp, schema },
  });

  if (res.component?.id) {
    console.log('  ✓ Schema updated: lead_image_src → lead_image (asset)');
  } else {
    console.error('  ✗ Schema update failed:', JSON.stringify(res).slice(0, 200));
  }
}

// ---------------------------------------------------------------------------
// 2. Upload lead images + update each article
// ---------------------------------------------------------------------------

async function migrateArticles() {
  console.log('\n→ Fetching all press article stories…');
  await sleep(400);
  const list = await api(
    'GET',
    `/v1/spaces/${SPACE_ID}/stories/?starts_with=press%2F&per_page=25&excluding_slugs=press%2Findex`
  );
  const stories = list.stories || [];
  console.log(`  Found ${stories.length} articles`);

  for (const s of stories) {
    await sleep(700);
    const full = await api('GET', `/v1/spaces/${SPACE_ID}/stories/${s.id}`);
    if (!full.story) { console.error(`  ✗ Could not fetch ${s.slug}`); continue; }

    const story   = full.story;
    const content = story.content;

    // Already migrated — lead_image is an object (has .filename)
    if (content.lead_image && typeof content.lead_image === 'object' && content.lead_image.filename) {
      console.log(`  – [${story.full_slug}] lead_image already asset, skipping`);
      continue;
    }

    const src = content.lead_image_src;
    if (!src) { console.log(`  – [${story.full_slug}] no lead_image_src, skipping`); continue; }

    console.log(`\n  [${story.full_slug}]`);
    const asset = await uploadAsset(src, content.lead_image_alt || '');
    if (!asset) continue;

    const newContent = {
      ...content,
      lead_image:     asset,
      // Keep old fields temporarily so frontend fallback works during transition
      // They'll be removed when the schema removes them
    };
    delete newContent.lead_image_src;
    delete newContent.lead_image_alt;

    await sleep(600);
    const upd = await api('PUT', `/v1/spaces/${SPACE_ID}/stories/${story.id}`, {
      story: { content: newContent, publish: 1 },
    });
    if (upd.story?.id) {
      console.log(`  ✓ Story updated + published`);
    } else {
      console.error(`  ✗ Story update failed:`, JSON.stringify(upd).slice(0, 200));
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

(async () => {
  if (!TOKEN) { console.error('STORYBLOK_PERSONAL_TOKEN not set'); process.exit(1); }
  try {
    await updateSchema();
    await migrateArticles();
    console.log('\n✓ Image migration complete.\n');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();
