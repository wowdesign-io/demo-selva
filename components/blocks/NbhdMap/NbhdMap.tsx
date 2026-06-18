import { storyblokEditable } from '@storyblok/react/rsc'

interface MapPoiBlok  { _uid: string; component: 'map_poi';  name: string; type: string; key: string }
interface MapCatBlok  { _uid: string; component: 'map_category'; name: string; color_var: string; pois?: MapPoiBlok[] }
interface MapPinBlok  { _uid: string; component: 'map_pin'; label: string; key: string; x: number; y: number; color_var: string }

export interface NbhdMapBlok {
  _uid: string; component: 'nbhd_map'
  label?: string; heading?: string; sub?: string
  categories?: MapCatBlok[]
  pins?: MapPinBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

const DEFAULT_CATEGORIES: MapCatBlok[] = [
  { _uid: 'c1', component: 'map_category', name: 'Dining & Cafés', color_var: 'var(--color-accent)',
    pois: [
      { _uid: 'p1', component: 'map_poi', key: 'cafe',   name: 'Sidewalk Café',    type: 'Coffee' },
      { _uid: 'p2', component: 'map_poi', key: 'market', name: 'Open-Air Market', type: 'Market' },
      { _uid: 'p3', component: 'map_poi', key: 'bistro', name: 'Garden Bistro',   type: 'Dining' },
    ]},
  { _uid: 'c2', component: 'map_category', name: 'Design & Culture', color_var: 'var(--color-primary)',
    pois: [
      { _uid: 'p4', component: 'map_poi', key: 'design',  name: 'The Design District', type: 'Design' },
      { _uid: 'p5', component: 'map_poi', key: 'gallery', name: 'Gallery Row',          type: 'Art'    },
      { _uid: 'p6', component: 'map_poi', key: 'cinema',  name: 'Open-Air Cinema',      type: 'Film'   },
    ]},
  { _uid: 'c3', component: 'map_category', name: 'Bay & Outdoors', color_var: 'var(--color-water)',
    pois: [
      { _uid: 'p7', component: 'map_poi', key: 'marina',  name: 'Bayfront Marina', type: 'Boating' },
      { _uid: 'p8', component: 'map_poi', key: 'coast',   name: 'Coastal Park',    type: 'Park'    },
      { _uid: 'p9', component: 'map_poi', key: 'sailing', name: 'Sailing Club',    type: 'Sailing' },
    ]},
  { _uid: 'c4', component: 'map_category', name: 'Everyday Essentials', color_var: 'var(--color-text-muted)',
    pois: [
      { _uid: 'p10', component: 'map_poi', key: 'grocer',   name: 'Boutique Grocer', type: 'Grocery' },
      { _uid: 'p11', component: 'map_poi', key: 'wellness', name: 'Wellness & Spa',  type: 'Spa'     },
      { _uid: 'p12', component: 'map_poi', key: 'tennis',   name: 'Tennis & Padel',  type: 'Sport'   },
    ]},
]

const DEFAULT_PINS: MapPinBlok[] = [
  { _uid: 'n1',  component: 'map_pin', key: 'cafe',     x: 38, y: 30, color_var: 'var(--color-accent)',    label: 'Sidewalk Café' },
  { _uid: 'n2',  component: 'map_pin', key: 'market',   x: 66, y: 24, color_var: 'var(--color-accent)',    label: 'Open-Air Market' },
  { _uid: 'n3',  component: 'map_pin', key: 'bistro',   x: 70, y: 62, color_var: 'var(--color-accent)',    label: 'Garden Bistro' },
  { _uid: 'n4',  component: 'map_pin', key: 'design',   x: 60, y: 40, color_var: 'var(--color-primary)',   label: 'The Design District' },
  { _uid: 'n5',  component: 'map_pin', key: 'gallery',  x: 74, y: 46, color_var: 'var(--color-primary)',   label: 'Gallery Row' },
  { _uid: 'n6',  component: 'map_pin', key: 'cinema',   x: 44, y: 66, color_var: 'var(--color-primary)',   label: 'Open-Air Cinema' },
  { _uid: 'n7',  component: 'map_pin', key: 'marina',   x: 17, y: 60, color_var: 'var(--color-water)',     label: 'Bayfront Marina' },
  { _uid: 'n8',  component: 'map_pin', key: 'coast',    x: 25, y: 36, color_var: 'var(--color-water)',     label: 'Coastal Park' },
  { _uid: 'n9',  component: 'map_pin', key: 'sailing',  x: 13, y: 76, color_var: 'var(--color-water)',     label: 'Sailing Club' },
  { _uid: 'n10', component: 'map_pin', key: 'grocer',   x: 50, y: 22, color_var: 'var(--color-text-muted)', label: 'Boutique Grocer' },
  { _uid: 'n11', component: 'map_pin', key: 'wellness', x: 58, y: 72, color_var: 'var(--color-text-muted)', label: 'Wellness & Spa' },
  { _uid: 'n12', component: 'map_pin', key: 'tennis',   x: 82, y: 66, color_var: 'var(--color-text-muted)', label: 'Tennis & Padel' },
]

export default function NbhdMap({ blok }: { blok?: NbhdMapBlok }) {
  const label      = blok?.label      ?? 'The Map'
  const heading    = blok?.heading    ?? 'Discover the pulse <em>of the Grove</em>'
  const sub        = blok?.sub        ?? 'Hover any place to find it on the map — the everyday pleasures that surround SELVA, all within the neighborhood.'
  const categories = blok?.categories?.length ? blok.categories : DEFAULT_CATEGORIES
  const pins       = blok?.pins?.length        ? blok.pins       : DEFAULT_PINS

  return (
    <section
      className="nbhd-map-section"
      data-screen-label="Neighborhood Map"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <div className="nbhd-map-head">
        <span className="nbhd-map-head__label reveal">{label}</span>
        <h2
          className="nbhd-map-head__title reveal"
          data-delay="100"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
        <p className="nbhd-map-head__sub reveal" data-delay="180">{sub}</p>
      </div>

      <div className="nbhd-map">
        {/* LEFT — categorized POI lists */}
        <div className="nbhd-map__lists" id="nbhdMapLists">
          {categories.map((cat) => (
            <div key={cat._uid} className="nbhd-cat">
              <div className="nbhd-cat__head">
                <span className="nbhd-cat__dot" style={{ background: cat.color_var }}></span>
                <span className="nbhd-cat__name">{cat.name}</span>
              </div>
              {(cat.pois ?? []).map((poi) => (
                <button key={poi._uid} className="nbhd-poi" data-key={poi.key}>
                  <span className="nbhd-poi__name">{poi.name}</span>
                  <span className="nbhd-poi__type">{poi.type}</span>
                </button>
              ))}
            </div>
          ))}
          <p className="nbhd-map__hint">Hover a place to locate it &rarr;</p>
        </div>

        {/* RIGHT — schematic map stage (SVG art stays hardcoded — only data is CMS-driven) */}
        <div className="nbhd-map__stage" id="nbhdMapStage">
          <div className="nbhd-map__canvas" id="nbhdMapCanvas">

            <svg className="nmap-svg" viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
              <path className="nmap-bay" d="M0,0 L26,0 C24,6 20,10 22,16 C24,22 18,28 20,34 C22,40 15,46 18,52 C21,58 14,64 17,70 C19,75 15,78 17,80 L0,80 Z"></path>
              <path className="nmap-coast" d="M26,0 C24,6 20,10 22,16 C24,22 18,28 20,34 C22,40 15,46 18,52 C21,58 14,64 17,70 C19,75 15,78 17,80"></path>
              <g className="nmap-blk">
                <rect x="54" y="14" width="11" height="10" rx="0.6"></rect>
                <rect x="67" y="26" width="10" height="11" rx="0.6"></rect>
                <rect x="42" y="26" width="11" height="9" rx="0.6"></rect>
                <rect x="79" y="38" width="10" height="11" rx="0.6"></rect>
                <rect x="42" y="52" width="10" height="11" rx="0.6"></rect>
                <rect x="79" y="62" width="11" height="11" rx="0.6"></rect>
                <rect x="54" y="62" width="10" height="9" rx="0.6"></rect>
              </g>
              <rect className="nmap-dist" x="56" y="28" width="22" height="16" rx="1"></rect>
              <rect className="nmap-green" x="22" y="22" width="12" height="13" rx="2"></rect>
              <rect className="nmap-green" x="46" y="9" width="20" height="11" rx="2"></rect>
              <rect className="nmap-green" x="60" y="48" width="17" height="24" rx="2"></rect>
              <g className="nmap-st">
                <line x1="32" y1="0" x2="32" y2="80"></line>
                <line x1="42" y1="0" x2="42" y2="80"></line>
                <line x1="54" y1="0" x2="54" y2="80"></line>
                <line x1="66" y1="0" x2="66" y2="80"></line>
                <line x1="78" y1="0" x2="78" y2="80"></line>
                <line x1="90" y1="0" x2="90" y2="80"></line>
                <line x1="26" y1="14" x2="100" y2="14"></line>
                <line x1="24" y1="26" x2="100" y2="26"></line>
                <line x1="22" y1="38" x2="100" y2="38"></line>
                <line x1="20" y1="50" x2="100" y2="50"></line>
                <line x1="22" y1="62" x2="100" y2="62"></line>
                <line x1="24" y1="74" x2="100" y2="74"></line>
              </g>
              <line className="nmap-st--maj" x1="30" y1="80" x2="98" y2="8"></line>
              <path className="nmap-drive" d="M31,1 C29,11 26,21 29,31 C32,41 27,51 30,61 C32,69 30,76 32,80"></path>
              <g className="nmap-pier">
                <line x1="14" y1="46" x2="20" y2="46"></line>
                <line x1="13" y1="49" x2="21" y2="49"></line>
                <line x1="14" y1="52" x2="20" y2="52"></line>
              </g>
              <rect className="nmap-parcel" x="46" y="37" width="12" height="13" rx="1"></rect>
              <text className="nmap-t-bay" x="8.5" y="44" transform="rotate(-90 8.5 44)" fontSize="3" letterSpacing="1.4">BISCAYNE BAY</text>
              <text className="nmap-t-dist" x="40" y="69" fontSize="3.4" letterSpacing="1.2">THE GROVE</text>
              <text className="nmap-t-dist" x="57.5" y="26.6" fontSize="1.7" letterSpacing="0.5">DESIGN QUARTER</text>
              <text className="nmap-t-st" x="33" y="6.5" fontSize="1.5" letterSpacing="0.4">BAYSHORE DR</text>
              <text className="nmap-t-st" x="68" y="37" fontSize="1.5" letterSpacing="0.4">GRAND AVENUE</text>
              <text className="nmap-t-st" x="80" y="73" fontSize="1.5" letterSpacing="0.4">PARK LANE</text>
              <line className="nmap-compass-line" x1="94" y1="6" x2="94" y2="12"></line>
              <text className="nmap-compass" x="92.6" y="5" fontSize="2.4">N</text>
            </svg>

            <div className="nmap-home">
              <span className="nmap-home__glyph"></span>
              <span className="nmap-home__label">SELVA</span>
            </div>

            {pins.map((pin) => (
              <div
                key={pin._uid}
                className="nmap-pin"
                data-key={pin.key}
                data-x={pin.x}
                data-y={pin.y}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                <span className="nmap-pin__dot" style={{ background: pin.color_var }}></span>
                <span className="nmap-pin__label">{pin.label}</span>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  )
}
