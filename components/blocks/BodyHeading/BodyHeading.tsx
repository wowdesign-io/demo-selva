import { storyblokEditable } from '@storyblok/react/rsc';

export interface BodyHeadingBlok {
  _uid: string; component: 'body_heading'
  text?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function BodyHeading({ blok }: { blok?: BodyHeadingBlok }) {
  return (
    <h2
      dangerouslySetInnerHTML={{ __html: blok?.text ?? '' }}
      {...(blok ? storyblokEditable(blok) : {})}
    />
  );
}
