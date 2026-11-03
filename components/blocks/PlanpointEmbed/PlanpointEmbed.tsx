'use client';

import { useEffect, useRef, useState } from 'react';
import { storyblokEditable } from '@storyblok/react';
import '@/styles/selva/residences.css';
import UnitSharePill, { type ActiveUnit, type UnitSharePlacement } from './UnitSharePill';
import { PROJECT_URL, SELVA_OPEN_UNIT, type SelvaOpenUnitDetail } from './openPlanpointUnit';

/** Flip to 'viewport' if the pill fights twin chrome. */
const SHARE_PLACEMENT: UnitSharePlacement = 'container';

export interface PlanpointEmbedBlok {
  _uid: string; component: 'planpoint_embed'
  overline?: string; title?: string; hint?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

/* Planpoint embed controller.
   Keeps: size handshake (get_size -> embed reports height -> match iframe),
   UTM passing, fullscreen, and unit-share pill (parent-page deep links).
   Drops the handoff's parent->iframe scroll/click forwarding (the official
   postMessage API documents no incoming scroll/click messages).
   NOTE: a "floor hover highlights wrong floor / flickers" symptom is almost
   always Brave Shields blocking the cross-origin iframe (test in Chrome or with
   Shields off) — NOT this controller. See references/sops/planpoint-embed.md. */
export default function PlanpointEmbed({ blok }: { blok?: PlanpointEmbedBlok }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [activeUnit, setActiveUnit] = useState<ActiveUnit | null>(null);
  /* Deep-link / slider boots often fire floor-viewed before unit-viewed — don't wipe the pill. */
  const ignoreHideUntilRef = useRef(0);

  const overline = blok?.overline ?? 'Digital Twin · Select & Reserve';
  const title    = blok?.title    ?? 'Explore Every Residence';
  const hint     = blok?.hint     ?? 'Hover a floor to preview available units. Select any residence to view its floorplan, imagery, and delivery date — then request directly.';

  function showUnit(unit: ActiveUnit, opts?: { pinMs?: number }) {
    setActiveUnit(unit);
    ignoreHideUntilRef.current = Date.now() + (opts?.pinMs ?? 2500);
  }

  /* Seed from URL deep-link + slider goToUnit events (iframe-only deep links skip PostMessage). */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const u = params.get('u');
    if (u) {
      showUnit({
        unitName: u,
        floorName: params.get('f') || undefined,
      }, { pinMs: 4000 });
    }

    function onOpenUnit(e: Event) {
      const detail = (e as CustomEvent<SelvaOpenUnitDetail>).detail;
      if (!detail?.unitName) return;
      showUnit({
        unitName: detail.unitName,
        floorName: detail.floorName,
      }, { pinMs: 4000 });
    }

    window.addEventListener(SELVA_OPEN_UNIT, onOpenUnit);
    return () => window.removeEventListener(SELVA_OPEN_UNIT, onOpenUnit);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only seed + listener
  }, []);

  useEffect(() => {
    const iframe = frameRef.current;
    const container = containerRef.current;
    if (!iframe || !container) return;

    let onFullscreen = false;
    let savedScrollY = 0;
    let enableResize = true;

    const urlParams = new URLSearchParams(window.location.search);
    const p = {
      f: urlParams.get('f'),
      u: urlParams.get('u'),
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      token: urlParams.get('token'),
    };

    const iframeSrc =
      PROJECT_URL +
      (p.f ? '&f=' + encodeURIComponent(p.f) : '') +
      (p.u ? '&u=' + encodeURIComponent(p.u) : '') +
      (p.utm_source ? '&utm_source=' + encodeURIComponent(p.utm_source) : '') +
      (p.utm_medium ? '&utm_medium=' + encodeURIComponent(p.utm_medium) : '') +
      (p.utm_campaign ? '&utm_campaign=' + encodeURIComponent(p.utm_campaign) : '') +
      (p.token ? '&token=' + encodeURIComponent(p.token) : '');

    const utmParams = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),
      token: urlParams.get('token'),
      parentURL: window.location.href || document.referrer,
    };

    iframe.src = iframeSrc;

    // Size handshake (ask the embed for its content height) + UTM attribution.
    // Stable, not scroll-dependent — safe with Lenis.
    const poll = window.setInterval(() => {
      if (iframe.contentWindow && enableResize) {
        iframe.contentWindow.postMessage('get_size', '*');
      }
      iframe.contentWindow?.postMessage({ type: 'utm', data: utmParams }, '*');
    }, 1000);

    /* ── Fullscreen (the embed's own fullscreen button posts a message) ── */
    function openFullscreen() {
      const el = container as HTMLElement & {
        mozRequestFullScreen?: () => void;
        webkitRequestFullscreen?: () => void;
        msRequestFullscreen?: () => void;
      };
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    }
    function closeFullscreen() {
      const d = document as Document & {
        webkitFullscreenElement?: Element;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        mozCancelFullScreen?: () => void;
        webkitExitFullscreen?: () => void;
        msExitFullscreen?: () => void;
      };
      if (d.fullscreenElement || d.webkitFullscreenElement || d.mozFullScreenElement || d.msFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (d.mozCancelFullScreen) d.mozCancelFullScreen();
        else if (d.webkitExitFullscreen) d.webkitExitFullscreen();
        else if (d.msExitFullscreen) d.msExitFullscreen();
      }
    }
    function fullscreenHandler() {
      onFullscreen = !onFullscreen;
      if (!onFullscreen) {
        iframe!.contentWindow?.postMessage({ type: 'close-fs' }, '*');
        setTimeout(() => {
          document.documentElement.style.overflow = 'auto';
          container!.style.position = 'relative';
          container!.style.top = 'auto';
          container!.style.left = 'auto';
          container!.style.zIndex = 'auto';
          window.scrollTo({ top: savedScrollY, behavior: 'instant' as ScrollBehavior });
          enableResize = true;
        }, 500);
      } else {
        document.documentElement.scrollTop = 0;
        document.documentElement.style.overflow = 'hidden';
        container!.style.position = 'fixed';
        container!.style.top = '0';
        container!.style.left = '0';
        container!.style.height = '100vh';
        container!.style.width = '100%';
        container!.style.zIndex = '999999999';
        iframe!.style.height = '100vh';
        iframe!.style.width = '100%';
        enableResize = false;
      }
    }

    function onMessage(event: MessageEvent) {
      const data = event.data;

      /* Planpoint analytics PostMessage → unit share pill */
      if (data && data.type === 'planpoint-event') {
        const eventName = data.event as string | undefined;
        const payload = (data.data || {}) as {
          unitName?: string;
          floorName?: string;
        };
        if (eventName === 'unit-viewed' && payload.unitName) {
          ignoreHideUntilRef.current = 0;
          setActiveUnit({
            unitName: String(payload.unitName),
            floorName: payload.floorName ? String(payload.floorName) : undefined,
          });
        } else if (eventName === 'floor-viewed' || eventName === 'project-viewed') {
          if (Date.now() < ignoreHideUntilRef.current) return;
          setActiveUnit(null);
        }
        return;
      }

      if (data && data.type === 'fullscreen') {
        if (data.active) {
          savedScrollY = window.scrollY || document.documentElement.scrollTop;
          openFullscreen();
        } else {
          closeFullscreen();
        }
      } else if (data && data.type === 'scroll-to-top') {
        const top = container!.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'smooth' });
      } else if (data && data.type === 'resize') {
        iframe!.style.height = data.h + 'px';
        container!.style.height = data.h + 'px';
      } else if (typeof data === 'string') {
        const h = parseInt(data.split('x')[0], 10);
        if (!isNaN(h)) {
          iframe!.style.height = h + 'px';
          container!.style.height = h + 'px';
        }
      }
    }

    window.addEventListener('message', onMessage);
    document.addEventListener('fullscreenchange', fullscreenHandler);
    document.addEventListener('webkitfullscreenchange', fullscreenHandler);
    document.addEventListener('mozfullscreenchange', fullscreenHandler);
    document.addEventListener('MSFullscreenChange', fullscreenHandler);

    return () => {
      clearInterval(poll);
      window.removeEventListener('message', onMessage);
      document.removeEventListener('fullscreenchange', fullscreenHandler);
      document.removeEventListener('webkitfullscreenchange', fullscreenHandler);
      document.removeEventListener('mozfullscreenchange', fullscreenHandler);
      document.removeEventListener('MSFullscreenChange', fullscreenHandler);
    };
  }, []);

  return (
    <section id="digital-twin" className="res-planpoint" data-screen-label="Digital Twin" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="res-planpoint__header reveal">
        <div className="res-planpoint__intro">
          <p className="res-planpoint__overline">{overline}</p>
          <h2 className="res-planpoint__title">{title}</h2>
        </div>
        <p className="res-planpoint__hint">{hint}</p>
      </div>
      <div className="res-planpoint__embed">
        <div
          ref={containerRef}
          id="digital-twin-container"
          className="res-planpoint__frameWrap"
        >
          <iframe
            ref={frameRef}
            id="digital-twin-frame"
            frameBorder="0"
            allowFullScreen
            className="res-planpoint__frame"
            title="SELVA Residences — Digital Twin"
          />
          {activeUnit ? (
            <UnitSharePill unit={activeUnit} placement={SHARE_PLACEMENT} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
