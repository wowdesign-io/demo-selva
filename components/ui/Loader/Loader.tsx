'use client';

import { useEffect, useState } from 'react';

const MIN_SHOW = 2000;

export default function Loader() {
  const [phase, setPhase] = useState<'loading' | 'lifting' | 'gone'>('loading');

  useEffect(() => {
    if (sessionStorage.getItem('selvaLoaded')) {
      setPhase('gone');
      return;
    }

    document.body.classList.add('is-loading');
    const startTime = Date.now();

    function lift() {
      sessionStorage.setItem('selvaLoaded', '1');
      document.body.classList.remove('is-loading');
      setPhase('lifting');
      setTimeout(() => setPhase('gone'), 1100);
    }

    function onLoad() {
      const elapsed = Date.now() - startTime;
      setTimeout(lift, Math.max(0, MIN_SHOW - elapsed));
    }

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    const safety = setTimeout(lift, 5000);
    return () => { clearTimeout(safety); };
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
