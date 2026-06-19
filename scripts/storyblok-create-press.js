'use strict';
// Session 8 — Press
// Creates 6 block schemas, a press_index story at slug "press", then
// 9 press_article stories nested under it (full_slug = press/{slug}).
// Run: node scripts/storyblok-create-press.js

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';

function uid() { return Math.random().toString(36).slice(2, 10); }

// ---------------------------------------------------------------------------
// Block schemas
// ---------------------------------------------------------------------------

const BLOCKS = [
  {
    name: 'press_index',
    display_name: 'Press Index Page',
    is_root: true, is_nestable: false,
    schema: {
      label:           { type: 'text',      pos: 0, display_name: 'Label' },
      heading:         { type: 'text',      pos: 1, display_name: 'Heading' },
      note:            { type: 'text',      pos: 2, display_name: 'Note' },
      media_email:     { type: 'text',      pos: 3, display_name: 'Media Email' },
      cta_label:       { type: 'text',      pos: 4, display_name: 'CTA Tagline' },
      cta_heading:     { type: 'text',      pos: 5, display_name: 'CTA Heading' },
      cta_button_text: { type: 'text',      pos: 6, display_name: 'Button Text' },
      cta_button_href: { type: 'multilink', pos: 7, display_name: 'Button Link' },
    },
  },
  {
    name: 'body_paragraph',
    display_name: 'Body Paragraph',
    is_root: false, is_nestable: true,
    schema: {
      text: { type: 'textarea', pos: 0, display_name: 'Text' },
    },
  },
  {
    name: 'body_heading',
    display_name: 'Body Heading',
    is_root: false, is_nestable: true,
    schema: {
      text: { type: 'text', pos: 0, display_name: 'Text' },
    },
  },
  {
    name: 'body_quote',
    display_name: 'Body Quote',
    is_root: false, is_nestable: true,
    schema: {
      text: { type: 'textarea', pos: 0, display_name: 'Quote Text' },
      cite: { type: 'text',     pos: 1, display_name: 'Citation' },
    },
  },
  {
    name: 'body_figure',
    display_name: 'Body Figure',
    is_root: false, is_nestable: true,
    schema: {
      src:     { type: 'text', pos: 0, display_name: 'Image URL' },
      alt:     { type: 'text', pos: 1, display_name: 'Image Alt Text' },
      caption: { type: 'text', pos: 2, display_name: 'Caption' },
    },
  },
  {
    name: 'press_article',
    display_name: 'Press Article',
    is_root: true, is_nestable: false,
    schema: {
      publication:        { type: 'text',     pos: 0,  display_name: 'Publication' },
      date:               { type: 'text',     pos: 1,  display_name: 'Date' },
      title:              { type: 'text',     pos: 2,  display_name: 'Title' },
      dek:                { type: 'textarea', pos: 3,  display_name: 'Deck (subheadline)' },
      byline:             { type: 'text',     pos: 4,  display_name: 'Byline' },
      read_time:          { type: 'text',     pos: 5,  display_name: 'Read Time' },
      lead_image_src:     { type: 'text',     pos: 6,  display_name: 'Lead Image URL' },
      lead_image_alt:     { type: 'text',     pos: 7,  display_name: 'Lead Image Alt Text' },
      lead_image_caption: { type: 'text',     pos: 8,  display_name: 'Lead Image Caption' },
      body: {
        type: 'bloks', pos: 9, display_name: 'Body',
        component_whitelist: ['body_paragraph', 'body_heading', 'body_quote', 'body_figure'],
        restrict_components: true,
      },
      related:         { type: 'text',     pos: 10, display_name: 'Related Slugs (comma-separated)' },
      seo_title:       { type: 'text',     pos: 11, display_name: 'SEO Title' },
      seo_description: { type: 'textarea', pos: 12, display_name: 'SEO Description' },
    },
  },
];

// ---------------------------------------------------------------------------
// Shared PLANPOINT_LINK used in article bodies
// ---------------------------------------------------------------------------

const PLANPOINT_LINK = '<a href="/residences#planpoint">interactive availability tool</a>';

