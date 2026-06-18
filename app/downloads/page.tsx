import type { Metadata } from 'next';
import HomeScript from '../../components/ui/HomeScript/HomeScript';

export const metadata: Metadata = {
  title: 'Downloads — SELVA Residences',
  description:
    'Brochures, conceptual floor plans and the essentials for SELVA Residences — all in one place.',
};

const DocIcon = () => (
  <svg width="30" height="34" viewBox="0 0 30 34" fill="none" stroke="currentColor" strokeWidth="1"><path d="M5 1h13l7 7v25H5z"></path><path d="M18 1v7h7"></path><path d="M10 19h10M10 24h10M10 14h5"></path></svg>
);
const PlanIcon = () => (
  <svg width="30" height="34" viewBox="0 0 30 34" fill="none" stroke="currentColor" strokeWidth="1"><rect x="4" y="2" width="22" height="30"></rect><path d="M4 12h13M17 2v30M21 18h5M21 24h5"></path></svg>
);
const SheetIcon = () => (
  <svg width="30" height="34" viewBox="0 0 30 34" fill="none" stroke="currentColor" strokeWidth="1"><path d="M5 1h13l7 7v25H5z"></path><path d="M18 1v7h7"></path><path d="M10 16h10M10 21h10M10 26h6"></path></svg>
);
const DownloadArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M7 1v10M3 7l4 4 4-4M1 13h12"></path></svg>
);

const CARDS = [
  { icon: <DocIcon />, format: 'PDF · 12 pp', name: 'Teaser Brochure', desc: 'A first look at SELVA — the vision, the architecture and the canopy setting in Coconut Grove.', delay: undefined },
  { icon: <DocIcon />, format: 'PDF · 48 pp', name: 'The Residences Brochure', desc: 'The full presentation — residences, finishes, amenities and the three models that make up the building.', delay: '80' },
  { icon: <PlanIcon />, format: 'PDF · 8 pp', name: 'Floor Plans', desc: 'Conceptual layouts for the three models — B, C and D — across the building’s three storeys.', delay: '160' },
  { icon: <SheetIcon />, format: 'PDF · 2 pp', name: 'Fact Sheet', desc: 'The essentials at a glance — forty residences across three storeys, with delivery scheduled for mid-2027.', delay: '240' },
];

export default function DownloadsPage() {
  return (
    <>
      <main>

        {/* ============ MASTHEAD ============ */}
        <header className="doc-head" data-screen-label="Downloads Header">
          <div className="doc-head__inner">
            <p className="doc-head__label reveal">SELVA Residences &middot; Coconut Grove</p>
            <h1 className="doc-head__title reveal" data-delay="80">Downloads</h1>
            <div className="doc-head__rule reveal" data-delay="160"></div>
            <p className="doc-head__lead reveal" data-delay="200">A small library of resources to guide your pre-sales journey &mdash; the brochures, conceptual floor plans and the essentials, all in one place.</p>
          </div>
        </header>

        {/* ============ DOWNLOAD CARDS ============ */}
        <section className="dl" data-screen-label="Downloads">
          <p className="dl__sectionLabel reveal">The Collection</p>
          <div className="dl__grid">
            {CARDS.map((c) => (
              <a key={c.name} href="#" className="dl__card reveal" {...(c.delay ? { 'data-delay': c.delay } : {})}>
                <div className="dl__cardTop">
                  <span className="dl__icon" aria-hidden="true">{c.icon}</span>
                  <span className="dl__format">{c.format}</span>
                </div>
                <h2 className="dl__name">{c.name}</h2>
                <p className="dl__desc">{c.desc}</p>
                <span className="dl__action">Download <DownloadArrow /></span>
              </a>
            ))}
          </div>
        </section>

        {/* ============ REQUEST BAND ============ */}
        <section className="dl-request" data-screen-label="Downloads Request">
          <div className="dl-request__inner">
            <div className="dl-request__copy">
              <p className="dl-request__label reveal">By Request</p>
              <h2 className="dl-request__heading reveal" data-delay="100">Looking for something <em>specific?</em></h2>
            </div>
            <div className="dl-request__actions reveal" data-delay="160">
              <a href="mailto:sales@selvaresidences.com" className="btnSlide">
                <span>Email Sales</span><span aria-hidden="true">Email Sales</span>
              </a>
              <a href="/residences#digital-twin" className="btnSlide btnSlide--amber">
                <span>Explore Floorplans</span><span aria-hidden="true">Explore Floorplans</span>
              </a>
            </div>
          </div>
        </section>

      </main>
      <HomeScript />
    </>
  );
}
