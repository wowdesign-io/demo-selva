// Press data for the SELVA demo.
// Fictive, illustrative coverage created for this presentation. The data shape
// mirrors a future Storyblok `press_article` blok so the CMS migration is a
// data-source swap, not a rewrite (see docs/press-articles-plan.md).
//
// `body` is an ordered block array (not an HTML string) so it maps 1:1 onto
// Storyblok nested bloks. Paragraph/heading/quote text may carry a tiny set of
// inline marks (<em>, <a>) — these become richtext inline marks in Storyblok.

export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; cite: string }
  | { type: 'figure'; src: string; alt: string; caption: string };

export interface Article {
  slug: string;
  publication: string;
  date: string;
  title: string;
  dek: string;
  byline: string;
  readTime: string;
  leadImage: { src: string; alt: string; caption: string };
  body: Block[];
  related: string[]; // slugs of sibling articles
  seo: { title: string; description: string };
}

export interface PressCard {
  pub: string;
  date: string;
  title: string;
  slug: string;
  delay?: string;
}

// Lead-in line shared link target used across closings.
const PLANPOINT_LINK = '<a href="/residences#planpoint">interactive availability tool</a>';

export const ARTICLES: Record<string, Article> = {
  'where-the-forest-meets-the-sky': {
    slug: 'where-the-forest-meets-the-sky',
    publication: 'Continuum Magazine',
    date: 'May 2026',
    title: 'Where the forest meets the sky',
    dek: 'Inside SELVA’s botanical vision — a forty-residence sanctuary that trades height for depth, and views for a sense of living among the trees.',
    byline: 'Marisol Vega',
    readTime: '6 min read',
    leadImage: {
      src: '/images/renders/vision-02.webp',
      alt: 'Aerial view of SELVA Residences nestled among the Coconut Grove canopy',
      caption: 'SELVA Residences, rising three storeys into the Coconut Grove canopy. Artist’s conception.',
    },
    body: [
      { type: 'paragraph', text: 'In a city that has spent two decades reaching ever higher, SELVA Residences makes a quieter argument. Rather than a tower, the project rises just three storeys &mdash; forty residences set deliberately low into the Coconut Grove canopy, where the architecture seems less to command the landscape than to disappear into it.' },
      { type: 'paragraph', text: 'The premise is captured in a single line the developer keeps returning to: <em>where the forest meets the sky</em>. It is a tagline, but it is also a brief. Every decision &mdash; the scale, the planting, the depth of the terraces &mdash; works to keep residents inside the green rather than above it.' },
      { type: 'heading', text: 'An argument for staying low' },
      { type: 'paragraph', text: 'Coconut Grove has always been Miami&rsquo;s most wooded enclave, and SELVA treats that as the asset, not the constraint. Across three floors, the building holds three residence models &mdash; designated simply B, C and D &mdash; ranging from compact patio suites to layouts with a den and an outward-facing balcony. The result is intimate by design: a community measured in dozens, not hundreds.' },
      { type: 'quote', text: '&ldquo;We weren&rsquo;t interested in a view you look at from behind glass. We wanted a building you could step into the canopy from.&rdquo;', cite: '&mdash; Banyan Bay Development' },
      { type: 'paragraph', text: 'That ambition shows up most clearly in the way the residences open. Sliding walls dissolve the line between interior and terrace; planting is drawn up and through the structure rather than parked at its base. The effect, walking the model interiors, is of rooms that breathe outward.' },
      { type: 'figure', src: '/images/renders/exterior-05.webp', alt: 'The rooftop pool terrace above the treetops at SELVA', caption: 'The rooftop terrace, where the amenity deck meets open sky. Artist’s conception.' },
      { type: 'heading', text: 'A different kind of address' },
      { type: 'paragraph', text: 'With pre-sales now open and delivery anticipated in mid-2027, SELVA arrives as a counter-proposal to the glass towers along the bay &mdash; a reminder that, in the Grove, the most luxurious thing on offer may simply be the trees. Whether the market agrees, the building is betting that quiet, for once, is the headline.' },
      { type: 'paragraph', text: `The sales gallery is open by appointment. More information is available through the ${PLANPOINT_LINK} on the residences page.` },
    ],
    related: ['forty-residences-rise-among-the-canopy', 'a-three-storey-sanctuary-in-coconut-grove', 'the-coastal-edit-selva-opens-pre-sales'],
    seo: {
      title: 'Where the Forest Meets the Sky — SELVA Residences',
      description: 'Continuum Magazine on SELVA’s botanical vision — a 40-residence sanctuary rising three storeys into the Coconut Grove canopy.',
    },
  },

  'forty-residences-rise-among-the-canopy': {
    slug: 'forty-residences-rise-among-the-canopy',
    publication: 'Grove Quarterly',
    date: 'Apr 2026',
    title: 'Forty residences rise among the canopy',
    dek: 'A close look at how SELVA threads forty homes through the treetops of Coconut Grove without ever leaving the green behind.',
    byline: 'Elena Marsh',
    readTime: '5 min read',
    leadImage: {
      src: '/images/renders/exterior-02.webp',
      alt: 'SELVA Residences seen through the Coconut Grove tree line',
      caption: 'The façade reads as part of the tree line rather than an interruption of it. Artist’s conception.',
    },
    body: [
      { type: 'paragraph', text: 'There is a particular kind of restraint at work at SELVA. Where most new Miami developments announce themselves from a distance, this one waits until you are nearly upon it. Forty residences sit across three low storeys, screened by mature canopy that the design treats as a structural partner rather than a backdrop.' },
      { type: 'paragraph', text: 'Walk the site plan and the logic becomes clear. The building steps back where the oldest trees stand, and terraces are notched to follow the line of the branches. Nothing was cleared that did not have to be.' },
      { type: 'heading', text: 'Density without the crowd' },
      { type: 'paragraph', text: 'Forty homes is a deliberate number &mdash; large enough to fund the kind of detailing the project wants, small enough that residents are not folded into anonymity. Three models, B, C and D, fan out across the floors, so that no single layout dominates and the community stays mixed.' },
      { type: 'paragraph', text: 'The effect is a building that feels populated but never busy. Corridors are short. Lobbies are quiet. The lift carries you past planting, not signage.' },
      { type: 'figure', src: '/images/renders/vision-01.webp', alt: 'A SELVA residence opening onto a planted terrace', caption: 'Planting is drawn up and through the structure, not parked at its base. Artist’s conception.' },
      { type: 'paragraph', text: 'With pre-sales open and delivery set for mid-2027, SELVA is making a wager that the Grove&rsquo;s buyers want fewer neighbours and more trees. On the evidence of the model interiors, it is a wager worth watching.' },
      { type: 'paragraph', text: `Availability and floorplans can be explored through the ${PLANPOINT_LINK} on the residences page.` },
    ],
    related: ['where-the-forest-meets-the-sky', 'a-three-storey-sanctuary-in-coconut-grove', 'three-models-one-forest'],
    seo: {
      title: 'Forty Residences Rise Among the Canopy — SELVA Residences',
      description: 'Grove Quarterly on how SELVA threads forty homes through the Coconut Grove treetops across three low storeys.',
    },
  },

  'a-three-storey-sanctuary-in-coconut-grove': {
    slug: 'a-three-storey-sanctuary-in-coconut-grove',
    publication: 'Miami Design Review',
    date: 'Apr 2026',
    title: 'A three-storey sanctuary in Coconut Grove',
    dek: 'On materials, light and the biophilic instinct behind SELVA — a building designed to recede into its corner of the Grove.',
    byline: 'Daniel Roche',
    readTime: '7 min read',
    leadImage: {
      src: '/images/renders/exterior-03.webp',
      alt: 'Detail of SELVA’s warm-white stone and fluted timber façade',
      caption: 'Warm-white stone and fluted timber let the architecture recede. Artist’s conception.',
    },
    body: [
      { type: 'paragraph', text: 'Architecture that wants to disappear is harder to make than architecture that wants to be seen. SELVA, the work of Estudio Frondoso, belongs firmly to the first category &mdash; a three-storey building that spends its design budget on not standing out.' },
      { type: 'paragraph', text: 'The palette is the first tell. Warm-white stone, fluted timber and deep eaves trade gloss for grain, so that morning light lands soft rather than sharp. From the street the building reads as part of the forest it sits within.' },
      { type: 'heading', text: 'Biophilic, not decorative' },
      { type: 'paragraph', text: 'It would be easy to mistake the planting for styling. It is not. Vertical gardens and terrace plantings, drawn by Ra&iacute;z Landscape Studio, are run through the structure so the landscape matures with the building and softens it year on year.' },
      { type: 'quote', text: '&ldquo;We designed around the canopy rather than above it. The trees were the first clients in the room.&rdquo;', cite: '&mdash; Estudio Frondoso' },
      { type: 'paragraph', text: 'Inside, Taller Lumina&rsquo;s material story carries the same idea indoors: white oak, honed travertine, woven cane and brushed brass, framed by glass that opens to the green. Each room is composed to feel grown rather than installed.' },
      { type: 'figure', src: '/images/renders/interior-02.jpg', alt: 'A SELVA living interior in natural materials opening to planting', caption: 'Interiors in white oak, travertine and cane, framed by glass to the canopy. Artist’s conception.' },
      { type: 'paragraph', text: `Delivery is anticipated in mid-2027. The model residences and full finish schedule can be previewed through the ${PLANPOINT_LINK} on the residences page.` },
    ],
    related: ['where-the-forest-meets-the-sky', 'forty-residences-rise-among-the-canopy', 'the-quiet-luxury-of-living-in-the-trees'],
    seo: {
      title: 'A Three-Storey Sanctuary in Coconut Grove — SELVA Residences',
      description: 'Miami Design Review on the materials, light and biophilic design behind SELVA’s low-rise architecture.',
    },
  },

  'the-coastal-edit-selva-opens-pre-sales': {
    slug: 'the-coastal-edit-selva-opens-pre-sales',
    publication: 'The Coastal Edit',
    date: 'Mar 2026',
    title: 'SELVA opens pre-sales in the Grove',
    dek: 'Pre-sales are now open at SELVA Residences, with forty homes priced from $300K and a sales gallery open by appointment.',
    byline: 'Priya Anand',
    readTime: '4 min read',
    leadImage: {
      src: '/images/renders/interior-01.jpg',
      alt: 'A light-filled SELVA living space opening to the canopy',
      caption: 'A model residence interior, opening to the terrace. Artist’s conception.',
    },
    body: [
      { type: 'paragraph', text: 'SELVA Residences has opened pre-sales, and the Grove now has a new name on its waiting list. The forty-home project, set across three storeys in the heart of Coconut Grove, began private previews this month ahead of an anticipated mid-2027 delivery.' },
      { type: 'paragraph', text: 'Pricing starts at $300K, with residences ranging from 575 to 800 square feet across three models. For a Grove address with this level of finish, the entry point is notably accessible &mdash; a fact the sales team appears keen to lead with.' },
      { type: 'heading', text: 'What buyers are seeing' },
      { type: 'paragraph', text: 'Early visitors are walked through model layouts, finish selections and live availability at the sales gallery on Hibiscus Lane. Rather than a static price sheet, prospective buyers explore floors and units through an interactive tool that updates as homes are reserved.' },
      { type: 'paragraph', text: 'It is a quietly modern way to sell a quietly modern building &mdash; less hard sell, more guided tour.' },
      { type: 'figure', src: '/images/renders/kitchen.webp', alt: 'A SELVA kitchen in white oak and travertine', caption: 'Kitchens in white oak and honed travertine. Artist’s conception.' },
      { type: 'paragraph', text: `The sales gallery at 3000 Hibiscus Lane is open by appointment. Floors, units and current availability can be explored through the ${PLANPOINT_LINK} on the residences page.` },
    ],
    related: ['banyan-bay-development-unveils-selva-residences', 'meridian-residential-leads-selvas-sales-launch', 'coconut-groves-most-anticipated-new-address'],
    seo: {
      title: 'SELVA Opens Pre-Sales in the Grove — SELVA Residences',
      description: 'The Coastal Edit on SELVA’s pre-sales launch — forty homes from $300K, with a sales gallery open by appointment in Coconut Grove.',
    },
  },

  'banyan-bay-development-unveils-selva-residences': {
    slug: 'banyan-bay-development-unveils-selva-residences',
    publication: 'Habitat Miami',
    date: 'Mar 2026',
    title: 'Banyan Bay Development unveils SELVA Residences',
    dek: 'The boutique developer behind SELVA on why it chose forty homes over four hundred, and the long view over the quick exit.',
    byline: 'Thomas Reyer',
    readTime: '6 min read',
    leadImage: {
      src: '/images/renders/exterior-04.webp',
      alt: 'The SELVA building set low among mature Coconut Grove trees',
      caption: 'SELVA set deliberately low among the Grove’s mature trees. Artist’s conception.',
    },
    body: [
      { type: 'paragraph', text: 'Banyan Bay Development is not a name that shouts, and that appears to be the point. The boutique developer this month unveiled SELVA Residences, a forty-home project in Coconut Grove that it has shepherded from raw land toward a mid-2027 delivery.' },
      { type: 'paragraph', text: 'Founding partner David Calloway frames the company&rsquo;s approach as a deliberate counter to the prevailing model. Fewer homes, finer detailing, and a building made to belong to its street for decades rather than to flip on completion.' },
      { type: 'quote', text: '&ldquo;We could have built four hundred units. We built forty, because we wanted something the Grove would still be glad of in thirty years.&rdquo;', cite: '&mdash; David Calloway, Banyan Bay Development' },
      { type: 'heading', text: 'The long view' },
      { type: 'paragraph', text: 'That philosophy explains the assembled team: Estudio Frondoso on architecture, Taller Lumina on interiors, Ra&iacute;z Landscape Studio on planting. Each discipline shaped the next, so that structure, interior and landscape read as a single continuous gesture.' },
      { type: 'paragraph', text: 'The developer has also leaned into how the project is sold, commissioning a digital experience and interactive floorplan tools so buyers can explore availability before they ever set foot in the gallery.' },
      { type: 'figure', src: '/images/renders/terrace.webp', alt: 'A planted SELVA terrace opening to the canopy', caption: 'Terraces notched to follow the line of the branches. Artist’s conception.' },
      { type: 'paragraph', text: `Pre-sales are open and the gallery is taking appointments. Floorplans and availability can be explored through the ${PLANPOINT_LINK} on the residences page.` },
    ],
    related: ['the-coastal-edit-selva-opens-pre-sales', 'where-the-forest-meets-the-sky', 'meridian-residential-leads-selvas-sales-launch'],
    seo: {
      title: 'Banyan Bay Development Unveils SELVA Residences',
      description: 'Habitat Miami on Banyan Bay Development and why it chose forty homes over four hundred for SELVA in Coconut Grove.',
    },
  },

  'the-quiet-luxury-of-living-in-the-trees': {
    slug: 'the-quiet-luxury-of-living-in-the-trees',
    publication: 'Verdant Journal',
    date: 'Feb 2026',
    title: 'The quiet luxury of living in the trees',
    dek: 'What it actually feels like to live at SELVA — a meditation on light, planting and the value of being unhurried.',
    byline: 'Camille Ortega',
    readTime: '5 min read',
    leadImage: {
      src: '/images/renders/balcony.webp',
      alt: 'A SELVA balcony framed by planting and canopy',
      caption: 'A residence balcony, the canopy within reach. Artist’s conception.',
    },
    body: [
      { type: 'paragraph', text: 'Luxury in Miami has long meant elevation &mdash; the higher the floor, the further the view. SELVA proposes something almost contrarian: that the real privilege is to be close to the trees, not above them.' },
      { type: 'paragraph', text: 'Step onto one of its terraces and the argument lands without words. The canopy is within reach. Light arrives filtered and green. The traffic of the city falls away into something closer to birdsong.' },
      { type: 'heading', text: 'An unhurried kind of home' },
      { type: 'paragraph', text: 'The interiors, by Taller Lumina, are composed to feel calm rather than impressive. White oak underfoot, travertine that holds the cool, planting never more than a glance away. There is little here that asks to be photographed; there is a great deal that asks to be lived in.' },
      { type: 'paragraph', text: 'It is a register the Grove understands. This has always been Miami&rsquo;s most wooded enclave, the place residents go to slow down. SELVA reads that instinct correctly and builds an entire address around it.' },
      { type: 'figure', src: '/images/renders/interior-03.jpg', alt: 'A calm SELVA interior in natural materials', caption: 'Interiors composed to feel calm rather than impressive. Artist’s conception.' },
      { type: 'paragraph', text: `Forty residences, pre-sales open, delivery mid-2027. The model interiors can be previewed through the ${PLANPOINT_LINK} on the residences page.` },
    ],
    related: ['where-the-forest-meets-the-sky', 'a-three-storey-sanctuary-in-coconut-grove', 'coconut-groves-most-anticipated-new-address'],
    seo: {
      title: 'The Quiet Luxury of Living in the Trees — SELVA Residences',
      description: 'Verdant Journal on the experience of living at SELVA — light, planting and the value of being unhurried in Coconut Grove.',
    },
  },

  'meridian-residential-leads-selvas-sales-launch': {
    slug: 'meridian-residential-leads-selvas-sales-launch',
    publication: 'South Florida Estates',
    date: 'Feb 2026',
    title: 'Meridian Residential leads SELVA’s sales launch',
    dek: 'Inside the boutique sales approach at SELVA — private previews, a Grove gallery, and interactive tools that let buyers explore before they visit.',
    byline: 'Jordan Fields',
    readTime: '5 min read',
    leadImage: {
      src: '/images/renders/interior-04.jpg',
      alt: 'A model SELVA residence prepared for private previews',
      caption: 'A model residence prepared for private previews. Artist’s conception.',
    },
    body: [
      { type: 'paragraph', text: 'Meridian Residential has taken the reins on SELVA&rsquo;s sales launch, and its approach says as much about the building as any rendering. With only forty homes to place, the brokerage has built its process around attention rather than volume.' },
      { type: 'paragraph', text: 'Sales director Karen Whitfield leads pre-sales and private previews from the Coconut Grove gallery, guiding residents through floorplans, finishes and the story of the building. Each buyer is accompanied from first visit to closing &mdash; the unhurried, personal service a boutique address allows.' },
      { type: 'heading', text: 'Selling a building before it stands' },
      { type: 'paragraph', text: 'The team has paired the gallery with an interactive availability tool, so prospective buyers can explore floors and units &mdash; and see what remains &mdash; before they ever book a visit. It compresses the distance between curiosity and commitment.' },
      { type: 'quote', text: '&ldquo;With forty homes, every conversation matters. We are not running a queue; we are matching people to the right residence.&rdquo;', cite: '&mdash; Karen Whitfield, Meridian Residential' },
      { type: 'paragraph', text: 'Early demand has been steady, the brokerage reports, with interest concentrated in the larger D model layouts that add a den and an outward-facing balcony.' },
      { type: 'figure', src: '/images/renders/kitchen-wide.webp', alt: 'A wide SELVA kitchen and living space', caption: 'A D-model layout, opening kitchen to living to terrace. Artist’s conception.' },
      { type: 'paragraph', text: `The gallery at 3000 Hibiscus Lane is open by appointment. Current availability can be explored through the ${PLANPOINT_LINK} on the residences page.` },
    ],
    related: ['the-coastal-edit-selva-opens-pre-sales', 'banyan-bay-development-unveils-selva-residences', 'three-models-one-forest'],
    seo: {
      title: 'Meridian Residential Leads SELVA’s Sales Launch',
      description: 'South Florida Estates on the boutique sales approach at SELVA — private previews, a Grove gallery, and interactive availability tools.',
    },
  },

  'three-models-one-forest': {
    slug: 'three-models-one-forest',
    publication: 'Tropic & Co.',
    date: 'Jan 2026',
    title: 'Three models, one forest: SELVA’s approach to scale',
    dek: 'A breakdown of SELVA’s three residence types — B, C and D — and how forty homes stay varied without ever feeling large.',
    byline: 'Lucia Mendes',
    readTime: '6 min read',
    leadImage: {
      src: '/images/renders/vision-01.webp',
      alt: 'A SELVA residence and terrace framed by planting',
      caption: 'Each model is tuned to a different way of living in the canopy. Artist’s conception.',
    },
    body: [
      { type: 'paragraph', text: 'Scale is the quiet problem every boutique development has to solve. Too few layouts and a building feels monotonous; too many and it loses coherence. SELVA settles the question with three: models B, C and D, spread across forty homes and three storeys.' },
      { type: 'heading', text: 'B, C and D' },
      { type: 'paragraph', text: 'Model B is the compact patio suite &mdash; the entry layout, opening directly to planting at the lower levels. Model C sits in the middle, a balanced one-bedroom with a generous terrace. Model D is the largest, adding a den and an outward-facing balcony for those who want a little more room to breathe.' },
      { type: 'paragraph', text: 'Residences range from 575 to 800 square feet. Modest on paper, but the depth of the terraces and the reach of the glass make them live larger than the numbers suggest.' },
      { type: 'figure', src: '/images/renders/interior-04.jpg', alt: 'A SELVA model interior opening to a planted terrace', caption: 'The depth of the terraces makes the residences live larger than their footprint. Artist’s conception.' },
      { type: 'paragraph', text: 'Crucially, the three models are interleaved across the floors rather than stacked by tier. The mix keeps any single layout from dominating a level, and keeps the community varied from the ground up.' },
      { type: 'paragraph', text: `Pricing starts at $300K, with delivery anticipated mid-2027. The three models can be compared side by side through the ${PLANPOINT_LINK} on the residences page.` },
    ],
    related: ['forty-residences-rise-among-the-canopy', 'where-the-forest-meets-the-sky', 'meridian-residential-leads-selvas-sales-launch'],
    seo: {
      title: 'Three Models, One Forest — SELVA Residences',
      description: 'Tropic & Co. on SELVA’s three residence types — B, C and D — and how forty homes stay varied without feeling large.',
    },
  },

  'coconut-groves-most-anticipated-new-address': {
    slug: 'coconut-groves-most-anticipated-new-address',
    publication: 'The Bayfront Review',
    date: 'Jan 2026',
    title: 'Coconut Grove’s most anticipated new address',
    dek: 'Why SELVA has the Grove talking — a neighbourhood that prizes trees over towers finally gets a building that agrees.',
    byline: 'Nathan Cole',
    readTime: '5 min read',
    leadImage: {
      src: '/images/renders/bayfront-marina.jpg',
      alt: 'The Coconut Grove waterfront near SELVA Residences',
      caption: 'Coconut Grove, where the waterfront meets the canopy. Artist’s conception.',
    },
    body: [
      { type: 'paragraph', text: 'Ask around Coconut Grove this season and one project keeps surfacing. SELVA Residences has the neighbourhood talking &mdash; not for its height or its price, but for how completely it seems to understand where it is.' },
      { type: 'paragraph', text: 'The Grove has always been Miami&rsquo;s green exception, a place that chose trees over towers long before it was fashionable. For years its new buildings fought that character. SELVA, by contrast, agrees with it.' },
      { type: 'heading', text: 'A building that fits its street' },
      { type: 'paragraph', text: 'At three storeys and forty homes, the project is scaled to the neighbourhood rather than to the skyline. It sits close to the canopy, steps back for the oldest trees, and keeps its presence on the street deliberately low.' },
      { type: 'paragraph', text: 'That fit is what has locals paying attention. A building that belongs to its corner is rarer here than it should be, and the Grove appears to recognise one when it sees it.' },
      { type: 'figure', src: '/images/renders/amenity-01.jpg', alt: 'A SELVA amenity space opening to the gardens', caption: 'Amenity spaces open directly onto the gardens. Artist’s conception.' },
      { type: 'paragraph', text: `Pre-sales are open ahead of a mid-2027 delivery. The residences and neighbourhood setting can be explored through the ${PLANPOINT_LINK} on the residences page.` },
    ],
    related: ['the-quiet-luxury-of-living-in-the-trees', 'where-the-forest-meets-the-sky', 'the-coastal-edit-selva-opens-pre-sales'],
    seo: {
      title: 'Coconut Grove’s Most Anticipated New Address — SELVA Residences',
      description: 'The Bayfront Review on why SELVA has Coconut Grove talking — a neighbourhood that prizes trees over towers gets a building that agrees.',
    },
  },
};

