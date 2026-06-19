import { storyblokEditable } from '@storyblok/react/rsc';
import { resolveLink, type SbLink } from '../../../lib/resolveLink';

export interface DownloadsRequestBlok {
  _uid: string; component: 'downloads_request'
  label?: string; heading?: string
  email_cta_text?: string; email_href?: SbLink
  explore_cta_text?: string; explore_href?: SbLink
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function DownloadsRequest({ blok }: { blok?: DownloadsRequestBlok }) {
  const label       = blok?.label          ?? 'By Request';
  const heading     = blok?.heading        ?? 'Looking for something <em>specific?</em>';
  const emailText   = blok?.email_cta_text  ?? 'Email Sales';
  const emailLink   = resolveLink(blok?.email_href,  'mailto:sales@selvaresidences.com');
  const exploreText = blok?.explore_cta_text ?? 'Explore Floorplans';
  const exploreLink = resolveLink(blok?.explore_href, '/residences#digital-twin');

  return (
    <section
      className="dl-request"
      data-screen-label="Downloads Request"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <div className="dl-request__inner">
        <div className="dl-request__copy">
          <p className="dl-request__label reveal">{label}</p>
          <h2
            className="dl-request__heading reveal"
            data-delay="100"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        </div>
        <div className="dl-request__actions reveal" data-delay="160">
          <a href={emailLink.href} className="btnSlide">
            <span>{emailText}</span><span aria-hidden="true">{emailText}</span>
          </a>
          <a href={exploreLink.href} className="btnSlide btnSlide--amber">
            <span>{exploreText}</span><span aria-hidden="true">{exploreText}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
