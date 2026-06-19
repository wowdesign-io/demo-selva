import { storyblokEditable } from '@storyblok/react/rsc';

export interface BodyQuoteBlok {
  _uid: string; component: 'body_quote'
  text?: string
  cite?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function BodyQuote({ blok }: { blok?: BodyQuoteBlok }) {
  return (
    <blockquote
      className="article__quote"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <p dangerouslySetInnerHTML={{ __html: blok?.text ?? '' }} />
      <cite dangerouslySetInnerHTML={{ __html: blok?.cite ?? '' }} />
    </blockquote>
  );
}