// ---------------------------------------------------------------------------
// Press index story content
// ---------------------------------------------------------------------------

const pressIndexContent = {
  _uid: uid(), component: 'press_index',
  label:           'Latest News',
  heading:         'Coverage & announcements',
  note:            'Illustrative coverage, created for this presentation.',
  media_email:     'press@selvaresidences.com',
  cta_label:       'Explore Next',
  cta_heading:     'Begin your visit',
  cta_button_text: 'Explore Floorplans',
  cta_button_href: { linktype: 'url', url: '/residences#digital-twin', cached_url: '/residences#digital-twin', fieldtype: 'multilink', target: '' },
};

// ---------------------------------------------------------------------------
// Article definitions (converted from articles.ts)
// ---------------------------------------------------------------------------

function p(text)                           { return { _uid: uid(), component: 'body_paragraph', text }; }
function h(text)                           { return { _uid: uid(), component: 'body_heading', text }; }
function q(text, cite)                     { return { _uid: uid(), component: 'body_quote', text, cite }; }
function fig(src, alt, caption)            { return { _uid: uid(), component: 'body_figure', src, alt, caption }; }

const ARTICLES = [
  {
    slug: 'where-the-forest-meets-the-sky',
    name: 'Where the Forest Meets the Sky',
    content: {
      _uid: uid(), component: 'press_article',
      publication: 'Continuum Magazine',
      date: 'May 2026',
      title: 'Where the forest meets the sky',
      dek: "Inside SELVA’s botanical vision — a forty-residence sanctuary that trades height for depth, and views for a sense of living among the trees.",
      byline: 'Marisol Vega',
      read_time: '6 min read',
      lead_image_src: '/images/renders/vision-02.webp',
      lead_image_alt: 'Aerial view of SELVA Residences nestled among the Coconut Grove canopy',
      lead_image_caption: "SELVA Residences, rising three storeys into the Coconut Grove canopy. Artist’s conception.",
      body: [
        p('In a city that has spent two decades reaching ever higher, SELVA Residences makes a quieter argument. Rather than a tower, the project rises just three storeys &mdash; forty residences set deliberately low into the Coconut Grove canopy, where the architecture seems less to command the landscape than to disappear into it.'),
        p('The premise is captured in a single line the developer keeps returning to: <em>where the forest meets the sky</em>. It is a tagline, but it is also a brief. Every decision &mdash; the scale, the planting, the depth of the terraces &mdash; works to keep residents inside the green rather than above it.'),
        h('An argument for staying low'),
        p('Coconut Grove has always been Miami&rsquo;s most wooded enclave, and SELVA treats that as the asset, not the constraint. Across three floors, the building holds three residence models &mdash; designated simply B, C and D &mdash; ranging from compact patio suites to layouts with a den and an outward-facing balcony. The result is intimate by design: a community measured in dozens, not hundreds.'),
        q('&ldquo;We weren&rsquo;t interested in a view you look at from behind glass. We wanted a building you could step into the canopy from.&rdquo;', '&mdash; Banyan Bay Development'),
        p('That ambition shows up most clearly in the way the residences open. Sliding walls dissolve the line between interior and terrace; planting is drawn up and through the structure rather than parked at its base. The effect, walking the model interiors, is of rooms that breathe outward.'),
        fig('/images/renders/exterior-05.webp', 'The rooftop pool terrace above the treetops at SELVA', "The rooftop terrace, where the amenity deck meets open sky. Artist’s conception."),
        h('A different kind of address'),
        p('With pre-sales now open and delivery anticipated in mid-2027, SELVA arrives as a counter-proposal to the glass towers along the bay &mdash; a reminder that, in the Grove, the most luxurious thing on offer may simply be the trees. Whether the market agrees, the building is betting that quiet, for once, is the headline.'),
        p(`The sales gallery is open by appointment. More information is available through the ${PLANPOINT_LINK} on the residences page.`),
      ],
      related: 'forty-residences-rise-among-the-canopy,a-three-storey-sanctuary-in-coconut-grove,the-coastal-edit-selva-opens-pre-sales',
      seo_title: 'Where the Forest Meets the Sky — SELVA Residences',
      seo_description: 'Continuum Magazine on SELVA’s botanical vision — a 40-residence sanctuary rising three storeys into the Coconut Grove canopy.',
    },
  },
  {
    slug: 'forty-residences-rise-among-the-canopy',
    name: 'Forty Residences Rise Among the Canopy',
    content: {
      _uid: uid(), component: 'press_article',
      publication: 'Grove Quarterly',
      date: 'Apr 2026',
      title: 'Forty residences rise among the canopy',
      dek: 'A close look at how SELVA threads forty homes through the treetops of Coconut Grove without ever leaving the green behind.',
      byline: 'Elena Marsh',
      read_time: '5 min read',
      lead_image_src: '/images/renders/exterior-02.webp',
      lead_image_alt: 'SELVA Residences seen through the Coconut Grove tree line',
      lead_image_caption: "The façade reads as part of the tree line rather than an interruption of it. Artist’s conception.",
      body: [
        p('There is a particular kind of restraint at work at SELVA. Where most new Miami developments announce themselves from a distance, this one waits until you are nearly upon it. Forty residences sit across three low storeys, screened by mature canopy that the design treats as a structural partner rather than a backdrop.'),
        p('Walk the site plan and the logic becomes clear. The building steps back where the oldest trees stand, and terraces are notched to follow the line of the branches. Nothing was cleared that did not have to be.'),
        h('Density without the crowd'),
        p('Forty homes is a deliberate number &mdash; large enough to fund the kind of detailing the project wants, small enough that residents are not folded into anonymity. Three models, B, C and D, fan out across the floors, so that no single layout dominates and the community stays mixed.'),
        p('The effect is a building that feels populated but never busy. Corridors are short. Lobbies are quiet. The lift carries you past planting, not signage.'),
        fig('/images/renders/vision-01.webp', 'A SELVA residence opening onto a planted terrace', "Planting is drawn up and through the structure, not parked at its base. Artist’s conception."),
        p(`With pre-sales open and delivery set for mid-2027, SELVA is making a wager that the Grove&rsquo;s buyers want fewer neighbours and more trees. On the evidence of the model interiors, it is a wager worth watching.`),
        p(`Availability and floorplans can be explored through the ${PLANPOINT_LINK} on the residences page.`),
      ],
      related: 'where-the-forest-meets-the-sky,a-three-storey-sanctuary-in-coconut-grove,three-models-one-forest',
      seo_title: 'Forty Residences Rise Among the Canopy — SELVA Residences',
      seo_description: 'Grove Quarterly on how SELVA threads forty homes through the Coconut Grove treetops across three low storeys.',
    },
  },
  {
    slug: 'a-three-storey-sanctuary-in-coconut-grove',
    name: 'A Three-Storey Sanctuary in Coconut Grove',
    content: {
      _uid: uid(), component: 'press_article',
      publication: 'Miami Design Review',
      date: 'Apr 2026',
      title: 'A three-storey sanctuary in Coconut Grove',
      dek: 'On materials, light and the biophilic instinct behind SELVA — a building designed to recede into its corner of the Grove.',
      byline: 'Daniel Roche',
      read_time: '7 min read',
      lead_image_src: '/images/renders/exterior-03.webp',
      lead_image_alt: "Detail of SELVA’s warm-white stone and fluted timber façade",
      lead_image_caption: "Warm-white stone and fluted timber let the architecture recede. Artist’s conception.",
      body: [
        p('Architecture that wants to disappear is harder to make than architecture that wants to be seen. SELVA, the work of Estudio Frondoso, belongs firmly to the first category &mdash; a three-storey building that spends its design budget on not standing out.'),
        p('The palette is the first tell. Warm-white stone, fluted timber and deep eaves trade gloss for grain, so that morning light lands soft rather than sharp. From the street the building reads as part of the forest it sits within.'),
        h('Biophilic, not decorative'),
        p('It would be easy to mistake the planting for styling. It is not. Vertical gardens and terrace plantings, drawn by Ra&iacute;z Landscape Studio, are run through the structure so the landscape matures with the building and softens it year on year.'),
        q('&ldquo;We designed around the canopy rather than above it. The trees were the first clients in the room.&rdquo;', '&mdash; Estudio Frondoso'),
        p("Inside, Taller Lumina&rsquo;s material story carries the same idea indoors: white oak, honed travertine, woven cane and brushed brass, framed by glass that opens to the green. Each room is composed to feel grown rather than installed."),
        fig('/images/renders/interior-02.jpg', 'A SELVA living interior in natural materials opening to planting', "Interiors in white oak, travertine and cane, framed by glass to the canopy. Artist’s conception."),
        p(`Delivery is anticipated in mid-2027. The model residences and full finish schedule can be previewed through the ${PLANPOINT_LINK} on the residences page.`),
      ],
      related: 'where-the-forest-meets-the-sky,forty-residences-rise-among-the-canopy,the-quiet-luxury-of-living-in-the-trees',
      seo_title: 'A Three-Storey Sanctuary in Coconut Grove — SELVA Residences',
      seo_description: "Miami Design Review on the materials, light and biophilic design behind SELVA’s low-rise architecture.",
    },
  },
  {
    slug: 'the-coastal-edit-selva-opens-pre-sales',
    name: 'SELVA Opens Pre-Sales in the Grove',
    content: {
      _uid: uid(), component: 'press_article',
      publication: 'The Coastal Edit',
      date: 'Mar 2026',
      title: 'SELVA opens pre-sales in the Grove',
      dek: 'Pre-sales are now open at SELVA Residences, with forty homes priced from $300K and a sales gallery open by appointment.',
      byline: 'Priya Anand',
      read_time: '4 min read',
      lead_image_src: '/images/renders/interior-01.jpg',
      lead_image_alt: 'A light-filled SELVA living space opening to the canopy',
      lead_image_caption: "A model residence interior, opening to the terrace. Artist’s conception.",
      body: [
        p("SELVA Residences has opened pre-sales, and the Grove now has a new name on its waiting list. The forty-home project, set across three storeys in the heart of Coconut Grove, began private previews this month ahead of an anticipated mid-2027 delivery."),
        p("Pricing starts at $300K, with residences ranging from 575 to 800 square feet across three models. For a Grove address with this level of finish, the entry point is notably accessible &mdash; a fact the sales team appears keen to lead with."),
        h('What buyers are seeing'),
        p("Early visitors are walked through model layouts, finish selections and live availability at the sales gallery on Hibiscus Lane. Rather than a static price sheet, prospective buyers explore floors and units through an interactive tool that updates as homes are reserved."),
        p("It is a quietly modern way to sell a quietly modern building &mdash; less hard sell, more guided tour."),
        fig('/images/renders/kitchen.webp', 'A SELVA kitchen in white oak and travertine', "Kitchens in white oak and honed travertine. Artist’s conception."),
        p(`The sales gallery at 3000 Hibiscus Lane is open by appointment. Floors, units and current availability can be explored through the ${PLANPOINT_LINK} on the residences page.`),
      ],
      related: 'banyan-bay-development-unveils-selva-residences,meridian-residential-leads-selvas-sales-launch,coconut-groves-most-anticipated-new-address',
      seo_title: 'SELVA Opens Pre-Sales in the Grove — SELVA Residences',
      seo_description: "The Coastal Edit on SELVA’s pre-sales launch — forty homes from $300K, with a sales gallery open by appointment in Coconut Grove.",
    },
  },
  {
    slug: 'banyan-bay-development-unveils-selva-residences',
    name: 'Banyan Bay Development Unveils SELVA Residences',
    content: {
      _uid: uid(), component: 'press_article',
      publication: 'Habitat Miami',
      date: 'Mar 2026',
      title: 'Banyan Bay Development unveils SELVA Residences',
      dek: 'The boutique developer behind SELVA on why it chose forty homes over four hundred, and the long view over the quick exit.',
      byline: 'Thomas Reyer',
      read_time: '6 min read',
      lead_image_src: '/images/renders/exterior-04.webp',
      lead_image_alt: 'The SELVA building set low among mature Coconut Grove trees',
      lead_image_caption: "SELVA set deliberately low among the Grove’s mature trees. Artist’s conception.",
      body: [
        p("Banyan Bay Development is not a name that shouts, and that appears to be the point. The boutique developer this month unveiled SELVA Residences, a forty-home project in Coconut Grove that it has shepherded from raw land toward a mid-2027 delivery."),
        p("Founding partner David Calloway frames the company&rsquo;s approach as a deliberate counter to the prevailing model. Fewer homes, finer detailing, and a building made to belong to its street for decades rather than to flip on completion."),
        q('&ldquo;We could have built four hundred units. We built forty, because we wanted something the Grove would still be glad of in thirty years.&rdquo;', '&mdash; David Calloway, Banyan Bay Development'),
        h('The long view'),
        p("That philosophy explains the assembled team: Estudio Frondoso on architecture, Taller Lumina on interiors, Ra&iacute;z Landscape Studio on planting. Each discipline shaped the next, so that structure, interior and landscape read as a single continuous gesture."),
        p("The developer has also leaned into how the project is sold, commissioning a digital experience and interactive floorplan tools so buyers can explore availability before they ever set foot in the gallery."),
        fig('/images/renders/terrace.webp', 'A planted SELVA terrace opening to the canopy', "Terraces notched to follow the line of the branches. Artist’s conception."),
        p(`Pre-sales are open and the gallery is taking appointments. Floorplans and availability can be explored through the ${PLANPOINT_LINK} on the residences page.`),
      ],
      related: 'the-coastal-edit-selva-opens-pre-sales,where-the-forest-meets-the-sky,meridian-residential-leads-selvas-sales-launch',
      seo_title: 'Banyan Bay Development Unveils SELVA Residences',
      seo_description: 'Habitat Miami on Banyan Bay Development and why it chose forty homes over four hundred for SELVA in Coconut Grove.',
    },
  },
  {
    slug: 'the-quiet-luxury-of-living-in-the-trees',
    name: 'The Quiet Luxury of Living in the Trees',
    content: {
      _uid: uid(), component: 'press_article',
      publication: 'Verdant Journal',
      date: 'Feb 2026',
      title: 'The quiet luxury of living in the trees',
      dek: 'What it actually feels like to live at SELVA — a meditation on light, planting and the value of being unhurried.',
      byline: 'Camille Ortega',
      read_time: '5 min read',
      lead_image_src: '/images/renders/balcony.webp',
      lead_image_alt: 'A SELVA balcony framed by planting and canopy',
      lead_image_caption: "A residence balcony, the canopy within reach. Artist’s conception.",
      body: [
        p('Luxury in Miami has long meant elevation &mdash; the higher the floor, the further the view. SELVA proposes something almost contrarian: that the real privilege is to be close to the trees, not above them.'),
        p('Step onto one of its terraces and the argument lands without words. The canopy is within reach. Light arrives filtered and green. The traffic of the city falls away into something closer to birdsong.'),
        h('An unhurried kind of home'),
        p('The interiors, by Taller Lumina, are composed to feel calm rather than impressive. White oak underfoot, travertine that holds the cool, planting never more than a glance away. There is little here that asks to be photographed; there is a great deal that asks to be lived in.'),
        p("It is a register the Grove understands. This has always been Miami&rsquo;s most wooded enclave, the place residents go to slow down. SELVA reads that instinct correctly and builds an entire address around it."),
        fig('/images/renders/interior-03.jpg', 'A calm SELVA interior in natural materials', "Interiors composed to feel calm rather than impressive. Artist’s conception."),
        p(`Forty residences, pre-sales open, delivery mid-2027. The model interiors can be previewed through the ${PLANPOINT_LINK} on the residences page.`),
      ],
      related: 'where-the-forest-meets-the-sky,a-three-storey-sanctuary-in-coconut-grove,coconut-groves-most-anticipated-new-address',
      seo_title: 'The Quiet Luxury of Living in the Trees — SELVA Residences',
      seo_description: 'Verdant Journal on the experience of living at SELVA — light, planting and the value of being unhurried in Coconut Grove.',
    },
  },
  {
    slug: 'meridian-residential-leads-selvas-sales-launch',
    name: "Meridian Residential Leads SELVA’s Sales Launch",
    content: {
      _uid: uid(), component: 'press_article',
      publication: 'South Florida Estates',
      date: 'Feb 2026',
      title: "Meridian Residential leads SELVA’s sales launch",
      dek: 'Inside the boutique sales approach at SELVA — private previews, a Grove gallery, and interactive tools that let buyers explore before they visit.',
      byline: 'Jordan Fields',
      read_time: '5 min read',
      lead_image_src: '/images/renders/interior-04.jpg',
      lead_image_alt: 'A model SELVA residence prepared for private previews',
      lead_image_caption: "A model residence prepared for private previews. Artist’s conception.",
      body: [
        p("Meridian Residential has taken the reins on SELVA&rsquo;s sales launch, and its approach says as much about the building as any rendering. With only forty homes to place, the brokerage has built its process around attention rather than volume."),
        p("Sales director Karen Whitfield leads pre-sales and private previews from the Coconut Grove gallery, guiding residents through floorplans, finishes and the story of the building. Each buyer is accompanied from first visit to closing &mdash; the unhurried, personal service a boutique address allows."),
        h('Selling a building before it stands'),
        p("The team has paired the gallery with an interactive availability tool, so prospective buyers can explore floors and units &mdash; and see what remains &mdash; before they ever book a visit. It compresses the distance between curiosity and commitment."),
        q('&ldquo;With forty homes, every conversation matters. We are not running a queue; we are matching people to the right residence.&rdquo;', '&mdash; Karen Whitfield, Meridian Residential'),
        p("Early demand has been steady, the brokerage reports, with interest concentrated in the larger D model layouts that add a den and an outward-facing balcony."),
        fig('/images/renders/kitchen-wide.webp', 'A wide SELVA kitchen and living space', "A D-model layout, opening kitchen to living to terrace. Artist’s conception."),
        p(`The gallery at 3000 Hibiscus Lane is open by appointment. Current availability can be explored through the ${PLANPOINT_LINK} on the residences page.`),
      ],
      related: 'the-coastal-edit-selva-opens-pre-sales,banyan-bay-development-unveils-selva-residences,three-models-one-forest',
      seo_title: "Meridian Residential Leads SELVA’s Sales Launch",
      seo_description: 'South Florida Estates on the boutique sales approach at SELVA — private previews, a Grove gallery, and interactive availability tools.',
    },
  },
  {
    slug: 'three-models-one-forest',
    name: "Three Models, One Forest",
    content: {
      _uid: uid(), component: 'press_article',
      publication: 'Tropic & Co.',
      date: 'Jan 2026',
      title: "Three models, one forest: SELVA’s approach to scale",
      dek: 'A breakdown of SELVA’s three residence types — B, C and D — and how forty homes stay varied without ever feeling large.',
      byline: 'Lucia Mendes',
      read_time: '6 min read',
      lead_image_src: '/images/renders/vision-01.webp',
      lead_image_alt: 'A SELVA residence and terrace framed by planting',
      lead_image_caption: "Each model is tuned to a different way of living in the canopy. Artist’s conception.",
      body: [
        p('Scale is the quiet problem every boutique development has to solve. Too few layouts and a building feels monotonous; too many and it loses coherence. SELVA settles the question with three: models B, C and D, spread across forty homes and three storeys.'),
        h('B, C and D'),
        p('Model B is the compact patio suite &mdash; the entry layout, opening directly to planting at the lower levels. Model C sits in the middle, a balanced one-bedroom with a generous terrace. Model D is the largest, adding a den and an outward-facing balcony for those who want a little more room to breathe.'),
        p("Residences range from 575 to 800 square feet. Modest on paper, but the depth of the terraces and the reach of the glass make them live larger than the numbers suggest."),
        fig('/images/renders/interior-04.jpg', 'A SELVA model interior opening to a planted terrace', "The depth of the terraces makes the residences live larger than their footprint. Artist’s conception."),
        p("Crucially, the three models are interleaved across the floors rather than stacked by tier. The mix keeps any single layout from dominating a level, and keeps the community varied from the ground up."),
        p(`Pricing starts at $300K, with delivery anticipated mid-2027. The three models can be compared side by side through the ${PLANPOINT_LINK} on the residences page.`),
      ],
      related: 'forty-residences-rise-among-the-canopy,where-the-forest-meets-the-sky,meridian-residential-leads-selvas-sales-launch',
      seo_title: 'Three Models, One Forest — SELVA Residences',
      seo_description: "Tropic & Co. on SELVA’s three residence types — B, C and D — and how forty homes stay varied without feeling large.",
    },
  },
  {
    slug: 'coconut-groves-most-anticipated-new-address',
    name: "Coconut Grove’s Most Anticipated New Address",
    content: {
      _uid: uid(), component: 'press_article',
      publication: 'The Bayfront Review',
      date: 'Jan 2026',
      title: "Coconut Grove’s most anticipated new address",
      dek: 'Why SELVA has the Grove talking — a neighbourhood that prizes trees over towers finally gets a building that agrees.',
      byline: 'Nathan Cole',
      read_time: '5 min read',
      lead_image_src: '/images/renders/bayfront-marina.jpg',
      lead_image_alt: 'The Coconut Grove waterfront near SELVA Residences',
      lead_image_caption: "Coconut Grove, where the waterfront meets the canopy. Artist’s conception.",
      body: [
        p('Ask around Coconut Grove this season and one project keeps surfacing. SELVA Residences has the neighbourhood talking &mdash; not for its height or its price, but for how completely it seems to understand where it is.'),
        p("The Grove has always been Miami&rsquo;s green exception, a place that chose trees over towers long before it was fashionable. For years its new buildings fought that character. SELVA, by contrast, agrees with it."),
        h('A building that fits its street'),
        p('At three storeys and forty homes, the project is scaled to the neighbourhood rather than to the skyline. It sits close to the canopy, steps back for the oldest trees, and keeps its presence on the street deliberately low.'),
        p("That fit is what has locals paying attention. A building that belongs to its corner is rarer here than it should be, and the Grove appears to recognise one when it sees it."),
        fig('/images/renders/amenity-01.jpg', 'A SELVA amenity space opening to the gardens', "Amenity spaces open directly onto the gardens. Artist’s conception."),
        p(`Pre-sales are open ahead of a mid-2027 delivery. The residences and neighbourhood setting can be explored through the ${PLANPOINT_LINK} on the residences page.`),
      ],
      related: 'the-quiet-luxury-of-living-in-the-trees,where-the-forest-meets-the-sky,the-coastal-edit-selva-opens-pre-sales',
      seo_title: "Coconut Grove’s Most Anticipated New Address — SELVA Residences",
      seo_description: 'The Bayfront Review on why SELVA has Coconut Grove talking — a neighbourhood that prizes trees over towers gets a building that agrees.',
    },
  },
];

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

