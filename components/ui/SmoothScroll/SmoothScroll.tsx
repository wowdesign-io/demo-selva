'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let raf = 0;

    function start() {
      lenis = new Lenis({ autoRaf: true });
      (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    }

    // On the first visit the loader curtain plays for ~2s. Lenis runs a
    // per-frame rAF loop that competes with the loader's CSS animation and
    // makes it stutter — so defer init until the curtain has lifted. On
    // repeat visits (no loader) start immediately.
    const firstVisit = !sessionStorage.getItem('selvaLoaded');
    if (firstVisit) {
      timer = setTimeout(start, 2300);
    } else {
      raf = requestAnimationFrame(start);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      if (lenis) {
        lenis.destroy();
        delete (window as Window & { __lenis?: Lenis }).__lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
