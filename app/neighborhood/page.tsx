import type { Metadata } from 'next';
import HomeScript from '../../components/ui/HomeScript/HomeScript';
import NeighborhoodScript from '../../components/blocks/NeighborhoodScript/NeighborhoodScript';

export const metadata: Metadata = {
  title: 'The Neighborhood — SELVA Residences',
  description:
    "Rooted in Coconut Grove — where Miami's oldest canopy meets the bay, the galleries and the marina. The neighborhood around SELVA Residences.",
};

const CATEGORIES = [
  {
    color: 'var(--color-accent)',
    name: 'Dining & Cafés',
    pois: [
      { key: 'cafe', name: 'Sidewalk Café', type: 'Coffee' },
      { key: 'market', name: 'Open-Air Market', type: 'Market' },
      { key: 'bistro', name: 'Garden Bistro', type: 'Dining' },
    ],
  },
  {
    color: 'var(--color-primary)',
    name: 'Design & Culture',
    pois: [
      { key: 'design', name: 'The Design District', type: 'Design' },
      { key: 'gallery', name: 'Gallery Row', type: 'Art' },
      { key: 'cinema', name: 'Open-Air Cinema', type: 'Film' },
    ],
  },
  {
    color: 'var(--color-water)',
    name: 'Bay & Outdoors',
    pois: [
      { key: 'marina', name: 'Bayfront Marina', type: 'Boating' },
      { key: 'coast', name: 'Coastal Park', type: 'Park' },
      { key: 'sailing', name: 'Sailing Club', type: 'Sailing' },
    ],
  },
  {
    color: 'var(--color-text-muted)',
    name: 'Everyday Essentials',
    pois: [
      { key: 'grocer', name: 'Boutique Grocer', type: 'Grocery' },
      { key: 'wellness', name: 'Wellness & Spa', type: 'Spa' },
      { key: 'tennis', name: 'Tennis & Padel', type: 'Sport' },
    ],
  },
];

const PINS = [
  { key: 'cafe', x: 38, y: 30, color: 'var(--color-accent)', label: 'Sidewalk Café' },
  { key: 'market', x: 66, y: 24, color: 'var(--color-accent)', label: 'Open-Air Market' },
  { key: 'bistro', x: 70, y: 62, color: 'var(--color-accent)', label: 'Garden Bistro' },
  { key: 'design', x: 60, y: 40, color: 'var(--color-primary)', label: 'The Design District' },
  { key: 'gallery', x: 74, y: 46, color: 'var(--color-primary)', label: 'Gallery Row' },
  { key: 'cinema', x: 44, y: 66, color: 'var(--color-primary)', label: 'Open-Air Cinema' },
  { key: 'marina', x: 17, y: 60, color: 'var(--color-water)', label: 'Bayfront Marina' },
  { key: 'coast', x: 25, y: 36, color: 'var(--color-water)', label: 'Coastal Park' },
  { key: 'sailing', x: 13, y: 76, color: 'var(--color-water)', label: 'Sailing Club' },
  { key: 'grocer', x: 50, y: 22, color: 'var(--color-text-muted)', label: 'Boutique Grocer' },
  { key: 'wellness', x: 58, y: 72, color: 'var(--color-text-muted)', label: 'Wellness & Spa' },
  { key: 'tennis', x: 82, y: 66, color: 'var(--color-text-muted)', label: 'Tennis & Padel' },
];

