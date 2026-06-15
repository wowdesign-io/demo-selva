'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { label: 'Vision',        href: '/vision' },
  { label: 'Residences',   href: '/residences' },
  { label: 'Amenities',    href: '/amenities' },
  { label: 'Neighborhood', href: '/neighborhood' },
  { label: 'Gallery',      href: '/gallery' },
  { label: 'Press',        href: '/press' },
  { label: 'Team',         href: '/team' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [temp,     setTemp]       = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=25.7617&longitude=-80.1918&current=temperature_2m&temperature_unit=fahrenheit'
    )
      .then((r) => r.json())
      .then((d) => setTemp(Math.round(d.current.temperature_2m) + '°F'))
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Announcement bar */}
      <div className={scrolled ? `${styles.bar} ${styles.barHidden}` : styles.bar}>
        <span>Pre-Sales Now Open</span>
        <span className={styles.barDot}>·</span>
        <span>40 Residences</span>
        <span className={`${styles.barDot} ${styles.barDeskOnly}`}>·</span>
        <span className={styles.barDeskOnly}>Miami</span>
        <span className={`${styles.barDot} ${styles.barDeskOnly}`}>·</span>
        <span className={styles.barDeskOnly}>Delivery Mid-2027</span>
      </div>

      {/* Main nav */}
      <nav className={scrolled ? `${styles.nav} ${styles.navScrolled}` : styles.nav}>
        <div className={styles.left}>
          <button
            className={menuOpen ? `${styles.burger} ${styles.burgerOpen}` : styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
          {temp && <span className={styles.temp}>{temp}</span>}
        </div>

        <div className={styles.center}>
          <Link href="/" className={styles.wordmark}>SELVA</Link>
        </div>

        <div className={styles.right}>
          <a href="tel:+13055550100" className={styles.phone}>305.555.0100</a>
          <Link href="/residences#planpoint" className={styles.cta}>
            <span className={styles.ctaExplore}>Explore </span>Floorplans
          </Link>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <div className={menuOpen ? `${styles.overlay} ${styles.overlayOpen}` : styles.overlay}>
        <nav className={styles.overlayNav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.overlayLink}
              aria-current={pathname === link.href ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.overlayFooter}>
          <span className={styles.overlayMark}>SELVA</span>
          <Link href="/residences#planpoint" className={styles.overlayCta} onClick={() => setMenuOpen(false)}>
            Explore Floorplans →
          </Link>
        </div>
      </div>
    </>
  );
}
