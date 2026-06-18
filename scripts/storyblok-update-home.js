// Updates the home story with all content + CDN image URLs from the upload run.
// Usage: node scripts/storyblok-update-home.js <personal_access_token>

const { randomUUID } = require('crypto');
const uid = () => randomUUID();

const TOKEN    = process.argv[2] || process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';
const STORY_ID = '188490829391950';
const BASE     = 'https://mapi.storyblok.com/v1';

if (!TOKEN) { console.error('No token found. Set STORYBLOK_PERSONAL_TOKEN env var or pass it as an argument.'); process.exit(1); }

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

// Asset objects referencing CDN URLs from the upload run
function a(id, url, alt) {
  return { id, filename: url, alt, name: url.split('/').pop(), focus: '', title: '', source: '', copyright: '', fieldtype: 'asset', meta_data: {}, is_private: false };
}

const img = {
  hero:         a(854381, 'https://a.storyblok.com/f/293255653505523/854381/5ed1eb3fc6/360-front.jpg',              'SELVA Residences — botanical luxury, Miami'),
  overviewRes:  a(565869, 'https://a.storyblok.com/f/293255653505523/565869/9f82c7c461/interior-01.jpg',            'SELVA Residences — curated interiors'),
  overviewAmen: a(916390, 'https://a.storyblok.com/f/293255653505523/916390/8ae1d6fa13/pool-deck.webp',            'SELVA Amenities — botanical setting'),
  overviewHood: a(632740, 'https://a.storyblok.com/f/293255653505523/632740/4c50ecba64/sidewalk-storefronts.webp', 'SELVA — Miami neighborhood'),
  vision:       a(418142, 'https://a.storyblok.com/f/293255653505523/418142/7d43224505/exterior-03.webp',          'SELVA — where living and nature converge'),
  cardC:        a(316522, 'https://a.storyblok.com/f/293255653505523/316522/b94c71b0a8/terrace.webp',              'Model C — Patio 1BR Suite'),
  cardD:        a(293440, 'https://a.storyblok.com/f/293255653505523/293440/7b1a48c236/balcony.webp',              'Model D — 1BR + Den Suite'),
  cardB:        a(247706, 'https://a.storyblok.com/f/293255653505523/247706/56cb16395d/kitchen-wide.webp',         'Model B — 2BR Suite'),
  hood:         a(392584, 'https://a.storyblok.com/f/293255653505523/392584/3066cb5bb3/bayfront-marina.webp',      'SELVA — waterfront promenade and botanical residences'),
};

const content = {
  component: 'page', _uid: uid(),
  body: [

    {
      component: 'home_hero', _uid: uid(),
      pre_label:     'Miami · 40 Residences',
      title:         'SELVA',
      tagline:       'Where the forest meets the sky.',
      delivery_note: 'Delivery Mid-2027',
      bg_image: img.hero,
      bg_alt:   img.hero.alt,
    },

    {
      component: 'overview_section', _uid: uid(),
      intro_text: "Nestled where Miami's botanical soul meets the open sky, SELVA presents forty private residences — a rare collection where verdant canopy, bespoke interiors, and the city converge.",
      panels: [
        { component: 'overview_panel', _uid: uid(), label: 'Residences',   href: '/residences',   image: img.overviewRes,  alt: img.overviewRes.alt },
        { component: 'overview_panel', _uid: uid(), label: 'Amenities',    href: '/amenities',    image: img.overviewAmen, alt: img.overviewAmen.alt },
        { component: 'overview_panel', _uid: uid(), label: 'Neighborhood', href: '/neighborhood', image: img.overviewHood, alt: img.overviewHood.alt },
      ],
    },

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

    {
      component: 'residences_teaser', _uid: uid(),
      label:    'Residences',
      heading:  'Curated for Private Living',
      sub:      'Forty bespoke one- and two-bedroom residences — several with private dens — each thoughtfully proportioned for a life of botanical luxury and urban ease.',
      cta_text: 'View Residences',
      cta_href: '/residences',
    },

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
        { component: 'res_card', _uid: uid(), model_tag: 'Model C', name: 'Patio 1BR Suite',  sf: '575',     layout: '1',      outdoor: 'Patio',    image: img.cardC, alt: img.cardC.alt, planpoint_floor: 'Floor 1', planpoint_unit: '110', cta_text: 'View Floorplan →' },
        { component: 'res_card', _uid: uid(), model_tag: 'Model D', name: '1BR + Den Suite',  sf: '700–880', layout: '1 + Den', outdoor: 'Balcony', image: img.cardD, alt: img.cardD.alt, planpoint_floor: 'Floor 1', planpoint_unit: '113', cta_text: 'View Floorplan →' },
        { component: 'res_card', _uid: uid(), model_tag: 'Model B', name: '2BR Suite',        sf: '880',     layout: '2',      outdoor: 'Terrace',  image: img.cardB, alt: img.cardB.alt, planpoint_floor: 'Floor 1', planpoint_unit: '112', cta_text: 'View Floorplan →' },
      ],
    },

    {
      component: 'amenities_teaser', _uid: uid(),
      label:    'Amenities',
      heading:  'A Life Lived Beautifully',
      sub:      "From the skylit wellness terrace to the botanical residents’ lounge, every amenity at SELVA is conceived to enrich daily life with nature, light, and unhurried luxury.",
      cta_text: 'View Amenities',
      cta_href: '/amenities',
    },

    {
      component: 'neighborhood_teaser', _uid: uid(),
      image: img.hood, alt: img.hood.alt,
      label:   'The Neighborhood',
      heading: 'One Foot in the Canopy. One Foot in the City.',
      body:    "SELVA rises in one of Miami’s last green enclaves — where the canopy meets the bay, and the city’s culture, dining, and design districts sit just minutes away. A rare address that offers seclusion without distance.",
      address: '3000 Hibiscus Lane · Coconut Grove · Miami, FL 33133',
      cta_text: 'Explore the Neighborhood',
      cta_href: '/neighborhood',
      stats: [
        { component: 'stat_item', _uid: uid(), value: '6 min',  label: 'Design District' },
        { component: 'stat_item', _uid: uid(), value: '12 min', label: 'Brickell' },
        { component: 'stat_item', _uid: uid(), value: '14 min', label: 'South Beach' },
        { component: 'stat_item', _uid: uid(), value: '18 min', label: 'Miami Int’l Airport' },
      ],
    },

  ],
};

api('PUT', `/spaces/${SPACE_ID}/stories/${STORY_ID}/`, {
  story: { name: 'Home', slug: 'home', content },
})
  .then(() => console.log('Home story updated — all content + CDN images live in Storyblok.'))
  .catch(e => { console.error(e.message); process.exit(1); });