const STORY = [
  {
    img: '/images/neighborhood/sidewalk-storefronts.webp',
    num: '01 — The Morning',
    title: <>Sidewalk <em>mornings</em></>,
    paras: [
      'The Grove wakes slowly. Light filters through the oak and banyan canopy onto narrow, walkable streets, and the neighborhood’s cafés set out their first tables long before the heat arrives.',
      'Order a cortado at the counter, wander the tree-lined blocks, and watch a community that still knows its shopkeepers by name come quietly to life.',
    ],
    pills: ['Coffee Houses', 'Tree-Lined Streets', 'Local Boutiques'],
  },
  {
    img: '/images/neighborhood/outdoor-dining.webp',
    num: '02 — The Evening',
    title: <>A table <em>outdoors</em></>,
    paras: [
      'As the light softens, the Grove’s courtyards fill. String lights flicker on between the trees, and chef-led kitchens spill out onto the pavement.',
      'From garden bistros to candlelit terraces, dinner here is an unhurried, open-air ritual — the kind of evening that never asks you to drive across town.',
    ],
    pills: ['Garden Dining', 'Wine Bars', 'Chef’s Tables'],
  },
  {
    img: '/images/neighborhood/cultural-district.webp',
    num: '03 — The Culture',
    title: <>The design <em>quarter</em></>,
    paras: [
      'A few blocks inland, the neighborhood turns to art. Independent galleries, design showrooms and a year-round calendar of openings give the Grove a creative current that never quite settles.',
      'It is a place to collect, to stay curious, and to live alongside the makers and gallerists who shape Miami’s cultural life.',
    ],
    pills: ['Galleries', 'Design Showrooms', 'Open-Air Cinema'],
  },
  {
    img: '/images/neighborhood/bayfront-marina.webp',
    num: '04 — The Water',
    title: <>Out on <em>the water</em></>,
    paras: [
      'And then there is the bay. The Grove’s sheltered waterfront has been Miami’s sailing heart for generations, its marinas lined with everything from weekend dinghies to bluewater yachts.',
      'Step off the dock at dawn, cross to the islands for lunch, or simply watch the masts catch the last of the light from the shore.',
    ],
    pills: ['Marina', 'Sailing Club', 'Bayfront Park'],
  },
];

