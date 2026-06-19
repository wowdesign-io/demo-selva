'use strict';
// Session 8 patch — migrate press_article body from bloks[] to a single richtext field.
// Run: node scripts/storyblok-migrate-press-richtext.js

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';
const https    = require('https');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function api(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'mapi.storyblok.com',
      path,
      method,
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(opts, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        try { resolve(JSON.parse(d)); }
        catch { resolve(d); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// HTML → Prosemirror helpers
// ---------------------------------------------------------------------------

function decodeEntities(str) {
  return str
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&middot;/g, '·')
    .replace(/&times;/g, '×')
    .replace(/&copy;/g, '©')
    .replace(/&#39;/g, "'");
}

function htmlToNodes(html) {
  if (!html) return [];
  const nodes = [];
  // Tokenise on <em>, <strong>, <a ...>, closing tags
  const regex = /(<em>|<\/em>|<strong>|<\/strong>|<a [^>]+>|<\/a>)/gi;
  const parts = html.split(regex);
  let marks = [];
  for (const part of parts) {
    if (!part) continue;
    const lc = part.toLowerCase();
    if (lc === '<em>') {
      marks = [...marks, { type: 'italic' }];
    } else if (lc === '</em>') {
      marks = marks.filter((m) => m.type !== 'italic');
    } else if (lc === '<strong>') {
      marks = [...marks, { type: 'bold' }];
    } else if (lc === '</strong>') {
      marks = marks.filter((m) => m.type !== 'bold');
    } else if (lc.startsWith('<a ')) {
      const m = part.match(/href="([^"]*)"/i);
      marks = [...marks, { type: 'link', attrs: { href: m ? m[1] : '#', target: '_self', linktype: 'url' } }];
    } else if (lc === '</a>') {
      marks = marks.filter((m) => m.type !== 'link');
    } else {
      const text = decodeEntities(part);
      if (text) nodes.push(marks.length ? { type: 'text', text, marks: [...marks] } : { type: 'text', text });
    }
  }
  return nodes;
}

function blokToNode(blok) {
  switch (blok.component) {
    case 'body_paragraph': {
      const content = htmlToNodes(blok.text || '');
      return content.length ? { type: 'paragraph', content } : null;
    }
    case 'body_heading': {
      const content = htmlToNodes(blok.text || '');
      return content.length ? { type: 'heading', attrs: { level: 2 }, content } : null;
    }
    case 'body_quote': {
      const textNodes = htmlToNodes(blok.text || '');
      const citeNodes = blok.cite ? htmlToNodes(decodeEntities(blok.cite)) : [];
      const children = [
        ...(textNodes.length ? [{ type: 'paragraph', content: textNodes }] : []),
        ...(citeNodes.length ? [{ type: 'paragraph', content: citeNodes }] : []),
      ];
      return children.length ? { type: 'blockquote', content: children } : null;
    }
    case 'body_figure':
      return {
        type: 'image',
        attrs: { src: blok.src || '', alt: blok.alt || '', title: blok.caption || '' },
      };
    default:
      return null;
  }
}

function bodyBloксToRichText(bodyBloks) {
  const content = (bodyBloks || []).map(blokToNode).filter(Boolean);
  return { type: 'doc', content: content.length ? content : [{ type: 'paragraph', content: [] }] };
}

// ---------------------------------------------------------------------------
// 1. Update press_article block schema: body bloks → richtext
// ---------------------------------------------------------------------------

async function updatePressArticleSchema() {
  console.log('\n→ Fetching press_article block schema…');
  const list = await api('GET', `/v1/spaces/${SPACE_ID}/components/`);
  const comp = list.components?.find((c) => c.name === 'press_article');
  if (!comp) { console.error('  ✗ press_article block not found'); return; }

  if (comp.schema?.body?.type === 'richtext') {
    console.log('  – body already richtext, skipping schema update');
    return;
  }

  const schema = { ...comp.schema };
  schema.body = {
    type: 'richtext',
    pos: 9,
    display_name: 'Article Body',
    toolbar: [
      'bold', 'italic', 'link', 'image',
      'paragraph', 'h2', 'h3',
      'quote', 'olist', 'ulist',
    ],
    allow_target_blank: true,
    restrict_type: '',
    asset_link_type: false,
  };

  const res = await api('PUT', `/v1/spaces/${SPACE_ID}/components/${comp.id}`, {
    component: { ...comp, schema },
  });
  if (res.component?.id) {
    console.log('  ✓ press_article body field changed to richtext');
  } else {
    console.error('  ✗ Failed to update schema:', JSON.stringify(res).slice(0, 200));
  }
}

// ---------------------------------------------------------------------------
// 2. Migrate each article's body bloks → richtext JSON
// ---------------------------------------------------------------------------

async function migrateArticles() {
  console.log('\n→ Fetching all press article stories…');
  const list = await api(
    'GET',
    `/v1/spaces/${SPACE_ID}/stories/?starts_with=press%2F&per_page=25&excluding_slugs=press%2Findex`
  );
  const stories = list.stories || [];
  console.log(`  Found ${stories.length} articles to migrate`);

  for (const story of stories) {
    await sleep(600);
    const full = await api('GET', `/v1/spaces/${SPACE_ID}/stories/${story.id}`);
    if (!full.story) { console.error(`  ✗ Could not fetch ${story.slug}`); continue; }
    const s = full.story;

    // Skip if already migrated to richtext
    if (s.content?.body?.type === 'doc') {
      console.log(`  – [${s.full_slug}] already richtext, skipping`);
      continue;
    }

    const bodyBloks = Array.isArray(s.content?.body) ? s.content.body : [];
    const richtext = bodyBloксToRichText(bodyBloks);
    const newContent = { ...s.content, body: richtext };

    console.log(`\n  [${s.full_slug}] — ${bodyBloks.length} bloks → richtext (${richtext.content.length} nodes)`);
    await sleep(400);
    const upd = await api('PUT', `/v1/spaces/${SPACE_ID}/stories/${s.id}`, {
      story: { content: newContent, publish: 1 },
    });
    if (upd.story?.id) {
      console.log(`  ✓ Updated + published`);
    } else {
      console.error(`  ✗ Failed:`, JSON.stringify(upd).slice(0, 200));
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Delete the four body sub-block components (no longer needed)
// ---------------------------------------------------------------------------

async function deleteBodyBlocks() {
  const toDelete = ['body_paragraph', 'body_heading', 'body_quote', 'body_figure'];
  console.log('\n→ Deleting unused body sub-block components…');
  const list = await api('GET', `/v1/spaces/${SPACE_ID}/components/`);
  for (const name of toDelete) {
    const comp = list.components?.find((c) => c.name === name);
    if (!comp) { console.log(`  – ${name} not found, skipping`); continue; }
    const res = await api('DELETE', `/v1/spaces/${SPACE_ID}/components/${comp.id}`);
    console.log(`  ✓ Deleted ${name} (${comp.id})`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

(async () => {
  if (!TOKEN) { console.error('STORYBLOK_PERSONAL_TOKEN not set'); process.exit(1); }
  try {
    await updatePressArticleSchema();
    await migrateArticles();
    await deleteBodyBlocks();
    console.log('\n✓ Migration complete.\n');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();
