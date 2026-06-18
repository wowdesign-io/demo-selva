import { storyblokEditable } from '@storyblok/react/rsc'

interface FeatureItemBlok { _uid: string; component: 'feature_item'; icon_name?: string; title?: string; desc?: string }
export interface ResFeaturesGridBlok {
  _uid: string; component: 'res_features_grid'
  items?: FeatureItemBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'floor-glass': (<><rect x="6" y="4" width="13" height="36" /><line x1="6" y1="22" x2="19" y2="22" /><rect x="25" y="4" width="13" height="36" /><line x1="25" y1="22" x2="38" y2="22" /></>),
  'terrace':     (<><line x1="4" y1="38" x2="40" y2="38" /><line x1="4" y1="14" x2="40" y2="14" /><line x1="12" y1="14" x2="12" y2="38" /><line x1="22" y1="14" x2="22" y2="38" /><line x1="32" y1="14" x2="32" y2="38" /></>),
  'kitchen':     (<><rect x="5" y="10" width="34" height="26" rx="1" /><circle cx="16" cy="21" r="5" /><circle cx="28" cy="21" r="5" /><circle cx="16" cy="31" r="3" /><circle cx="28" cy="31" r="3" /></>),
  'bath':        (<><polyline points="10,8 10,18 30,18" /><rect x="26" y="13" width="12" height="9" rx="2" /><line x1="30" y1="28" x2="27" y2="38" /><line x1="34" y1="26" x2="31" y2="38" /><line x1="38" y1="28" x2="35" y2="38" /></>),
  'flooring':    (<><rect x="4" y="8" width="36" height="8" /><rect x="4" y="18" width="36" height="8" /><rect x="4" y="28" width="36" height="8" /><line x1="22" y1="8" x2="22" y2="16" /><line x1="14" y1="18" x2="14" y2="26" /><line x1="28" y1="28" x2="28" y2="36" /></>),
  'closet':      (<><rect x="4" y="6" width="36" height="34" /><line x1="22" y1="6" x2="22" y2="40" /><line x1="6" y1="16" x2="20" y2="16" /><line x1="24" y1="16" x2="38" y2="16" /><circle cx="13" cy="12" r="3" /><circle cx="31" cy="12" r="3" /></>),
  'laundry':     (<><rect x="6" y="6" width="32" height="32" rx="2" /><circle cx="22" cy="26" r="9" /><circle cx="22" cy="26" r="5" /><circle cx="12" cy="13" r="1.5" fill="currentColor" stroke="none" /><circle cx="18" cy="13" r="1.5" fill="currentColor" stroke="none" /></>),
  'wine':        (<><path d="M17 40 L27 40" /><line x1="22" y1="40" x2="22" y2="29" /><path d="M16 29 Q12 22 12 16 L12 9 Q12 6 22 6 Q32 6 32 9 L32 16 Q32 22 28 29 Z" /><line x1="12" y1="22" x2="32" y2="22" /></>),
}

const DEFAULTS: FeatureItemBlok[] = [
  { _uid: 'f1', component: 'feature_item', icon_name: 'floor-glass', title: 'Floor-to-Ceiling Glass', desc: 'Impact-rated windows and sliding glass balcony doors throughout every residence' },
  { _uid: 'f2', component: 'feature_item', icon_name: 'terrace',     title: 'Private Ocean Terrace',  desc: 'Fully tiled balconies with frameless glass railings — accessible from living room and primary bedroom' },
  { _uid: 'f3', component: 'feature_item', icon_name: 'kitchen',     title: "Chef's Kitchen",         desc: 'Thermador & Bosch appliances, stone island, custom cabinetry in every suite' },
  { _uid: 'f4', component: 'feature_item', icon_name: 'bath',        title: 'Spa Primary Bath',        desc: 'Rain showers, double vanities, stone countertops and porcelain tile floor to ceiling' },
  { _uid: 'f5', component: 'feature_item', icon_name: 'flooring',    title: 'Engineered Flooring',     desc: 'Wide-plank oak in bedrooms; large-format porcelain throughout living areas' },
  { _uid: 'f6', component: 'feature_item', icon_name: 'closet',      title: 'Custom Closet Systems',   desc: 'Fully built-out wardrobe configurations designed for every suite' },
  { _uid: 'f7', component: 'feature_item', icon_name: 'laundry',     title: 'In-Unit Laundry',         desc: 'Dedicated laundry room with full-size washer & dryer in every residence' },
  { _uid: 'f8', component: 'feature_item', icon_name: 'wine',        title: 'Wine Storage',            desc: 'Integrated wine coolers in select residences' },
]

// Staggered reveal delays matching the original per-row pattern
const DELAYS = [undefined, 60, 120, 180, 60, 120, 180, 240]

export default function ResidenceFeatures({ blok }: { blok?: ResFeaturesGridBlok }) {
  const items = blok?.items?.length ? blok.items : DEFAULTS

  return (
    <section className="res-feat" data-screen-label="Residence Features" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="res-feat__inner">
        <div className="res-feat__header reveal">
          <div>
            <p className="res-feat__overline">Every Residence</p>
            <h2 className="res-feat__heading">Crafted to<br />the Last Detail</h2>
          </div>
          <p className="res-feat__lead">Unit-specific finishes selected for longevity, comfort, and an unmistakable sense of place.</p>
        </div>
        <div className="icon-grid icon-grid--spec icon-grid--cols-4 res-feat__grid">
          {items.map((item, i) => (
            <div
              key={item._uid}
              className="icon-grid__item reveal"
              {...(DELAYS[i] !== undefined ? { 'data-delay': String(DELAYS[i]) } : {})}
            >
              <svg
                className="icon-grid__icon"
                viewBox="0 0 44 44"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICON_MAP[item.icon_name ?? ''] ?? null}
              </svg>
              <p className="icon-grid__name">{item.title}</p>
              <p className="icon-grid__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