// Index grid order + reveal delays (match the handoff cadence). Derived from the
// article map so the cards and articles never drift apart.
const INDEX_ORDER: { slug: string; delay?: string }[] = [
  { slug: 'where-the-forest-meets-the-sky' },
  { slug: 'forty-residences-rise-among-the-canopy', delay: '80' },
  { slug: 'a-three-storey-sanctuary-in-coconut-grove', delay: '80' },
  { slug: 'the-coastal-edit-selva-opens-pre-sales', delay: '160' },
  { slug: 'banyan-bay-development-unveils-selva-residences' },
  { slug: 'the-quiet-luxury-of-living-in-the-trees', delay: '80' },
  { slug: 'meridian-residential-leads-selvas-sales-launch', delay: '160' },
  { slug: 'three-models-one-forest' },
  { slug: 'coconut-groves-most-anticipated-new-address', delay: '80' },
];

const toCard = (slug: string, delay?: string): PressCard => {
  const a = ARTICLES[slug];
  return { pub: a.publication, date: a.date, title: a.title, slug: a.slug, delay };
};

export const PRESS_CARDS: PressCard[] = INDEX_ORDER.map((e) => toCard(e.slug, e.delay));

export const getArticle = (slug: string): Article | undefined => ARTICLES[slug];
export const getAllSlugs = (): string[] => Object.keys(ARTICLES);
export const getRelatedCards = (slugs: string[]): PressCard[] =>
  slugs.map((s, i) => toCard(s, i === 1 ? '80' : i === 2 ? '160' : undefined)).filter(Boolean);
