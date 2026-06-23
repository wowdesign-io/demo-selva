import '@/styles/selva/legal-doc.css'
import { storyblokEditable } from '@storyblok/react/rsc';
import LegalDoc from '../LegalDoc/LegalDoc';
import { renderNode, extractToc } from '../../../lib/renderRichText';

export interface LegalPageBlok {
  _uid: string;
  component: 'legal_page';
  page_title: string;
  lead: string;
  intro: string;
  updated?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}

interface Props {
  blok: LegalPageBlok;
}

export default function LegalPage({ blok }: Props) {
  const toc     = extractToc(blok.body ?? {});
  const bodyHtml = blok.body ? renderNode(blok.body) : '';

  return (
    <div {...storyblokEditable(blok)}>
      <LegalDoc
        title={blok.page_title}
        lead={blok.lead}
        intro={blok.intro}
        updated={blok.updated}
        toc={toc}
        bodyHtml={bodyHtml}
      />
    </div>
  );
}
