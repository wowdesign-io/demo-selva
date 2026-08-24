'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const bar = document.getElementById('bar');
    const nav = document.getElementById('nav');

    function onScroll() {
      const s = window.scrollY > 30;
      bar?.classList.toggle('is-hidden', s);
      nav?.classList.toggle('is-scrolled', s);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    document.documentElement.classList.toggle('menu-open', menuOpen);
    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('menu-open');
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="bar" id="bar">
        <span>Pre-Sales Now Open</span>
        <span className="bar__dot">·</span>
        <span>40 Residences</span>
        <span className="bar__dot bar__deskonly">·</span>
        <span className="bar__deskonly">Miami</span>
        <span className="bar__dot bar__deskonly">·</span>
        <span className="bar__deskonly">Delivery Mid-2027</span>
      </div>

      <nav className="nav" id="nav">
        <div className="nav__left">
          <button
            className={`burger${menuOpen ? ' is-open' : ''}`}
            id="burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span></span><span></span><span></span>
          </button>
          <span className="nav__temp" id="temp"></span>
        </div>
        <div className="nav__center">
          <Link href="/" className="wordmark">SELVA</Link>
        </div>
        <div className="nav__right">
          <a href="tel:+13055550100" className="nav__phone">305.555.0100</a>
          <Link href="/residences#digital-twin" className="nav__cta">
            <span className="nav__cta-word">Explore </span>Floorplans
          </Link>
        </div>
      </nav>

      <div className={`overlay${menuOpen ? ' is-open' : ''}`} id="overlay">
        <nav className="overlay__nav">
          <Link href="/vision"        className="overlay__link" onClick={closeMenu}>Vision</Link>
          <Link href="/residences"    className="overlay__link" onClick={closeMenu}>Residences</Link>
          <Link href="/amenities"     className="overlay__link" onClick={closeMenu}>Amenities</Link>
          <Link href="/neighborhood"  className="overlay__link" onClick={closeMenu}>Neighborhood</Link>
          <Link href="/gallery"       className="overlay__link" onClick={closeMenu}>Gallery</Link>
          <Link href="/team"          className="overlay__link" onClick={closeMenu}>Team</Link>
          <Link href="/press"         className="overlay__link" onClick={closeMenu}>Press</Link>
        </nav>
        <div className="overlay__footer">
          <span className="overlay__mark">SELVA</span>
          <Link href="/residences#digital-twin" className="overlay__cta" onClick={closeMenu}>
            Explore Floorplans →
          </Link>
        </div>
      </div>
    </>
  );
}
