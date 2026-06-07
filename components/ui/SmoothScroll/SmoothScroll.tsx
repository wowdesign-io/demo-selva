'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    (window as any).__lenis = lenis;
    return () => { lenis.destroy(); delete (window as any).__lenis; };
  }, []);

  return <>{children}</>;
}
