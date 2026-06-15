export default function ResidencesSection() {
  return (
    <section className="residences" data-screen-label="Residences">
      <div className="residences__container">
        <div className="residences__intro">
          <span className="residences__label reveal">Residences</span>
          <h2 className="residences__heading reveal" data-delay="100">
            Curated for<br />Private Living
          </h2>
          <p className="residences__sub reveal" data-delay="200">
            Forty bespoke one- and two-bedroom residences &mdash; several with private dens &mdash; each thoughtfully proportioned
            for a life of botanical luxury and urban ease.
          </p>
          <a href="/residences" className="btnSlide residences__cta reveal" data-delay="300">
            <span>View Residences</span><span aria-hidden="true">View Residences</span>
          </a>
        </div>
      </div>
    </section>
  );
}
