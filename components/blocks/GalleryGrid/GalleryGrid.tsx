'use client';

import '@/styles/selva/gallery.css'
import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react';

interface SbAsset { filename: string; alt?: string }

interface GalleryFilterBlok {
  _uid: string; component: 'gallery_filter'
  cat?: string; label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

interface GalleryItemBlok {
  _uid: string; component: 'gallery_item'
  src?: SbAsset; alt?: string; cat?: string
  aspect_ratio?: string; cap_cat?: string; cap_name?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export interface GalleryGridBlok {
  _uid: string; component: 'gallery_grid_block'
  label?: string; heading?: string
  filters?: GalleryFilterBlok[]
  items?: GalleryItemBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

// Transforms a Storyblok CDN URL to serve a WebP at max 1800px, quality 80.
// Marketing teams upload raw files; this ensures they're compressed before delivery.
function sbImg(url: string): string {
  if (!url || !url.includes('a.storyblok.com')) return url;
  return `${url}/m/1800x0/filters:quality(80):format(webp)`;
}

// Hardcoded defaults — used when Storyblok story has no items (dev safety net)
const DEFAULT_FILTERS = [
  { cat: 'all',      label: 'All' },
  { cat: 'exterior', label: 'Exteriors' },
  { cat: 'interior', label: 'Interiors' },
  { cat: 'amenity',  label: 'Amenities' },
  { cat: 'grove',    label: 'The Grove' },
];

const DEFAULT_ITEMS = [
  { src: '/images/renders/exterior-02.webp',            cat: 'exterior', ar: '2752/1536', alt: 'Twilight facade among the canopy',                 capCat: 'Exterior',  capName: 'Twilight Facade' },
  { src: '/images/renders/terrace.webp',                cat: 'interior', ar: '1792/2400', alt: 'Patio suite opening to a planted terrace',         capCat: 'Interior',  capName: 'Patio Suite' },
  { src: '/images/amenities/pool-deck.webp',            cat: 'amenity',  ar: '1792/2400', alt: 'Infinity pool terrace above the canopy',           capCat: 'Amenity',   capName: 'Pool Terrace' },
  { src: '/images/neighborhood/cultural-district.webp', cat: 'grove',    ar: '2816/1536', alt: 'The design quarter at golden hour',                 capCat: 'The Grove', capName: 'The Design Quarter' },
  { src: '/images/renders/balcony.webp',                cat: 'interior', ar: '1792/2400', alt: 'Den suite with ocean-view balcony',                capCat: 'Interior',  capName: 'Ocean-View Den' },
  { src: '/images/renders/exterior-04.webp',            cat: 'exterior', ar: '1792/2400', alt: 'Architecture wrapped in the Coconut Grove canopy', capCat: 'Exterior',  capName: 'Canopy Facade' },
  { src: '/images/amenities/sky-terrace.webp',          cat: 'amenity',  ar: '1792/2400', alt: 'Rooftop sky terrace at dusk',                      capCat: 'Amenity',   capName: 'Sky Terrace' },
  { src: '/images/renders/kitchen-wide.webp',           cat: 'interior', ar: '2752/1536', alt: 'Open oak kitchen with travertine island',          capCat: 'Interior',  capName: 'Open Kitchen' },
  { src: '/images/neighborhood/bayfront-marina.webp',   cat: 'grove',    ar: '2816/1536', alt: 'Bayfront marina lined with sailboats',              capCat: 'The Grove', capName: 'Bayfront Marina' },
  { src: '/images/amenities/spa-room.webp',             cat: 'amenity',  ar: '1792/2400', alt: 'Wellness spa treatment room',                      capCat: 'Amenity',   capName: 'Wellness Spa' },
  { src: '/images/renders/vision-02.webp',              cat: 'exterior', ar: '1376/768',  alt: 'Aerial view of SELVA among the treetops',          capCat: 'Exterior',  capName: 'Among the Canopy' },
  { src: '/images/amenities/lounge.webp',               cat: 'amenity',  ar: '1792/2400', alt: "Residents' lounge with living greenery",           capCat: 'Amenity',   capName: "Residents' Lounge" },
  { src: '/images/renders/bathroom.webp',               cat: 'interior', ar: '1792/2400', alt: 'Primary bath with oak vanity and palm views',      capCat: 'Interior',  capName: 'Primary Bath' },
  { src: '/images/neighborhood/sidewalk-storefronts.webp', cat: 'grove', ar: '2816/1536', alt: 'Tree-lined sidewalks and storefronts',             capCat: 'The Grove', capName: 'Grove Sidewalks' },
  { src: '/images/amenities/garden-courtyard.webp',     cat: 'amenity',  ar: '1792/2400', alt: 'Botanical garden courtyard',                       capCat: 'Amenity',   capName: 'Garden Courtyard' },
  { src: '/images/renders/kitchen.webp',                cat: 'interior', ar: '1792/2400', alt: 'Kitchen detail in warm oak and stone',             capCat: 'Interior',  capName: 'The Kitchen' },
  { src: '/images/neighborhood/outdoor-dining.webp',    cat: 'grove',    ar: '2816/1536', alt: 'Garden dining under string lights',                capCat: 'The Grove', capName: 'Garden Dining' },
  { src: '/images/amenities/fitness.webp',              cat: 'amenity',  ar: '1792/2400', alt: 'Fitness studio facing a vertical garden',          capCat: 'Amenity',   capName: 'Fitness Studio' },
  { src: '/images/renders/exterior-05.webp',            cat: 'amenity',  ar: '2752/1536', alt: 'Rooftop pool above the treetops',                  capCat: 'Amenity',   capName: 'Rooftop Pool' },
  { src: '/images/amenities/coworking-library.webp',    cat: 'amenity',  ar: '1792/2400', alt: 'Oak-panelled library and co-working room',         capCat: 'Amenity',   capName: 'Library & Co-Work' },
  { src: '/images/renders/vision-01.webp',              cat: 'interior', ar: '1376/768',  alt: 'Living space opening to a botanical terrace',      capCat: 'Interior',  capName: 'Garden Terrace' },
];

export default function GalleryGrid({ blok }: { blok?: GalleryGridBlok }) {
  const [active, setActive] = useState('all');

  const label   = blok?.label   ?? 'The Gallery';
  const heading = blok?.heading ?? 'Forty residences,<br />one botanical world';

  // Use Storyblok filters when present, otherwise fall back to defaults
  const filters = blok?.filters?.length
    ? blok.filters.map(f => ({ cat: f.cat ?? '', label: f.label ?? '' }))
    : DEFAULT_FILTERS;

  // Use Storyblok items when present, otherwise fall back to defaults.
  // Content team adds / removes / reorders gallery_item bloks in Storyblok editor.
  const items = blok?.items?.length
    ? blok.items.map(it => ({
        src:    sbImg(it.src?.filename || ''),
        cat:    it.cat     ?? 'exterior',
        alt:    it.alt     ?? '',
        capCat: it.cap_cat ?? '',
        capName:it.cap_name ?? '',
        key:    it._uid,
      }))
    : DEFAULT_ITEMS.map(it => ({ src: it.src, cat: it.cat, alt: it.alt, capCat: it.capCat, capName: it.capName, key: it.src }));

  return (
    <section
      className="gallery"
      data-screen-label="Gallery"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <div className="gallery__head">
        <div className="gallery__intro">
          <span className="gallery__label reveal">{label}</span>
          {/* heading supports inline HTML e.g. <br /> */}
          <h2
            className="gallery__heading reveal"
            data-delay="100"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        </div>
        <div className="gallery__filters reveal" data-delay="160" role="group" aria-label="Filter gallery">
          {filters.map((f) => (
            <button
              key={f.cat}
              className={`gallery__filter${active === f.cat ? ' is-active' : ''}`}
              onClick={() => setActive(f.cat)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="gallery__grid" id="galleryGrid">
        {items.map((it) => {
          const hidden = active !== 'all' && it.cat !== active;
          return (
            <figure
              key={it.key}
              className={`gallery__item${hidden ? ' is-hidden' : ''}`}
              data-cat={it.cat}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt={it.alt} loading="lazy" decoding="async" />
              <figcaption className="gallery__cap">
                <span className="gallery__capCat">{it.capCat}</span>
                <span className="gallery__capName">{it.capName}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
