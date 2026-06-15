import AmenitiesCarousel from '../AmenitiesCarousel/AmenitiesCarousel';

/* Home-page amenities teaser: intro copy + shared carousel. */
export default function AmenitiesSection() {
  return (
    <section className="amen" id="amenities" data-screen-label="Amenities">
      <div className="amen__texture" aria-hidden="true"></div>

      <div className="amen__intro">
        <div className="amen__introInner">
          <span className="amen__label reveal">Amenities</span>
          <h2 className="amen__heading" data-lines="">
            <span className="lineWrap"><span className="line">A Life</span></span>
            <span className="lineWrap"><span className="line">Lived Beautifully</span></span>
          </h2>
          <p className="amen__sub reveal" data-delay="200">
            From the skylit wellness terrace to the botanical residents&apos; lounge,
            every amenity at SELVA is conceived to enrich daily life with nature,
            light, and unhurried luxury.
          </p>
          <a href="/amenities" className="btnSlide amen__cta reveal" data-delay="300">
            <span>View Amenities</span><span aria-hidden="true">View Amenities</span>
          </a>
        </div>
      </div>

      <AmenitiesCarousel slideHref="/amenities" overlayLabel="View Amenities" />
    </section>
  );
}
