import '@/styles/selva/doc-masthead.css'
import { storyblokEditable } from '@storyblok/react/rsc';

export interface DocMastheadBlok {
  _uid: string; component: 'doc_masthead'
  label?: string; title?: string; lead?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function DocMasthead({ blok }: { blok?: DocMastheadBlok }) {
  const label = blok?.label ?? 'SELVA Residences · Coconut Grove';
  const title = blok?.title ?? 'Document';
  const lead  = blok?.lead  ?? '';

  return (
    <header
      className="doc-head"
      data-screen-label={title}
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <div className="doc-head__inner">
        <p className="doc-head__label reveal">{label}</p>
        <h1 className="doc-head__title reveal" data-delay="80">{title}</h1>
        <div className="doc-head__rule reveal" data-delay="160"></div>
        <p className="doc-head__lead reveal" data-delay="200">{lead}</p>
      </div>
    </header>
  );
}
