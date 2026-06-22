'use client';

import { useEffect } from 'react';

/* Ports selva/neighborhood.js:
   1) Sticky scroll story — cross-fade pinned media layers + counter/progress
   2) Interactive map — hover a POI to zoom/pan the canvas to its pin */
export default function NeighborhoodScript() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    /* ---------- 1. STICKY SCROLL STORY ---------- */
    const story = document.getElementById('nbhdStory');
    if (story) {
      const panels = Array.from(story.querySelectorAll<HTMLElement>('.nbhd-panel'));
      const layers = Array.from(story.querySelectorAll<HTMLElement>('.nbhd-story__layer'));
      const countEl = document.getElementById('nbhdCount');
      const barEl = document.getElementById('nbhdProgress');
      const total = panels.length;
      let current = -1;

      const setActive = (i: number) => {
        if (i === current || i < 0 || i >= total) return;
        current = i;
        layers.forEach((l, n) => l.classList.toggle('is-active', n === i));
        if (countEl) countEl.textContent = ('0' + (i + 1)).slice(-2);
        if (barEl) barEl.style.transform = 'scaleX(' + ((i + 1) / total) + ')';
      };

      const updateStory = () => {
        const centerY = window.innerHeight / 2;
        let best = 0, bestDist = Infinity;
        for (let i = 0; i < panels.length; i++) {
          const r = panels[i].getBoundingClientRect();
          if (r.top <= centerY && r.bottom >= centerY) { best = i; break; }
          const d = Math.min(Math.abs(r.top - centerY), Math.abs(r.bottom - centerY));
          if (d < bestDist) { bestDist = d; best = i; }
        }
        setActive(best);
      };

      let storyTicking = false;
      const requestStory = () => {
        if (!storyTicking) {
          storyTicking = true;
          requestAnimationFrame(() => { updateStory(); storyTicking = false; });
        }
      };
      window.addEventListener('scroll', requestStory, { passive: true });
      window.addEventListener('resize', requestStory, { passive: true });
      updateStory();
      cleanups.push(() => {
        window.removeEventListener('scroll', requestStory);
        window.removeEventListener('resize', requestStory);
      });
    }

    /* ---------- 2. INTERACTIVE MAP ---------- */
    // Pin coordinates match DEFAULT_PINS in NbhdMap.tsx — MapboxMap listens for these events
    const pinCoords: Record<string, [number, number]> = {
      cafe:     [-80.2385, 25.7298],
      market:   [-80.2405, 25.7272],
      bistro:   [-80.2360, 25.7248],
      design:   [-80.2338, 25.7262],
      gallery:  [-80.2420, 25.7312],
      cinema:   [-80.2438, 25.7328],
      marina:   [-80.2355, 25.7218],
      coast:    [-80.2392, 25.7305],
      sailing:  [-80.2325, 25.7175],
      grocer:   [-80.2332, 25.7255],
      wellness: [-80.2468, 25.7242],
      tennis:   [-80.2482, 25.7285],
    };

    const lists = document.getElementById('nbhdMapLists');
    if (lists) {
      const pois = Array.from(lists.querySelectorAll<HTMLElement>('.nbhd-poi'));
      let resetTimer: ReturnType<typeof setTimeout> | null = null;

      const focusPin = (key: string) => {
        const coords = pinCoords[key];
        if (!coords) return;
        window.dispatchEvent(new CustomEvent('selva:map-focus', {
          detail: { lng: coords[0], lat: coords[1], key },
        }));
      };

      const resetMap = () => {
        window.dispatchEvent(new CustomEvent('selva:map-reset'));
        pois.forEach((p) => p.classList.remove('is-active'));
      };

      const poiHandlers: Array<{ el: HTMLElement; fn: () => void }> = [];
      pois.forEach((poi) => {
        const key = poi.getAttribute('data-key') || '';
        const activate = () => {
          if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; }
          pois.forEach((p) => p.classList.toggle('is-active', p === poi));
          focusPin(key);
        };
        poi.addEventListener('mouseenter', activate);
        poi.addEventListener('focus', activate);
        poiHandlers.push({ el: poi, fn: activate });
      });

      const onLeave = () => { resetTimer = setTimeout(resetMap, 250); };
      const onEnter = () => { if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; } };
      lists.addEventListener('mouseleave', onLeave);
      lists.addEventListener('mouseenter', onEnter);

      cleanups.push(() => {
        poiHandlers.forEach(({ el, fn }) => {
          el.removeEventListener('mouseenter', fn);
          el.removeEventListener('focus', fn);
        });
        lists.removeEventListener('mouseleave', onLeave);
        lists.removeEventListener('mouseenter', onEnter);
        if (resetTimer) clearTimeout(resetTimer);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
