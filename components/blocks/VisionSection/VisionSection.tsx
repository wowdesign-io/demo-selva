export default function VisionSection() {
  return (
    <section className="vision">
      <div className="vision__copyBand">
        <div className="vision__leavesBg" aria-hidden="true"></div>
        <div className="vision__leavesOverlay" aria-hidden="true"></div>
        <div className="vision__inner">
          <div className="vision__headingCol">
            <span className="vision__label reveal">The Vision</span>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <h2 className="vision__headline" {...{ 'data-lines': '' } as any}>
              <span className="lineWrap"><span className="line">Where Miami&rsquo;s</span></span>
              <span className="lineWrap"><span className="line">Botanical Soul</span></span>
              <span className="lineWrap"><span className="line">Becomes Home</span></span>
            </h2>
          </div>
          <div className="vision__bodyCol">
            <p className="vision__bodyText reveal" data-delay="200">
              SELVA is a rare collection of forty private residences where Miami&rsquo;s lush
              canopy, refined interiors, and open sky converge. Conceived for those who seek
              the extraordinary — a home that breathes, grows, and endures.
            </p>
            <p className="vision__bodyText reveal" data-delay="320">
              Every detail, from the hand-selected material palette to the seamless
              indoor–outdoor flow, reflects a singular vision: to create a living environment
              as alive and generous as the nature that surrounds it.
            </p>
            <a href="/vision" className="vision__cta reveal" data-delay="440">
              Explore the Vision <span className="vision__arrow">→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="vision__imageWrap">
        <div className="zoom">
          <div className="zoom__inner zoom-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/renders/exterior-03.webp" alt="SELVA — where living and nature converge" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
