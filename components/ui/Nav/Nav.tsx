'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { label: 'Vision', href: '/vision' },
  { label: 'Residences', href: '/residences' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Neighborhood', href: '/neighborhood' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Press', href: '/press' },
  { label: 'Team', href: '/team' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [temp, setTemp] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchTemp = () => {
      fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=25.7617&longitude=-80.1918&current=temperature_2m&temperature_unit=fahrenheit'
      )
        .then((r) => r.json())
        .then((d) => setTemp(Math.round(d.current.temperature_2m) + '°F'))
        .catch(() => {});
    };

    fetchTemp();
    const interval = setInterval(fetchTemp, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Announcement bar — hides on scroll */}
      <div className={scrolled ? `${styles.bar} ${styles.barHidden}` : styles.bar}>
        Pre-Sales Now Open&nbsp;·&nbsp;40 Residences&nbsp;·&nbsp;Miami&nbsp;·&nbsp;Delivery Mid-2027
      </div>

      {/* Main nav — always solid; moves to top:0 once bar is hidden */}
      <nav className={scrolled ? `${styles.nav} ${styles.navScrolled}` : styles.nav}>
        <div className={styles.left}>
          <button
            className={menuOpen ? styles.burgerClose : styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <>
                <span className={styles.closeA} />
                <span className={styles.closeB} />
              </>
            ) : (
              <>
                <span />
                <span />
                <span />
              </>
            )}
          </button>
          {temp && <span className={styles.temp}>{temp}</span>}
        </div>

        <div className={styles.center}>
          <Link href="/" className={styles.wordmark}>SELVA</Link>
        </div>

        <div className={styles.right}>
          <a href="tel:+13059000000" className={styles.phone}>305.900.0000</a>
          <Link href="/residences" className={styles.cta}>
            <span className={styles.ctaExplore}>Explore </span>Floorplans
          </Link>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <div className={menuOpen ? `${styles.overlay} ${styles.overlayOpen}` : styles.overlay}>
        <nav className={styles.overlayNav}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.overlayLink}
              style={{ transitionDelay: menuOpen ? `${i * 55}ms` : '0ms' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.overlayFooter}>
          <span className={styles.overlayMark}>SELVA</span>
          <Link href="/residences" className={styles.overlayCta} onClick={() => setMenuOpen(false)}>
            Explore Floorplans →
          </Link>
        </div>
      </div>
    </>
  );
}
