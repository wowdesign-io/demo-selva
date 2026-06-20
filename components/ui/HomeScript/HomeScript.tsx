'use client';

import { useEffect } from 'react';

/* Ports home.js: reveals, line-mask stagger, hero scroll animation, zoom panels, temperature */
export default function HomeScript() {
  useEffect(() => {
    function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }
    function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
      if (inMax === inMin) return outMin;
      const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
      return outMin + (outMax - outMin) * t;
    }

    /* Miami temperature — deferred 5s so it never lands inside the LCP window */
    const tempEl = document.getElementById('temp');
    if (tempEl) {
      setTimeout(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=25.7617&longitude=-80.1918&current=temperature_2m&temperature_unit=fahrenheit')
          .then(r => r.json())
          .then(d => {
            if (d?.current?.temperature_2m != null) {
              tempEl.textContent = Math.round(d.current.temperature_2m) + '°F';
            }
          })
          .catch(() => {});
      }, 5000);
    }

    /* .reveal elements — fade/slide in with optional data-delay */
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        if (delay) {
          setTimeout(() => el.classList.add('is-visible'), delay);
        } else {
          el.classList.add('is-visible');
        }
        revealObs.unobserve(el);
      });
    }, { rootMargin: '-60px 0px', threshold: 0.01 });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    /* [data-lines] — stagger .line children at 130ms intervals */
    const linesObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.line').forEach((line, i) => {
          setTimeout(() => line.classList.add('is-visible'), i * 130);
        });
        linesObs.unobserve(entry.target);
      });
    }, { rootMargin: '-80px 0px', threshold: 0.01 });

    document.querySelectorAll('[data-lines]').forEach(el => linesObs.observe(el));

    /* Scroll-driven transforms (rAF loop) */
    const hero      = document.getElementById('hero');
    const heroImage = document.getElementById('heroImage') as HTMLElement | null;
    const heroText  = document.getElementById('heroText')  as HTMLElement | null;
    const heroCue   = document.getElementById('heroCue')   as HTMLElement | null;

    function isDesktop() { return window.innerWidth > 900; }

    function updateScrollFx() {
      const winH = window.innerHeight;

      /* Hero animation */
      if (hero && heroImage && heroText) {
        if (isDesktop()) {
          const hr      = hero.getBoundingClientRect();
          const wrapH   = hero.offsetHeight;
          const p       = clamp(-hr.top / wrapH, 0, 1);
          heroImage.style.width     = mapRange(p, 0, 0.38, 50, 100) + '%';
          heroText.style.opacity    = String(mapRange(p, 0, 0.25, 1, 0));
          heroText.style.transform  = 'scale(' + mapRange(p, 0, 0.3, 1, 0.88) + ')';
          if (heroCue) {
            heroCue.style.transform = 'translateY(' + mapRange(p, 0, 0.3, 0, -12) + 'px)';
            heroCue.style.opacity   = String(mapRange(p, 0, 0.25, 1, 0));
          }
        } else {
          heroImage.style.width    = '';
          heroText.style.opacity   = '';
          heroText.style.transform = '';
        }
      }

      /* .zoom-panel — scale 1.14 → 1.0 */
      document.querySelectorAll<HTMLElement>('.zoom-panel').forEach(el => {
        const r     = el.getBoundingClientRect();
        const denom = winH / 2 + r.height / 2;
        const p     = clamp((winH - r.top) / denom, 0, 1);
        el.style.transform = 'scale(' + (1.14 + (1.0 - 1.14) * p) + ')';
      });

      /* .zoom-img — scale 1.12 → 1.0 */
      document.querySelectorAll<HTMLElement>('.zoom-img').forEach(el => {
        const r     = el.getBoundingClientRect();
        const denom = winH / 2 + r.height / 2;
        const p     = clamp((winH - r.top) / denom, 0, 1);
        el.style.transform = 'scale(' + (1.12 + (1.0 - 1.12) * p) + ')';
      });
    }

    let ticking = false;
    function requestFx() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => { updateScrollFx(); ticking = false; });
      }
    }

    window.addEventListener('scroll', requestFx, { passive: true });
    window.addEventListener('resize', requestFx, { passive: true });
    updateScrollFx();

    return () => {
      window.removeEventListener('scroll', requestFx);
      window.removeEventListener('resize', requestFx);
      revealObs.disconnect();
      linesObs.disconnect();
    };
  }, []);

  return null;
}
