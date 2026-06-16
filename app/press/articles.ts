// Press data for the SELVA demo.
// The handoff prototype ships one fully-written article; every coverage card
// opens it. Modeled here as a slug-keyed article map so it maps cleanly onto a
// Storyblok `press_article` blok later (one entry per slug).

export const ARTICLE_SLUG = 'where-the-forest-meets-the-sky';

export interface PressCard {
  pub: string;
  date: string;
  title: string;
  slug: string;
  delay?: string;
}

// Index grid — uniform, no featured. Order + delays match the handoff.
export const PRESS_CARDS: PressCard[] = [
  { pub: 'Continuum Magazine', date: 'May 2026', title: 'Where the forest meets the sky', slug: ARTICLE_SLUG },
  { pub: 'Grove Quarterly', date: 'Apr 2026', title: 'Forty residences rise among the canopy', slug: ARTICLE_SLUG, delay: '80' },
  { pub: 'Miami Design Review', date: 'Apr 2026', title: 'A three-storey sanctuary in Coconut Grove', slug: ARTICLE_SLUG, delay: '80' },
  { pub: 'The Coastal Edit', date: 'Mar 2026', title: 'SELVA opens pre-sales in the Grove', slug: ARTICLE_SLUG, delay: '160' },
  { pub: 'Habitat Miami', date: 'Mar 2026', title: 'Banyan Bay Development unveils SELVA Residences', slug: ARTICLE_SLUG },
  { pub: 'Verdant Journal', date: 'Feb 2026', title: 'The quiet luxury of living in the trees', slug: ARTICLE_SLUG, delay: '80' },
  { pub: 'South Florida Estates', date: 'Feb 2026', title: 'Meridian Residential leads SELVA’s sales launch', slug: ARTICLE_SLUG, delay: '160' },
  { pub: 'Tropic & Co.', date: 'Jan 2026', title: 'Three models, one forest: SELVA’s approach to scale', slug: ARTICLE_SLUG },
  { pub: 'The Bayfront Review', date: 'Jan 2026', title: 'Coconut Grove’s most anticipated new address', slug: ARTICLE_SLUG, delay: '80' },
];

export interface Article {
  slug: string;
  pub: string;
  date: string;
  title: string;
  dek: string;
  byline: string; // person name
  readTime: string;
  metaTitle: string;
  metaDescription: string;
  related: PressCard[];
}

export const ARTICLES: Record<string, Article> = {
  [ARTICLE_SLUG]: {
    slug: ARTICLE_SLUG,
    pub: 'Continuum Magazine',
    date: 'May 2026',
    title: 'Where the forest meets the sky',
    dek: 'Inside SELVA’s botanical vision — a forty-residence sanctuary that trades height for depth, and views for a sense of living among the trees.',
    byline: 'Marisol Vega',
    readTime: '6 min read',
    metaTitle: 'Where the Forest Meets the Sky — SELVA Residences',
    metaDescription:
      'Continuum Magazine on SELVA’s botanical vision — a 40-residence sanctuary rising three storeys into the Coconut Grove canopy.',
    related: [
      { pub: 'Grove Quarterly', date: 'Apr 2026', title: 'Forty residences rise among the canopy', slug: ARTICLE_SLUG },
      { pub: 'Miami Design Review', date: 'Apr 2026', title: 'A three-storey sanctuary in Coconut Grove', slug: ARTICLE_SLUG, delay: '80' },
      { pub: 'The Coastal Edit', date: 'Mar 2026', title: 'SELVA opens pre-sales in the Grove', slug: ARTICLE_SLUG, delay: '160' },
    ],
  },
};

export const getArticle = (slug: string): Article | undefined => ARTICLES[slug];
export const getAllSlugs = (): string[] => Object.keys(ARTICLES);
