import { storyblokEditable } from '@storyblok/react/rsc';

export interface BodyFigureBlok {
  _uid: string; component: 'body_figure'
  src?: string
  alt?: string
  caption?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function BodyFigure({ blok }: { blok?: BodyFigureBlok }) {
  const src     = blok?.src     ?? '';
  const alt     = blok?.alt     ?? '';
  const caption = blok?.caption ?? '';

  return (
    <figure
      className="article__figure reveal"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
