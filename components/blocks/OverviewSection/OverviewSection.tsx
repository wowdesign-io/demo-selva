export default function OverviewSection() {
  return (
    <section className="overview">
      <div className="overview__intro">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <p className="overview__introText" {...{ 'data-lines': '' } as any}>
          <span className="lineWrap"><span className="line">Nestled where Miami&rsquo;s botanical soul meets the open sky,</span></span>
          <span className="lineWrap"><span className="line">SELVA presents forty private residences — a rare collection</span></span>
          <span className="lineWrap"><span className="line">where verdant canopy, bespoke interiors, and the city converge.</span></span>
        </p>
      </div>
      <div className="overview__panels">
        <a href="/residences" className="overview__panel">
          <div className="overview__imageWrap zoom-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/renders/interior-01.jpg" alt="SELVA Residences — curated interiors" />
          </div>
          <div className="overview__overlay"></div>
          <span className="overview__label">Residences</span>
        </a>
        <a href="/amenities" className="overview__panel">
          <div className="overview__imageWrap zoom-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/amenities/pool-deck.png" alt="SELVA Amenities — botanical setting" />
          </div>
          <div className="overview__overlay"></div>
          <span className="overview__label">Amenities</span>
        </a>
        <a href="/neighborhood" className="overview__panel">
          <div className="overview__imageWrap zoom-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/neighborhood/sidewalk-storefronts.png" alt="SELVA — Miami neighborhood" />
          </div>
          <div className="overview__overlay"></div>
          <span className="overview__label">Neighborhood</span>
        </a>
      </div>
    </section>
  );
}
