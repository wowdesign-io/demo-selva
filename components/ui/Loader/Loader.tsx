'use client';

import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

const LETTERS = ['S', 'E', 'L', 'V', 'A'];
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
      setTimeout(() => setPhase('gone'), 700);
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
    <div className={`${styles.loader}${phase === 'lifting' ? ` ${styles.isDone}` : ''}`}>
      <div className={styles.inner}>
        <div className={styles.mark}>
          {LETTERS.map((l) => <span key={l}>{l}</span>)}
        </div>
        <div className={styles.rule} />
        <p className={styles.tag}>Where the forest meets the sky</p>
      </div>
    </div>
  );
}
