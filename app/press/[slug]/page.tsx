import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HomeScript from '../../../components/ui/HomeScript/HomeScript';
import { getArticle, getAllSlugs, getRelatedCards, type Block } from '../articles';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.seo.title, description: article.seo.description };
}

const ArrowIcon = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M1 5.5h13M10 1l4.5 4.5L10 10" />
  </svg>
);

function BodyBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'paragraph':
      return <p dangerouslySetInnerHTML={{ __html: block.text }} />;
    case 'heading':
      return <h2 dangerouslySetInnerHTML={{ __html: block.text }} />;
    case 'quote':
      return (
        <blockquote className="article__quote">
          <p dangerouslySetInnerHTML={{ __html: block.text }} />
          <cite dangerouslySetInnerHTML={{ __html: block.cite }} />
        </blockquote>
      );
    case 'figure':
      return (
        <figure className="article__figure reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} loading="lazy" decoding="async" />
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
  }
}

export default async function PressArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const relatedCards = getRelatedCards(article.related);

  return (
    <>
      <main>

        {/* ============ ARTICLE ============ */}
        <article data-screen-label="Press Article">

          {/* Masthead */}
          <header className="article__head">
            <p className="article__eyebrow reveal">
              <span className="article__pub">{article.publication}</span>
              <span className="sep" aria-hidden="true"></span>
              <span>{article.date}</span>
            </p>
            <h1 className="article__title reveal" data-delay="80">{article.title}</h1>
            <p className="article__dek reveal" data-delay="160" dangerouslySetInnerHTML={{ __html: article.dek }} />
            <p className="article__byline reveal" data-delay="220">By <strong>{article.byline}</strong> &nbsp;&middot;&nbsp; {article.readTime}</p>
          </header>

          {/* Lead image */}
          <div className="article__lead reveal">
            <figure className="article__leadFig">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.leadImage.src} alt={article.leadImage.alt} loading="lazy" decoding="async" />
            </figure>
            <figcaption className="article__caption">{article.leadImage.caption}</figcaption>
          </div>

          {/* Body */}
          <div className="article__body">
            {article.body.map((block, i) => <BodyBlock key={i} block={block} />)}
          </div>

          {/* Foot */}
          <div className="article__foot">
            <Link href="/press" className="article__back">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M15 5.5H2M6 1L1.5 5.5L6 10" /></svg>
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
        <section className="article-more" data-screen-label="More Coverage">
          <p className="article-more__label">More coverage</p>
          <div className="press__grid">
            {relatedCards.map((card, i) => (
              <Link key={i} href={`/press/${card.slug}`} className="press-card reveal" data-delay={card.delay || undefined}>
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

        {/* ============ CTA ============ */}
        <section className="page-cta" data-screen-label="Article CTA">
          <span className="page-cta__label reveal">Explore Next</span>
          <h2 className="page-cta__heading reveal" data-delay="100">See it for <em>yourself</em></h2>
          <a href="/residences#digital-twin" className="btnSlide reveal" data-delay="220">
            <span>Explore Floorplans</span><span aria-hidden="true">Explore Floorplans</span>
          </a>
        </section>

      </main>
      <HomeScript />
    </>
  );
}
