'use client';

import { useEffect, useRef } from 'react';

const PROJECT_URL = 'https://app.planpoint.io/miami-wowdesign/laurent?lang=English';

/* Ports the handoff Planpoint embed controller: deep-link params, resize
   polling, fullscreen, and click/scroll context forwarding to the iframe. */
export default function PlanpointEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = frameRef.current;
    const container = containerRef.current;
    if (!iframe || !container) return;

    let enableResize = true;
    let onFullscreen = false;
    let savedScrollY = 0;

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

    const poll = window.setInterval(() => {
      if (iframe.contentWindow && enableResize) {
        iframe.contentWindow.postMessage('get_size', '*');
      }
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'utm', data: utmParams }, '*');
      }
    }, 1000);

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
      if (data && data.type === 'fullscreen') {
        if (data.active) {
          savedScrollY = window.scrollY || document.documentElement.scrollTop;
          openFullscreen();
        } else {
          closeFullscreen();
        }
      } else if (data && data.type === 'resize') {
        iframe!.style.height = data.h + 'px';
        container!.style.height = data.h + 'px';
      } else if (data && data.type === 'scroll-to-top') {
        const top = container!.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'smooth' });
      } else if (typeof data === 'string') {
        const h = parseInt(data.split('x')[0], 10);
        if (!isNaN(h)) {
          iframe!.style.height = h + 'px';
          container!.style.height = h + 'px';
        }
      }
    }

    function onClick(event: MouseEvent) {
      iframe!.contentWindow?.postMessage({ type: 'click', data: { type: event.type } }, '*');
    }

    function onScroll() {
      if (!iframe!.contentWindow) return;
      iframe!.contentWindow.postMessage({
        type: 'scroll',
        pageY: window.pageYOffset || document.documentElement.scrollTop,
        iframeY: container!.offsetTop,
        iframeRelativeY: container!.getBoundingClientRect().top,
        iframeHeight: iframe!.scrollHeight,
      }, '*');
    }

    window.addEventListener('message', onMessage);
    document.addEventListener('click', onClick);
    document.addEventListener('scroll', onScroll);
    document.addEventListener('fullscreenchange', fullscreenHandler);
    document.addEventListener('webkitfullscreenchange', fullscreenHandler);
    document.addEventListener('mozfullscreenchange', fullscreenHandler);
    document.addEventListener('MSFullscreenChange', fullscreenHandler);

    return () => {
      clearInterval(poll);
      window.removeEventListener('message', onMessage);
      document.removeEventListener('click', onClick);
      document.removeEventListener('scroll', onScroll);
      document.removeEventListener('fullscreenchange', fullscreenHandler);
      document.removeEventListener('webkitfullscreenchange', fullscreenHandler);
      document.removeEventListener('mozfullscreenchange', fullscreenHandler);
      document.removeEventListener('MSFullscreenChange', fullscreenHandler);
    };
  }, []);

  return (
    <section id="planpoint" className="res-planpoint" data-screen-label="Digital Twin">
      <div className="res-planpoint__header reveal">
        <div className="res-planpoint__intro">
          <p className="res-planpoint__overline">Digital Twin &middot; Select &amp; Reserve</p>
          <h2 className="res-planpoint__title">Explore Every Residence</h2>
        </div>
        <p className="res-planpoint__hint">
          Hover a floor to preview available units. Select any residence to view
          its floorplan, imagery, and delivery date &mdash; then request directly.
        </p>
      </div>
      <div className="res-planpoint__embed">
        <div
          ref={containerRef}
          id="planpoint-container"
          style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100vh', transition: 'all 0.2s ease' }}
        >
          <iframe
            ref={frameRef}
            id="planpoint-frame"
            frameBorder="0"
            allowFullScreen
            style={{ position: 'relative', top: 0, left: 0, bottom: 0, right: 0, width: '100%', minHeight: '100vh' }}
            title="SELVA Residences — Digital Twin"
          />
        </div>
      </div>
    </section>
  );
}
