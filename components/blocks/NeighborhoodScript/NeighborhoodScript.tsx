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
    const stage = document.getElementById('nbhdMapStage');
    const canvas = document.getElementById('nbhdMapCanvas');
    if (stage && canvas) {
      const pois = Array.from(document.querySelectorAll<HTMLElement>('.nbhd-poi'));
      const pins: Record<string, HTMLElement> = {};
      canvas.querySelectorAll<HTMLElement>('.nmap-pin').forEach((pin) => {
        const key = pin.getAttribute('data-key');
        if (key) pins[key] = pin;
      });

      const ZOOM = 2.35;
      let resetTimer: ReturnType<typeof setTimeout> | null = null;

      const focusPin = (key: string) => {
        const pin = pins[key];
        if (!pin) return;
        const px = parseFloat(pin.getAttribute('data-x') || '0');
        const py = parseFloat(pin.getAttribute('data-y') || '0');
        const tx = 50 - ZOOM * px;
        const ty = 50 - ZOOM * py;
        canvas.style.transform = 'translate(' + tx + '%, ' + ty + '%) scale(' + ZOOM + ')';
        for (const k in pins) pins[k].classList.toggle('is-active', k === key);
      };

      const resetMap = () => {
        canvas.style.transform = 'translate(0%, 0%) scale(1)';
        for (const k in pins) pins[k].classList.remove('is-active');
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

      const lists = document.getElementById('nbhdMapLists');
      const onLeave = () => { resetTimer = setTimeout(resetMap, 250); };
      const onEnter = () => { if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; } };
      if (lists) {
        lists.addEventListener('mouseleave', onLeave);
        lists.addEventListener('mouseenter', onEnter);
      }

      cleanups.push(() => {
        poiHandlers.forEach(({ el, fn }) => {
          el.removeEventListener('mouseenter', fn);
          el.removeEventListener('focus', fn);
        });
        if (lists) {
          lists.removeEventListener('mouseleave', onLeave);
          lists.removeEventListener('mouseenter', onEnter);
        }
        if (resetTimer) clearTimeout(resetTimer);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
