import '@/styles/selva/press-article.css'
import '@/styles/selva/press-card.css'
import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';
import { renderNode } from '../../../lib/renderRichText';

interface StoryblokAsset {
  filename?: string
  alt?: string
  title?: string
  focus?: string | null
}

export interface PressArticleBlok {
  _uid: string; component: 'press_article'
  publication?: string
  date?: string
  title?: string
  dek?: string
  byline?: string
  read_time?: string
  lead_image?: StoryblokAsset
  lead_image_caption?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any>
  related?: string
  seo_title?: string
  seo_description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

interface RelatedCard {
  pub: string; date: string; title: string; slug: string; delay?: string
}

const ArrowIcon = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M1 5.5h13M10 1l4.5 4.5L10 10" />
  </svg>
);

const BackIcon = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M15 5.5H2M6 1L1.5 5.5L6 10" />
  </svg>
);

function calcReadTime(html: string): string {
  const text  = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text ? text.split(' ').length : 0;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function wrapBodyImages(html: string): string {
  return html.replace(/<img\s([^>]*)>/gi, (_match, attrs) => {
    const title = (/title="([^"]*)"/i.exec(attrs) ?? [])[1] ?? '';
    const cap   = title ? `<figcaption>${title}</figcaption>` : '';
    return `<figure class="article__figure reveal"><img ${attrs}>${cap}</figure>`;
  });
}

export default function PressArticle({ blok, relatedCards = [] }: { blok?: PressArticleBlok; relatedCards?: RelatedCard[] }) {
  const publication      = blok?.publication      ?? '';
  const date             = blok?.date             ?? '';
  const title            = blok?.title            ?? '';
  const dek              = blok?.dek              ?? '';
  const byline           = blok?.byline           ?? '';
  const leadSrc          = blok?.lead_image?.filename ?? '';
  const leadAlt          = blok?.lead_image?.alt      ?? '';
  const leadCaption      = blok?.lead_image_caption   ?? '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawBodyHtml      = blok?.body ? renderNode(blok.body as any) : '';
  const bodyHtml         = wrapBodyImages(rawBodyHtml);
  const readTime         = calcReadTime(rawBodyHtml);

  return (
    <>
      {/* ============ ARTICLE ============ */}
      <article data-screen-label="Press Article" {...(blok ? storyblokEditable(blok) : {})}>

        {/* Masthead */}
        <header className="article__head">
          <p className="article__eyebrow reveal">
            <span className="article__pub">{publication}</span>
            <span className="sep" aria-hidden="true"></span>
            <span>{date}</span>
          </p>
          <h1 className="article__title reveal" data-delay="80">{title}</h1>
          <p
            className="article__dek reveal"
            data-delay="160"
            dangerouslySetInnerHTML={{ __html: dek }}
          />
          <p className="article__byline reveal" data-delay="220">
            By <strong>{byline}</strong> &nbsp;&middot;&nbsp; {readTime}
          </p>
        </header>

        {/* Lead image */}
        <div className="article__lead reveal">
          <figure className="article__leadFig">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={leadSrc} alt={leadAlt} loading="lazy" decoding="async" />
          </figure>
          <figcaption className="article__caption">{leadCaption}</figcaption>
        </div>

        {/* Body — rendered from Storyblok richtext field */}
        <div
          className="article__body"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {/* Foot */}
        <div className="article__foot">
          <Link href="/press" className="article__back">
            <BackIcon />
            Back to Press
          </Link>
          <div className="article__share">
            <span>Share</span>
            <a href="#">Email</a>
            <a href="#">Link</a>
          </div>
        </div>

      </article>

      {/* ============ MORE COVERAGE ============ */}
      {relatedCards.length > 0 && (
        <section className="article-more" data-screen-label="More Coverage">
          <p className="article-more__label">More coverage</p>
          <div className="press__grid">
            {relatedCards.map((card, i) => (
              <Link
                key={i}
                href={`/press/${card.slug}`}
                className="press-card reveal"
                data-delay={card.delay || undefined}
              >
                <div className="press-card__meta">
                  <span className="press-card__pub">{card.pub}</span>
                  <span className="press-card__date">{card.date}</span>
                </div>
                <h3 className="press-card__title">{card.title}</h3>
                <span className="press-more">Read more<ArrowIcon /></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ============ CTA ============ */}
      <section className="page-cta" data-screen-label="Article CTA">
        <span className="page-cta__label reveal">Explore Next</span>
        <h2 className="page-cta__heading reveal" data-delay="100">See it for <em>yourself</em></h2>
        <a href="/residences#digital-twin" className="btnSlide reveal" data-delay="220">
          <span>Explore Floorplans</span><span aria-hidden="true">Explore Floorplans</span>
        </a>
      </section>
    </>
  );
}
