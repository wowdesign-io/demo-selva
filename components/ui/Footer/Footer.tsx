export default function Footer() {
  return (
    <footer className="foot" data-screen-label="Footer">
      <div className="foot__actions">
        <a className="foot__action" href="mailto:sales@selvaresidences.com">
          <span className="foot__icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="4" y="7" width="20" height="14" />
              <path d="M4 8l10 7 10-7" />
            </svg>
          </span>
          <span className="foot__actionLabel">Email</span>
          <span className="foot__actionValue">sales@selvaresidences.com</span>
        </a>
        <a className="foot__action" href="/downloads">
          <span className="foot__icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="5" y="6" width="18" height="16" />
              <path d="M14 6v16" />
            </svg>
          </span>
          <span className="foot__actionLabel">Brochure</span>
          <span className="foot__actionValue">Request</span>
        </a>
        <a className="foot__action" href="/inquiry">
          <span className="foot__icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="14" cy="14" r="10" />
              <path d="M14 14V8M14 14l4 2" />
            </svg>
          </span>
          <span className="foot__actionLabel">Private Tour</span>
          <span className="foot__actionValue">By Appointment</span>
        </a>
      </div>

      <div className="foot__center">
        <a className="foot__mark" href="/">SELVA</a>
        <p className="foot__address">
          <strong>Sales Gallery</strong>&nbsp;&nbsp;3000 Hibiscus Lane,<br />
          Coconut Grove, Miami, FL 33133
        </p>
        <a className="foot__phone" href="tel:+13055550100">305.555.0100</a>
        <div className="foot__social">
          <a href="#" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>

      <div className="foot__bar">
        <p className="foot__credit">
          Developed by{' '}
          <a href="https://www.wowdesign.io/" target="_blank" rel="noopener">
            <strong>wowdesign</strong>
          </a>
        </p>
        <nav className="foot__links">
          <a href="/inquiry">Inquiry</a>
          <a href="/team">Team</a>
          <a href="/downloads">Downloads</a>
          <a href="/legal">Legal</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
}
