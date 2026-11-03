/** Shared deep-link into the SELVA Planpoint embed + notify the share pill. */

export const PROJECT_URL =
  'https://app.planpoint.io/miami-wowdesign/laurent?lang=English&customCss=true';

export const SELVA_OPEN_UNIT = 'selva:open-unit';

export type SelvaOpenUnitDetail = {
  unitName: string;
  floorName?: string;
};

export function openPlanpointUnit(unitId: string, floorId?: string) {
  if (typeof window === 'undefined') return;

  const iframe = document.getElementById('digital-twin-frame') as HTMLIFrameElement | null;
  const section = document.getElementById('digital-twin');

  if (iframe) {
    let src = PROJECT_URL;
    if (floorId) src += '&f=' + encodeURIComponent(floorId);
    if (unitId) src += '&u=' + encodeURIComponent(unitId);
    iframe.src = src;
  }

  if (section) {
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, top - 80), behavior: 'smooth' });
  }

  /* Keep parent URL in sync so share links / refresh match the open unit. */
  const url = new URL(window.location.href);
  if (floorId) url.searchParams.set('f', floorId);
  else url.searchParams.delete('f');
  url.searchParams.set('u', unitId);
  url.hash = 'digital-twin';
  window.history.replaceState(window.history.state, '', url.toString());

  window.dispatchEvent(
    new CustomEvent<SelvaOpenUnitDetail>(SELVA_OPEN_UNIT, {
      detail: {
        unitName: unitId,
        floorName: floorId || undefined,
      },
    }),
  );
}
