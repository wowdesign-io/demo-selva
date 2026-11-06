'use client';

import { useEffect, useRef } from 'react';

export type ShowcaseEmbedProps = {
  /** Full Planpoint project URL including `?lang=English` (and customCss if needed). */
  projectUrl: string;
  title: string;
  note?: string;
};

/**
 * Thin full-viewport Planpoint shell for tier demos (3D Lite / Immersive).
 * Size + UTM handshake only — no SELVA share pill / Storyblok.
 */
export default function ShowcaseEmbed({ projectUrl, title, note }: ShowcaseEmbedProps) {
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

    const sep = projectUrl.includes('?') ? '&' : '?';
    iframe.src =
      projectUrl +
      (p.f ? `${sep}f=${encodeURIComponent(p.f)}` : '') +
      (p.u ? `&u=${encodeURIComponent(p.u)}` : '') +
      (p.utm_source ? `&utm_source=${encodeURIComponent(p.utm_source)}` : '') +
      (p.utm_medium ? `&utm_medium=${encodeURIComponent(p.utm_medium)}` : '') +
      (p.utm_campaign ? `&utm_campaign=${encodeURIComponent(p.utm_campaign)}` : '') +
      (p.token ? `&token=${encodeURIComponent(p.token)}` : '');

    const utmParams = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),
      token: urlParams.get('token'),
      parentURL: window.location.href || document.referrer,
    };

    const poll = window.setInterval(() => {
      if (iframe.contentWindow && enableResize) {
        iframe.contentWindow.postMessage('get_size', '*');
      }
      iframe.contentWindow?.postMessage({ type: 'utm', data: utmParams }, '*');
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
  }, [projectUrl]);

  return (
    <div className="showcase-embed" data-showcase-shell>
      <header className="showcase-embed__bar">
        <p className="showcase-embed__title">{title}</p>
        {note ? <p className="showcase-embed__note">{note}</p> : null}
      </header>
      <div ref={containerRef} className="showcase-embed__frameWrap">
        <iframe
          ref={frameRef}
          className="showcase-embed__frame"
          frameBorder={0}
          allowFullScreen
          title={title}
        />
      </div>
    </div>
  );
}
