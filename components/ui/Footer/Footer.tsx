import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.foot}>

      {/* ── 1. Action tiles ── */}
      <div className={styles.actions}>
        <a className={styles.action} href="mailto:sales@selvaresidences.com">
          <span className={styles.icon} aria-hidden>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="4" y="7" width="20" height="14" />
              <path d="M4 8l10 7 10-7" />
            </svg>
          </span>
          <span className={styles.actionLabel}>Email</span>
          <span className={styles.actionValue}>sales@selvaresidences.com</span>
        </a>

        <a className={styles.action} href="#">
          <span className={styles.icon} aria-hidden>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="5" y="6" width="18" height="16" />
              <path d="M14 6v16" />
            </svg>
          </span>
          <span className={styles.actionLabel}>Brochure</span>
          <span className={styles.actionValue}>Request</span>
        </a>

        <a className={styles.action} href="#">
          <span className={styles.icon} aria-hidden>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="14" cy="14" r="10" />
              <path d="M14 14V8M14 14l4 2" />
            </svg>
          </span>
          <span className={styles.actionLabel}>Private Tour</span>
          <span className={styles.actionValue}>By Appointment</span>
        </a>
      </div>

      {/* ── 2. Center block ── */}
      <div className={styles.center}>
        <Link href="/" className={styles.mark}>SELVA</Link>
        <p className={styles.address}>
          <strong>Sales Gallery</strong>&nbsp;&nbsp;3000 Hibiscus Lane,<br />
          Coconut Grove, Miami, FL 33133
        </p>
        <a className={styles.phone} href="tel:+13059000000">305.900.0000</a>
        <div className={styles.social}>
          <a href="#" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── 3. Bottom bar ── */}
      <div className={styles.bar}>
        <p className={styles.credit}>
          Developed by{' '}
          <a href="https://www.wowdesign.io/" target="_blank" rel="noopener">
            <strong>wowdesign</strong>
          </a>
        </p>
        <nav className={styles.links} aria-label="Footer links">
          <a href="#">Inquiry</a>
          <a href="#">Team</a>
          <a href="#">Downloads</a>
          <a href="#">Legal</a>
          <a href="#">Privacy Policy</a>
        </nav>
      </div>

    </footer>
  );
}
