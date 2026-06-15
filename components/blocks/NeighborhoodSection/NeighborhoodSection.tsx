export default function NeighborhoodSection() {
  return (
    <section className="hood" id="neighborhood" data-screen-label="Neighborhood">
      <div className="hood__image">
        <div className="zoom">
          <div className="zoom__inner zoom-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/neighborhood/bayfront-marina.png" alt="SELVA — waterfront promenade and botanical residences" />
          </div>
        </div>
      </div>
      <div className="stat-strip">
        <div className="stat-strip__inner reveal">
          <div className="stat-strip__item">
            <span className="stat-strip__value">6 min</span>
            <span className="stat-strip__label">Design District</span>
          </div>
          <div className="stat-strip__item">
            <span className="stat-strip__value">12 min</span>
            <span className="stat-strip__label">Brickell</span>
          </div>
          <div className="stat-strip__item">
            <span className="stat-strip__value">14 min</span>
            <span className="stat-strip__label">South Beach</span>
          </div>
          <div className="stat-strip__item">
            <span className="stat-strip__value">18 min</span>
            <span className="stat-strip__label">Miami Int&apos;l Airport</span>
          </div>
        </div>
      </div>
      <div className="hood__body">
        <span className="hood__label reveal">The Neighborhood</span>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <h2 className="hood__heading" {...{ 'data-lines': '' } as any}>
          <span className="lineWrap"><span className="line">One Foot in the Canopy.</span></span>
          <span className="lineWrap"><span className="line">One Foot in the City.</span></span>
        </h2>
        <p className="hood__text reveal" data-delay="150">
          SELVA rises in one of Miami&apos;s last green enclaves — where the canopy meets
          the bay, and the city&apos;s culture, dining, and design districts sit just minutes
          away. A rare address that offers seclusion without distance.
        </p>
        <p className="hood__address reveal" data-delay="250">3000 Hibiscus Lane · Coconut Grove · Miami, FL 33133</p>
        <a href="/neighborhood" className="btnSlide hood__cta reveal" data-delay="350">
          <span>Explore the Neighborhood</span><span aria-hidden="true">Explore the Neighborhood</span>
        </a>
      </div>
    </section>
  );
}
