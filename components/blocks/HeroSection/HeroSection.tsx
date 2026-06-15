export default function HeroSection() {
  return (
    <div className="hero" id="hero">
      <div className="hero__sticky">
        <div className="hero__imagePanel" id="heroImage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero/360-front.jpg" alt="SELVA Residences — botanical luxury, Miami" decoding="async" fetchPriority="high" />
        </div>
        <div className="hero__textPanel">
          <div className="hero__textInner" id="heroText">
            <div className="hero__scrollCue" id="heroCue">
              <span className="hero__scrollLabel">Scroll to explore</span>
            </div>
            <div className="hero__logoBlock">
              <p className="hero__preLabel">Miami · 40 Residences</p>
              <h1 className="hero__wordmark">SELVA</h1>
              <div className="hero__rule"></div>
              <p className="hero__tagline">Where the forest meets the sky.</p>
            </div>
            <p className="hero__deliveryNote">Delivery Mid-2027</p>
          </div>
        </div>
      </div>
    </div>
  );
}
