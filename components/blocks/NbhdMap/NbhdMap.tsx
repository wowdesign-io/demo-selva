'use client'
import dynamic from 'next/dynamic'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { MapPin } from './MapboxMap'

// ssr:false — mapbox-gl uses browser APIs, must not run server-side
const MapboxMap = dynamic(() => import('./MapboxMap'), { ssr: false })

interface MapPoiBlok  { _uid: string; component: 'map_poi';  name: string; type: string; key: string }
interface MapCatBlok  { _uid: string; component: 'map_category'; name: string; color_var: string; pois?: MapPoiBlok[] }
interface MapPinBlok  { _uid: string; component: 'map_pin'; label: string; key: string; lng: number; lat: number; color_var: string }

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

// Real Coconut Grove, Miami coordinates
const DEFAULT_PINS: MapPin[] = [
  { key: 'cafe',     label: 'Sidewalk Café',       lng: -80.2430, lat: 25.7305, colorVar: 'var(--color-accent)'     },
  { key: 'market',   label: 'Open-Air Market',     lng: -80.2448, lat: 25.7278, colorVar: 'var(--color-accent)'     },
  { key: 'bistro',   label: 'Garden Bistro',        lng: -80.2460, lat: 25.7252, colorVar: 'var(--color-accent)'     },
  { key: 'design',   label: 'The Design District', lng: -80.2415, lat: 25.7262, colorVar: 'var(--color-primary)'    },
  { key: 'gallery',  label: 'Gallery Row',          lng: -80.2472, lat: 25.7325, colorVar: 'var(--color-primary)'    },
  { key: 'cinema',   label: 'Open-Air Cinema',      lng: -80.2490, lat: 25.7342, colorVar: 'var(--color-primary)'    },
  { key: 'marina',   label: 'Bayfront Marina',      lng: -80.2505, lat: 25.7232, colorVar: 'var(--color-water)'      },
  { key: 'coast',    label: 'Coastal Park',         lng: -80.2455, lat: 25.7315, colorVar: 'var(--color-water)'      },
  { key: 'sailing',  label: 'Sailing Club',         lng: -80.2522, lat: 25.7210, colorVar: 'var(--color-water)'      },
  { key: 'grocer',   label: 'Boutique Grocer',      lng: -80.2402, lat: 25.7272, colorVar: 'var(--color-text-muted)' },
  { key: 'wellness', label: 'Wellness & Spa',       lng: -80.2498, lat: 25.7255, colorVar: 'var(--color-text-muted)' },
  { key: 'tennis',   label: 'Tennis & Padel',       lng: -80.2510, lat: 25.7292, colorVar: 'var(--color-text-muted)' },
]

export default function NbhdMap({ blok }: { blok?: NbhdMapBlok }) {
  const label      = blok?.label      ?? 'The Map'
  const heading    = blok?.heading    ?? 'Discover the pulse <em>of the Grove</em>'
  const sub        = blok?.sub        ?? 'Hover any place to find it on the map — the everyday pleasures that surround SELVA, all within the neighborhood.'
  const categories = blok?.categories?.length ? blok.categories : DEFAULT_CATEGORIES

  // Always use DEFAULT_PINS — Storyblok schema still has old x/y fields, not lng/lat
  const pins: MapPin[] = DEFAULT_PINS

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

        {/* RIGHT — Mapbox GL map (loaded client-side only) */}
        <div className="nbhd-map__stage" id="nbhdMapStage">
          <div className="nbhd-map__canvas" id="nbhdMapCanvas">
            <MapboxMap pins={pins} />
          </div>
        </div>
      </div>
    </section>
  )
}