export default function NeighborhoodPage() {
  return (
    <>
      <main>

        {/* ============ HERO ============ */}
        <div className="hero" id="hero" data-screen-label="Neighborhood Hero">
          <div className="hero__sticky">
            <div className="hero__imagePanel" id="heroImage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/neighborhood/cultural-district.webp" alt="SELVA — the design quarter of Coconut Grove at golden hour" decoding="async" fetchPriority="high" />
            </div>
            <div className="hero__textPanel">
              <div className="hero__textInner" id="heroText">
                <div className="hero__scrollCue" id="heroCue">
                  <span className="hero__scrollLabel">Scroll to explore</span>
                </div>
                <div className="hero__logoBlock">
                  <p className="hero__preLabel">Miami &middot; The Neighborhood</p>
                  <h1 className="hero__pageTitle">Rooted in<br />the Grove</h1>
                  <div className="hero__rule"></div>
                  <p className="hero__tagline">Coconut Grove&rsquo;s banyan canopy, bayfront and design quarter &mdash; steps beyond your door.</p>
                </div>
                <p className="hero__deliveryNote">Delivery Mid-2027</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ PROXIMITY STRIP ============ */}
        <div className="stat-strip stat-strip--light" data-screen-label="Proximity">
          <div className="stat-strip__inner reveal">
            <div className="stat-strip__item"><span className="stat-strip__value">6 min</span><span className="stat-strip__label">Design District</span></div>
            <div className="stat-strip__item"><span className="stat-strip__value">12 min</span><span className="stat-strip__label">Brickell</span></div>
            <div className="stat-strip__item"><span className="stat-strip__value">14 min</span><span className="stat-strip__label">South Beach</span></div>
            <div className="stat-strip__item"><span className="stat-strip__value">18 min</span><span className="stat-strip__label">Miami Int&rsquo;l Airport</span></div>
          </div>
        </div>

        {/* ============ INTRO BAND ============ */}
        <section className="nbhd-intro" data-screen-label="Neighborhood Intro">
          <div className="nbhd-intro__headingCol">
            <span className="nbhd-intro__label reveal">The Neighborhood</span>
            <h2 className="nbhd-intro__headline reveal" data-delay="100">A canopy<br /><em>with a pulse</em></h2>
          </div>
          <div className="nbhd-intro__body">
            <p className="nbhd-intro__lead reveal" data-delay="120">
              SELVA stands where Coconut Grove&rsquo;s century-old tree canopy gives way to the
              open water of Biscayne Bay &mdash; a rare pocket of Miami that still moves at a
              human pace.
            </p>
            <p className="nbhd-intro__text reveal" data-delay="220">
              The Grove is Miami&rsquo;s oldest neighborhood, and it wears its history lightly:
              banyan-shaded sidewalks, family-run cafés, sailboats on the bay, and a design
              quarter that draws collectors and creatives from across the city.
            </p>
            <p className="nbhd-intro__text reveal" data-delay="300">
              From SELVA&rsquo;s door, the day unfolds on foot &mdash; a morning coffee beneath the
              trees, an afternoon among the galleries, an evening table under string lights, and
              the marina never more than a short walk away.
            </p>
            <a href="/residences#digital-twin" className="vision__cta reveal" data-delay="420">
              Explore the Residences <span className="vision__arrow" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* ============ STICKY SCROLL STORY ============ */}
        <section className="nbhd-story" id="nbhdStory" data-screen-label="Neighborhood Story">
          <div className="nbhd-story__grid">

            <div className="nbhd-story__media">
              {STORY.map((s, i) => (
                <div key={s.num} className={`nbhd-story__layer${i === 0 ? ' is-active' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt="" loading="lazy" decoding="async" />
                </div>
              ))}

              <div className="nbhd-story__overlay">
                <span className="nbhd-story__eyebrow">A Day in the Grove</span>
                <div className="nbhd-story__counter">
                  <span className="nbhd-story__count" id="nbhdCount">01</span>
                  <span className="nbhd-story__total">/ 04</span>
                </div>
              </div>
              <div className="nbhd-story__progress"><div className="nbhd-story__progressBar" id="nbhdProgress"></div></div>
            </div>

            <div className="nbhd-story__copy">
              {STORY.map((s) => (
                <article key={s.num} className="nbhd-panel">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="nbhd-panel__img" src={s.img} alt="" loading="lazy" decoding="async" />
                  <div className="nbhd-panel__body">
                    <p className="nbhd-panel__num">{s.num}</p>
                    <h3 className="nbhd-panel__title">{s.title}</h3>
                    {s.paras.map((p, j) => <p key={j} className="nbhd-panel__text">{p}</p>)}
                    <a href="/residences#digital-twin" className="vision__cta vision__cta--amber" style={{ marginTop: 'var(--space-6)' }}>
                      Explore the Residences <span className="vision__arrow" aria-hidden="true">&rarr;</span>
                    </a>
                    <div className="nbhd-panel__meta">
                      {s.pills.map((pill) => <span key={pill} className="pill pill--on-dark">{pill}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ INTERACTIVE MAP ============ */}
        <section className="nbhd-map-section" data-screen-label="Neighborhood Map">
          <div className="nbhd-map-head">
            <span className="nbhd-map-head__label reveal">The Map</span>
            <h2 className="nbhd-map-head__title reveal" data-delay="100">Discover the pulse <em>of the Grove</em></h2>
            <p className="nbhd-map-head__sub reveal" data-delay="180">Hover any place to find it on the map &mdash; the everyday pleasures that surround SELVA, all within the neighborhood.</p>
          </div>

          <div className="nbhd-map">
            {/* LEFT — categorized POI lists */}
            <div className="nbhd-map__lists" id="nbhdMapLists">
              {CATEGORIES.map((cat) => (
                <div key={cat.name} className="nbhd-cat">
                  <div className="nbhd-cat__head">
                    <span className="nbhd-cat__dot" style={{ background: cat.color }}></span>
                    <span className="nbhd-cat__name">{cat.name}</span>
                  </div>
                  {cat.pois.map((poi) => (
                    <button key={poi.key} className="nbhd-poi" data-key={poi.key}>
                      <span className="nbhd-poi__name">{poi.name}</span><span className="nbhd-poi__type">{poi.type}</span>
                    </button>
                  ))}
                </div>
              ))}
              <p className="nbhd-map__hint">Hover a place to locate it &rarr;</p>
            </div>

            {/* RIGHT — schematic map stage */}
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

                {PINS.map((pin) => (
                  <div key={pin.key} className="nmap-pin" data-key={pin.key} data-x={pin.x} data-y={pin.y} style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
                    <span className="nmap-pin__dot" style={{ background: pin.color }}></span>
                    <span className="nmap-pin__label">{pin.label}</span>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="page-cta" data-screen-label="Neighborhood CTA">
          <span className="page-cta__label reveal">Explore Next</span>
          <h2 className="page-cta__heading reveal" data-delay="100">Find your place<br /><em>at SELVA</em></h2>
          <a href="/residences#digital-twin" className="btnSlide reveal" data-delay="220">
            <span>Explore Floorplans</span><span aria-hidden="true">Explore Floorplans</span>
          </a>
        </section>

      </main>
      <HomeScript />
      <NeighborhoodScript />
    </>
  );
}
