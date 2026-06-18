'use strict';
// Creates and publishes the amenities story in Storyblok.
// Run: node scripts/storyblok-create-amenities.js

const fs   = require('fs');
const path = require('path');

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';

const assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../storyblok-assets.json'), 'utf8'));
const a = name => assets[name] || { filename: '', alt: '', fieldtype: 'asset', id: null };

function uid() { return Math.random().toString(36).slice(2, 10); }

function sbLink(url) {
  return { linktype: 'url', url, cached_url: url, fieldtype: 'multilink', target: '' };
}

const story = {
  name: 'Amenities',
  slug: 'amenities',
  content: {
    _uid: uid(),
    component: 'page',
    body: [

      // ── HERO ──────────────────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'page_hero',
        wordmark_style: false,
        pre_label: 'Miami · Amenities',
        title: 'A Life Lived\nBeautifully',
        tagline: 'Seven experiences set in the canopy.',
        delivery_note: 'Delivery Mid-2027',
        bg_image: a('exterior-05.webp'),
        bg_alt: 'SELVA — sweeping garden courtyard at dusk',
      },

      // ── AMENITIES INTRO + CAROUSEL ────────────────────────────────────────────
      {
        _uid: uid(), component: 'amenities_intro',
        label: 'Seven Amenities · One Vision',
        heading: 'Conceived for Daily Wonder',
        body: "From the infinity-edge pool terrace to the botanical residents' lounge, every amenity at SELVA is conceived to enrich daily life with nature, light, and unhurried luxury. A life lived beautifully, every day.",
        cta_text: 'Explore the Residences',
        cta_href: sbLink('/residences#digital-twin'),
        overlay_label: 'View Residences',
        slide_href: sbLink('/residences#digital-twin'),
        slides: [
          { _uid: uid(), component: 'carousel_slide', image: a('pool-deck.webp'),         alt: 'SELVA — pool terrace',             label: 'Pool Terrace' },
          { _uid: uid(), component: 'carousel_slide', image: a('spa-room.webp'),           alt: 'SELVA — wellness spa',             label: 'Wellness Spa' },
          { _uid: uid(), component: 'carousel_slide', image: a('sky-terrace.webp'),        alt: 'SELVA — sky terrace',              label: 'Sky Terrace' },
          { _uid: uid(), component: 'carousel_slide', image: a('lounge.webp'),             alt: "SELVA — residents' lounge",        label: "Residents' Lounge" },
          { _uid: uid(), component: 'carousel_slide', image: a('fitness.webp'),            alt: 'SELVA — fitness studio',           label: 'Fitness Studio' },
          { _uid: uid(), component: 'carousel_slide', image: a('coworking-library.webp'),  alt: 'SELVA — library and co-work',      label: 'Library & Co-Work' },
          { _uid: uid(), component: 'carousel_slide', image: a('garden-courtyard.webp'),   alt: 'SELVA — garden courtyard',         label: 'Garden Courtyard' },
        ],
      },

      // ── CINEMATIC BAND ────────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'cinematic_band',
        image: a('sky-terrace.webp'),
        alt: 'SELVA — the sky terrace at golden hour',
        label: 'In Motion',
        heading: 'Evenings unfold\nabove the canopy',
        cta_text: 'View the Floorplans',
        cta_href: sbLink('/residences#digital-twin'),
      },

      // ── AMENITIES GRID ────────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'amenities_grid',
        label: 'All Amenities',
        count: 'Seven experiences',
        items: [
          { _uid: uid(), component: 'feature_item', icon_name: 'pool',       title: 'Pool Terrace',       desc: "An infinity-edge pool above the canopy, framed by swaying palms and open Miami sky — open from sunrise to sunset for residents." },
          { _uid: uid(), component: 'feature_item', icon_name: 'spa',        title: 'Wellness Spa',       desc: "Private treatment rooms, sauna, steam, and a cold-plunge pool — a sanctuary for deep restoration and unhurried wellbeing." },
          { _uid: uid(), component: 'feature_item', icon_name: 'sky',        title: 'Sky Terrace',        desc: "A rooftop terrace with fire feature and lounge seating, set among the treetops for golden-hour gatherings under open sky." },
          { _uid: uid(), component: 'feature_item', icon_name: 'lounge',     title: "Residents' Lounge",  desc: "An indoor lounge of linen, stone, and living greenery — for receptions, quiet afternoons, and evenings by the fire." },
          { _uid: uid(), component: 'feature_item', icon_name: 'fitness',    title: 'Fitness Studio',     desc: "A light-filled studio facing a vertical garden, equipped for strength, cardio, and stretch amid the green." },
          { _uid: uid(), component: 'feature_item', icon_name: 'library',    title: 'Library & Co-Work',  desc: "An oak-panelled library and communal worktable — for focused work or quiet study amid the treetops." },
          { _uid: uid(), component: 'feature_item', icon_name: 'courtyard',  title: 'Garden Courtyard',   desc: "A meandering botanical courtyard with a water feature and shaded stone seating at the heart of the building." },
        ],
      },

      // ── STICKY SLIDER ─────────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'amen_sticky_slider',
        label: 'A Day at SELVA',
        title: 'From first light to last',
        cards: [
          { _uid: uid(), component: 'amen_card', image: a('pool-deck.webp'),         alt: 'Pool terrace at sunrise',              time: 'Sunrise',   name: 'Laps in the canopy pool' },
          { _uid: uid(), component: 'amen_card', image: a('fitness.webp'),           alt: 'Fitness studio in the morning',        time: 'Morning',   name: 'Strength among the ferns' },
          { _uid: uid(), component: 'amen_card', image: a('garden-courtyard.webp'),  alt: 'Garden courtyard at midday',           time: 'Midday',    name: 'Stillness in the courtyard' },
          { _uid: uid(), component: 'amen_card', image: a('coworking-library.webp'), alt: 'Library and co-work in the afternoon', time: 'Afternoon', name: 'Focus in the library' },
          { _uid: uid(), component: 'amen_card', image: a('lounge.webp'),            alt: 'Residents lounge in the evening',      time: 'Evening',   name: 'Gatherings by the fire' },
          { _uid: uid(), component: 'amen_card', image: a('sky-terrace.webp'),       alt: 'Sky terrace at nightfall',             time: 'Nightfall', name: 'Sunset on the sky terrace' },
        ],
      },

      // ── CTA ───────────────────────────────────────────────────────────────────
      {
        _uid: uid(), component: 'page_cta',
        label: 'Explore SELVA',
        heading: 'Find Your Residence',
        cta_text: 'Explore Floorplans',
        cta_href: sbLink('/residences#digital-twin'),
      },
    ],
  },
};

async function main() {
  if (!TOKEN) throw new Error('STORYBLOK_PERSONAL_TOKEN not set');

  // Check if story already exists
  const check = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories?starts_with=amenities`, {
    headers: { Authorization: TOKEN },
  });
  const { stories } = await check.json();
  const existing = stories?.find(s => s.slug === 'amenities');

  let storyId;
  if (existing) {
    console.log(`Updating existing amenities story (id=${existing.id})...`);
    storyId = existing.id;
    const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${storyId}`, {
      method: 'PUT',
      headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ story, publish: 1 }),
    });
    const d = await r.json();
    if (!r.ok) { console.error('PUT failed', d); process.exit(1); }
    console.log(`Updated and published: ${d.story.full_slug}`);
  } else {
    console.log('Creating amenities story...');
    const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
      method: 'POST',
      headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ story, publish: 1 }),
    });
    const d = await r.json();
    if (!r.ok) { console.error('POST failed', d); process.exit(1); }
    storyId = d.story.id;
    console.log(`Created and published: ${d.story.full_slug} (id=${storyId})`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