async function getComponentId(name) {
  const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components/?search=${name}`, {
    headers: { Authorization: TOKEN },
  });
  const d = await r.json();
  return d.components?.find(c => c.name === name)?.id ?? null;
}

async function createBlock(def) {
  try {
    // Try to find existing component first
    const existingId = await getComponentId(def.name);

    if (existingId) {
      // Update the existing block (needed to fix is_root on already-created blocks)
      const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components/${existingId}`, {
        method: 'PUT',
        headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify({ component: def }),
      });
      const d = await r.json();
      if (!r.ok) { console.error(`  ✗  update ${def.name}: ${JSON.stringify(d)}`); return; }
      console.log(`  ↺  ${def.name} (updated, id=${existingId})`);
      return;
    }

    const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components/`, {
      method: 'POST',
      headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ component: def }),
    });
    const d = await r.json();
    if (!r.ok) { throw new Error(`${r.status}: ${JSON.stringify(d)}`); }
    console.log(`  ✓  ${def.name} (created)`);
  } catch (e) {
    console.error(`  ✗  ${def.name}: ${e.message}`);
  }
}

async function findStory(slugOrSlugPrefix) {
  const r = await fetch(
    `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories?starts_with=${slugOrSlugPrefix}`,
    { headers: { Authorization: TOKEN } }
  );
  const d = await r.json();
  return d.stories ?? [];
}

async function upsertStory({ story, parentId }) {
  const storyPayload = { ...story };
  if (parentId != null) storyPayload.parent_id = parentId;

  const existing = (await findStory(story.slug === 'press' ? 'press' : `press/${story.slug}`))
    .find(s => s.slug === story.slug && (story.slug === 'press' ? s.parent_id === 0 : true));

  if (existing) {
    console.log(`  ↺  ${story.slug} (updating id=${existing.id})...`);
    const r = await fetch(
      `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${existing.id}`,
      {
        method: 'PUT',
        headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify({ story: storyPayload, publish: 1 }),
      }
    );
    const d = await r.json();
    if (!r.ok) { console.error(`    PUT failed: ${JSON.stringify(d)}`); return null; }
    console.log(`    ✓  updated ${d.story.full_slug}`);
    return d.story;
  }

  console.log(`  +  creating ${story.slug}...`);
  const r = await fetch(
    `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`,
    {
      method: 'POST',
      headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ story: storyPayload, publish: 1 }),
    }
  );
  const d = await r.json();
  if (!r.ok) { console.error(`    POST failed: ${JSON.stringify(d)}`); return null; }
  console.log(`    ✓  created ${d.story.full_slug} (id=${d.story.id})`);
  return d.story;
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!TOKEN) throw new Error('STORYBLOK_PERSONAL_TOKEN not set');

  // Step 1 — Block schemas
  console.log('\nCreating press block schemas...');
  for (const block of BLOCKS) {
    await createBlock(block);
    await sleep(200);
  }

    // Step 2a — Delete the story named "press" we created last run if it exists
  // (it was a content story, not a folder — folders are created differently)
  {
    const existing = (await findStory('press')).find(s => s.slug === 'press' && !s.is_folder);
    if (existing) {
      console.log(`\nDeleting stale "press" content story (id=${existing.id})...`);
      await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${existing.id}`, {
        method: 'DELETE', headers: { Authorization: TOKEN },
      });
      await sleep(400);
    }
  }

  // Step 2b — Create the press/ folder
  console.log('\nCreating press/ folder...');
  let pressParentId;
  {
    const existingFolder = (await findStory('press')).find(s => s.slug === 'press' && s.is_folder);
    if (existingFolder) {
      pressParentId = existingFolder.id;
      console.log(`  –  folder already exists (id=${pressParentId})`);
    } else {
      const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
        method: 'POST',
        headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify({ story: { name: 'Press', slug: 'press', is_folder: true, parent_id: 0 } }),
      });
      const d = await r.json();
      if (!r.ok) { console.error('  Folder creation failed:', d); process.exit(1); }
      pressParentId = d.story.id;
      console.log(`  ✓  folder created (id=${pressParentId})`);
    }
  }
  await sleep(400);

  // Step 2c — Press index story inside the folder (slug = "index" → full_slug = press/index)
  console.log('\nCreating press index story...');
  const indexStory = await upsertStory({
    story: {
      name: 'Press',
      slug: 'index',
      content: pressIndexContent,
    },
    parentId: pressParentId,
  });
  if (!indexStory) { console.error('Failed to create press index story — aborting.'); process.exit(1); }
  console.log(`  Press parent id: ${pressParentId}`);

  // Step 3 — Article stories (nested under press index)
  console.log('\nCreating article stories...');
  for (const art of ARTICLES) {
    await sleep(300); // stay well under rate limit
    await upsertStory({
      story: {
        name: art.name,
        slug: art.slug,
        content: art.content,
      },
      parentId: pressParentId,
    });
  }

  console.log('\nDone. All press stories created/updated in Storyblok.');
}

main().catch(err => { console.error(err); process.exit(1); });
