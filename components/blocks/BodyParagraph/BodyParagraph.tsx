import { storyblokEditable } from '@storyblok/react/rsc';

export interface BodyParagraphBlok {
  _uid: string; component: 'body_paragraph'
  text?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function BodyParagraph({ blok }: { blok?: BodyParagraphBlok }) {
  return (
    <p
      dangerouslySetInnerHTML={{ __html: blok?.text ?? '' }}
      {...(blok ? storyblokEditable(blok) : {})}
    />
  );
}
