'use client';

import { useEffect, useState } from 'react';

const MIN_SHOW_DESKTOP = 900;
const MIN_SHOW_MOBILE  = 700;

export default function Loader() {
  const [phase, setPhase] = useState<'loading' | 'lifting' | 'gone'>('loading');

  useEffect(() => {
    // Mobile: no loader — skip entirely
    if (window.innerWidth <= 768) {
      setPhase('gone');
      return;
    }

    if (sessionStorage.getItem('selvaLoaded')) {
      setPhase('gone');
      return;
    }

    document.body.classList.add('is-loading');

    function lift() {
      sessionStorage.setItem('selvaLoaded', '1');
      document.body.classList.remove('is-loading');
      setPhase('lifting');
      setTimeout(() => setPhase('gone'), 1100);
    }

    const timer = setTimeout(lift, MIN_SHOW_DESKTOP);
    return () => clearTimeout(timer);
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      className={`loader${phase === 'lifting' ? ' is-done' : ''}`}
      id="loader"
      role="presentation"
      aria-hidden="true"
    >
      <div className="loader__inner">
        <div className="loader__mark">
          <span>S</span><span>E</span><span>L</span><span>V</span><span>A</span>
        </div>
        <div className="loader__rule"></div>
        <p className="loader__tag">Where the forest meets the sky</p>
      </div>
    </div>
  );
}
