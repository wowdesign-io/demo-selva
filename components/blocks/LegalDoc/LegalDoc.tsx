'use client';

import { useEffect } from 'react';

interface TocItem { id: string; label: string }

interface Props {
  title: string;
  lead: string;
  intro: string;
  updated?: string;
  toc: TocItem[];
  bodyHtml: string;
}

/* Doc masthead + two-column legal/privacy document with TOC scrollspy
   (ports selva/legal-doc.js). */
export default function LegalDoc({ title, lead, intro, updated = 'June 2026', toc, bodyHtml }: Props) {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.legaldoc__tocLink'));
    if (!links.length) return;
    const targets = links.map((l) => document.querySelector(l.getAttribute('href') || ''));
    const offset = 32 + 64 + 48; // fixed bar + nav + breathing room

    const spy = () => {
      let idx = 0;
      for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        if (t && t.getBoundingClientRect().top - offset <= 0) idx = i;
      }
      links.forEach((l, i) => l.classList.toggle('is-active', i === idx));
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { spy(); ticking = false; }); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    spy();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="doc-head">
        <div className="doc-head__inner">
          <p className="doc-head__label reveal">SELVA Residences &middot; Coconut Grove</p>
          <h1 className="doc-head__title reveal" data-delay="80">{title}</h1>
          <div className="doc-head__rule reveal" data-delay="160"></div>
          <p className="doc-head__lead reveal" data-delay="200">{lead}</p>
          <p className="doc-head__meta reveal" data-delay="260">Last updated &middot; {updated}</p>
        </div>
      </header>

      <section className="legaldoc">
        <aside className="legaldoc__toc">
          <p className="legaldoc__tocLabel">Contents</p>
          <nav className="legaldoc__tocList">
            {toc.map((item) => (
              <a key={item.id} className="legaldoc__tocLink" href={`#${item.id}`}>{item.label}</a>
            ))}
          </nav>
        </aside>

        <div className="legaldoc__body">
          <p className="legaldoc__intro reveal">{intro}</p>
          <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        </div>
      </section>
    </>
  );
}
