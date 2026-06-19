import { storyblokEditable } from '@storyblok/react/rsc';
import LegalDoc, { type LegalSection } from '../LegalDoc/LegalDoc';
import { renderNode } from '../../../lib/renderRichText';

interface LegalSectionBlok {
  _uid: string;
  section_id: string;
  toc_label: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any>;
}

export interface LegalPageBlok {
  _uid: string;
  component: 'legal_page';
  page_title: string;
  lead: string;
  intro: string;
  updated?: string;
  sections: LegalSectionBlok[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}

interface Props {
  blok: LegalPageBlok;
}

export default function LegalPage({ blok }: Props) {
  const sections: LegalSection[] = (blok.sections ?? []).map((s) => ({
    id: s.section_id,
    tocLabel: s.toc_label,
    title: s.title,
    bodyHtml: s.body ? renderNode(s.body) : '',
  }));

  return (
    <div {...storyblokEditable(blok)}>
      <LegalDoc
        title={blok.page_title}
        lead={blok.lead}
        intro={blok.intro}
        updated={blok.updated}
        sections={sections}
      />
    </div>
  );
}
