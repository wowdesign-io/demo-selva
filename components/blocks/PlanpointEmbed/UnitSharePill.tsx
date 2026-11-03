'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

export type ActiveUnit = {
  unitName: string;
  floorName?: string;
};

/** Placement: container (default) or viewport-fixed fallback. */
export type UnitSharePlacement = 'container' | 'viewport';

type Props = {
  unit: ActiveUnit;
  placement?: UnitSharePlacement;
};

const IconShare = () => (
  <svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M176,164a36,36,0,0,0-27.92,13.3L96.25,144a35.92,35.92,0,0,0,0-32L148.08,78.7A35.93,35.93,0,1,0,143.75,72L91.92,105.3a36,36,0,1,0,0,45.4L143.75,184A36,36,0,1,0,176,164Zm0-136a28,28,0,1,1-28,28A28,28,0,0,1,176,28ZM64,156a28,28,0,1,1,28-28A28,28,0,0,1,64,156Zm112,72a28,28,0,1,1,28-28A28,28,0,0,1,176,228Z" />
  </svg>
);

const IconLink = () => (
  <svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M236,88.12a50.44,50.44,0,0,1-14.81,34.31l-34.75,34.74A50.33,50.33,0,0,1,150.62,172h-.05A50.63,50.63,0,0,1,100,120a4,4,0,0,1,4-3.89h.11a4,4,0,0,1,3.89,4.11A42.64,42.64,0,0,0,150.58,164h0a42.32,42.32,0,0,0,30.14-12.49l34.75-34.74a42.63,42.63,0,1,0-60.29-60.28l-11,11a4,4,0,0,1-5.66-5.65l11-11A50.64,50.64,0,0,1,236,88.12ZM111.78,188.49l-11,11A42.33,42.33,0,0,1,70.6,212h0a42.63,42.63,0,0,1-30.11-72.77l34.75-34.74A42.63,42.63,0,0,1,148,135.82a4,4,0,0,0,8,.23A50.64,50.64,0,0,0,69.55,98.83L34.8,133.57A50.63,50.63,0,0,0,70.56,220h0a50.33,50.33,0,0,0,35.81-14.83l11-11a4,4,0,1,0-5.65-5.66Z" />
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M185.79,148.42l-32-16a4,4,0,0,0-4,.25l-16.64,11.1a44.56,44.56,0,0,1-20.91-20.91l11.1-16.64a4,4,0,0,0,.25-4l-16-32A4,4,0,0,0,104,68a36,36,0,0,0-36,36,84.09,84.09,0,0,0,84,84,36,36,0,0,0,36-36A4,4,0,0,0,185.79,148.42ZM152,180a76.08,76.08,0,0,1-76-76,28,28,0,0,1,25.58-27.9l13.8,27.61-11,16.54A4,4,0,0,0,104,124a52.43,52.43,0,0,0,28,28,4,4,0,0,0,3.76-.37l16.54-11,27.61,13.8A28,28,0,0,1,152,180ZM128,28A100,100,0,0,0,40.53,176.5l-11.9,35.69a12,12,0,0,0,15.18,15.18l35.69-11.9A100,100,0,1,0,128,28Zm0,192a92,92,0,0,1-46.07-12.35,4.05,4.05,0,0,0-2-.54,3.93,3.93,0,0,0-1.27.21L41.28,219.78a4,4,0,0,1-5.06-5.06l12.46-37.38a4,4,0,0,0-.33-3.27A92,92,0,1,1,128,220Z" />
  </svg>
);

const IconSms = () => (
  <svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M216,52H40A12,12,0,0,0,28,64V224a11.89,11.89,0,0,0,6.93,10.88A12.17,12.17,0,0,0,40,236a11.89,11.89,0,0,0,7.69-2.83l0,0L81.49,204H216a12,12,0,0,0,12-12V64A12,12,0,0,0,216,52Zm4,140a4,4,0,0,1-4,4H80a4,4,0,0,0-2.62,1L42.56,227.06A4,4,0,0,1,36,224V64a4,4,0,0,1,4-4H216a4,4,0,0,1,4,4Zm-56-80a4,4,0,0,1-4,4H96a4,4,0,0,1,0-8h64A4,4,0,0,1,164,112Zm0,32a4,4,0,0,1-4,4H96a4,4,0,0,1,0-8h64A4,4,0,0,1,164,144Z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M224,52H32a4,4,0,0,0-4,4V192a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V56A4,4,0,0,0,224,52Zm-10.28,8L128,138.57,42.28,60ZM216,196H40a4,4,0,0,1-4-4V65.09L125.3,147a4,4,0,0,0,5.4,0L220,65.09V192A4,4,0,0,1,216,196Z" />
  </svg>
);

export function buildUnitShareUrl(unitName: string, floorName?: string): string {
  const url = new URL('/residences', typeof window !== 'undefined' ? window.location.origin : 'https://demo.wowdesign.io');
  if (floorName) url.searchParams.set('f', floorName);
  url.searchParams.set('u', unitName);
  url.hash = 'digital-twin';
  return url.toString();
}

function shareMessage(unitName: string, link: string): string {
  return `Have a look at Unit ${unitName} at SELVA Residences: ${link}`;
}

function smsHref(body: string): string {
  const isIos = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return isIos ? `sms:&body=${encodeURIComponent(body)}` : `sms:?body=${encodeURIComponent(body)}`;
}

export default function UnitSharePill({ unit, placement = 'container' }: Props) {
  const [copied, setCopied] = useState(false);

  const link = useMemo(
    () => buildUnitShareUrl(unit.unitName, unit.floorName),
    [unit.unitName, unit.floorName],
  );
  const message = useMemo(() => shareMessage(unit.unitName, link), [unit.unitName, link]);

  useEffect(() => {
    setCopied(false);
  }, [unit.unitName, unit.floorName]);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = link;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
    }
  }, [link]);

  const nativeShare = useCallback(async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `SELVA Residences — Unit ${unit.unitName}`,
          text: `Have a look at Unit ${unit.unitName} at SELVA Residences.`,
          url: link,
        });
      } catch {
        /* cancelled */
      }
      return;
    }
    await copyLink();
  }, [copyLink, link, unit.unitName]);

  const placementClass =
    placement === 'viewport' ? 'unit-share-pill--viewport' : 'unit-share-pill--container';

  return (
    <div
      className={`unit-share-pill ${placementClass}`}
      role="region"
      aria-label={`Share Unit ${unit.unitName}`}
    >
      <div className="unit-share-pill__bar">
        <button
          type="button"
          className="unit-share-pill__item unit-share-pill__item--share"
          onClick={nativeShare}
        >
          <IconShare />
          <span>Share Unit {unit.unitName}</span>
        </button>
        <span className="unit-share-pill__divider" aria-hidden="true" />
        <button
          type="button"
          className="unit-share-pill__item"
          onClick={copyLink}
          aria-label={copied ? 'Link copied' : 'Copy link'}
        >
          <IconLink />
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
        <a
          className="unit-share-pill__item"
          href={`https://wa.me/?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
        >
          <IconWhatsApp />
          <span>WhatsApp</span>
        </a>
        <a
          className="unit-share-pill__item"
          href={smsHref(message)}
          aria-label="Share via SMS"
        >
          <IconSms />
          <span>SMS</span>
        </a>
        <a
          className="unit-share-pill__item"
          href={`mailto:?subject=${encodeURIComponent(`SELVA Residences — Unit ${unit.unitName}`)}&body=${encodeURIComponent(message)}`}
          aria-label="Share via email"
        >
          <IconMail />
          <span>Email</span>
        </a>
      </div>
    </div>
  );
}
