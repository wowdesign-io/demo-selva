import '@/styles/selva/download-grid.css'
import { storyblokEditable } from '@storyblok/react/rsc';

interface SbAsset { filename: string; alt?: string }

interface DownloadCardBlok {
  _uid: string; component: 'download_card'
  icon_type?: 'doc' | 'plan' | 'sheet'
  name?: string; format?: string; desc?: string
  file?: SbAsset
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export interface DownloadsGridBlok {
  _uid: string; component: 'downloads_grid'
  section_label?: string
  cards?: DownloadCardBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

const DocIcon = () => (
  <svg width="30" height="34" viewBox="0 0 30 34" fill="none" stroke="currentColor" strokeWidth="1"><path d="M5 1h13l7 7v25H5z"/><path d="M18 1v7h7"/><path d="M10 19h10M10 24h10M10 14h5"/></svg>
);
const PlanIcon = () => (
  <svg width="30" height="34" viewBox="0 0 30 34" fill="none" stroke="currentColor" strokeWidth="1"><rect x="4" y="2" width="22" height="30"/><path d="M4 12h13M17 2v30M21 18h5M21 24h5"/></svg>
);
const SheetIcon = () => (
  <svg width="30" height="34" viewBox="0 0 30 34" fill="none" stroke="currentColor" strokeWidth="1"><path d="M5 1h13l7 7v25H5z"/><path d="M18 1v7h7"/><path d="M10 16h10M10 21h10M10 26h6"/></svg>
);
const DownloadArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M7 1v10M3 7l4 4 4-4M1 13h12"/></svg>
);

const ICON_MAP = { doc: <DocIcon />, plan: <PlanIcon />, sheet: <SheetIcon /> };

const DEFAULT_CARDS: DownloadCardBlok[] = [
  { _uid: 'd1', component: 'download_card', icon_type: 'doc',   format: 'PDF · 12 pp', name: 'Teaser Brochure',        desc: 'A first look at SELVA — the vision, the architecture and the canopy setting in Coconut Grove.' },
  { _uid: 'd2', component: 'download_card', icon_type: 'doc',   format: 'PDF · 48 pp', name: 'The Residences Brochure', desc: 'The full presentation — residences, finishes, amenities and the three models that make up the building.' },
  { _uid: 'd3', component: 'download_card', icon_type: 'plan',  format: 'PDF · 8 pp',  name: 'Floor Plans',             desc: 'Conceptual layouts for the three models — B, C and D — across the building\'s three storeys.' },
  { _uid: 'd4', component: 'download_card', icon_type: 'sheet', format: 'PDF · 2 pp',  name: 'Fact Sheet',              desc: 'The essentials at a glance — forty residences across three storeys, with delivery scheduled for mid-2027.' },
];

export default function DownloadsGrid({ blok }: { blok?: DownloadsGridBlok }) {
  const sectionLabel = blok?.section_label ?? 'The Collection';
  const cards = blok?.cards?.length ? blok.cards : DEFAULT_CARDS;

  return (
    <section
      className="dl"
      data-screen-label="Downloads"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <p className="dl__sectionLabel reveal">{sectionLabel}</p>
      <div className="dl__grid">
        {cards.map((c, i) => {
          const href = c.file?.filename || '#';
          const delay = i === 0 ? undefined : String(i * 80);
          return (
            <a
              key={c._uid}
              href={href}
              className="dl__card reveal"
              {...(delay ? { 'data-delay': delay } : {})}
              {...(storyblokEditable(c))}
            >
              <div className="dl__cardTop">
                <span className="dl__icon" aria-hidden="true">
                  {ICON_MAP[c.icon_type ?? 'doc']}
                </span>
                <span className="dl__format">{c.format ?? ''}</span>
              </div>
              <h2 className="dl__name">{c.name ?? ''}</h2>
              <p className="dl__desc">{c.desc ?? ''}</p>
              <span className="dl__action">Download <DownloadArrow /></span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
