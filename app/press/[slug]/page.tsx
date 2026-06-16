import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HomeScript from '../../../components/ui/HomeScript/HomeScript';
import { getArticle, getAllSlugs } from '../articles';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.metaTitle, description: article.metaDescription };
}

const ArrowIcon = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M1 5.5h13M10 1l4.5 4.5L10 10" />
  </svg>
);

export default async function PressArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <main>

        {/* ============ ARTICLE ============ */}
        <article data-screen-label="Press Article">

          {/* Masthead */}
          <header className="article__head">
            <p className="article__eyebrow reveal">
              <span className="article__pub">{article.pub}</span>
              <span className="sep" aria-hidden="true"></span>
              <span>{article.date}</span>
            </p>
            <h1 className="article__title reveal" data-delay="80">{article.title}</h1>
            <p className="article__dek reveal" data-delay="160">{article.dek}</p>
            <p className="article__byline reveal" data-delay="220">By <strong>{article.byline}</strong> &nbsp;&middot;&nbsp; {article.readTime}</p>
          </header>

          {/* Lead image */}
          <div className="article__lead reveal">
            <figure className="article__leadFig">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/vision-02.webp" alt="Aerial view of SELVA Residences nestled among the Coconut Grove canopy" loading="lazy" decoding="async" />
            </figure>
            <figcaption className="article__caption">SELVA Residences, rising three storeys into the Coconut Grove canopy. Artist&rsquo;s conception.</figcaption>
          </div>

          {/* Body */}
          <div className="article__body">
            <p>In a city that has spent two decades reaching ever higher, SELVA Residences makes a quieter argument. Rather than a tower, the project rises just three storeys &mdash; forty residences set deliberately low into the Coconut Grove canopy, where the architecture seems less to command the landscape than to disappear into it.</p>

            <p>The premise is captured in a single line the developer keeps returning to: <em>where the forest meets the sky</em>. It is a tagline, but it is also a brief. Every decision &mdash; the scale, the planting, the depth of the terraces &mdash; works to keep residents inside the green rather than above it.</p>

            <h2>An argument for staying low</h2>
            <p>Coconut Grove has always been Miami&rsquo;s most wooded enclave, and SELVA treats that as the asset, not the constraint. Across three floors, the building holds three residence models &mdash; designated simply B, C and D &mdash; ranging from compact patio suites to layouts with a den and an outward-facing balcony. The result is intimate by design: a community measured in dozens, not hundreds.</p>

            <blockquote className="article__quote">
              <p>&ldquo;We weren&rsquo;t interested in a view you look at from behind glass. We wanted a building you could step into the canopy from.&rdquo;</p>
              <cite>&mdash; Banyan Bay Development</cite>
            </blockquote>

            <p>That ambition shows up most clearly in the way the residences open. Sliding walls dissolve the line between interior and terrace; planting is drawn up and through the structure rather than parked at its base. The effect, walking the model interiors, is of rooms that breathe outward.</p>

            <figure className="article__figure reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/exterior-05.webp" alt="The rooftop pool terrace above the treetops at SELVA" loading="lazy" decoding="async" />
              <figcaption>The rooftop terrace, where the amenity deck meets open sky. Artist&rsquo;s conception.</figcaption>
            </figure>

            <h2>A different kind of address</h2>
            <p>With pre-sales now open and delivery anticipated in mid-2027, SELVA arrives as a counter-proposal to the glass towers along the bay &mdash; a reminder that, in the Grove, the most luxurious thing on offer may simply be the trees. Whether the market agrees, the building is betting that quiet, for once, is the headline.</p>

            <p>The sales gallery is open by appointment. More information is available through the <a href="/residences#planpoint">interactive availability tool</a> on the residences page.</p>
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
            {article.related.map((card, i) => (
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
          <a href="/residences#planpoint" className="btnSlide reveal" data-delay="220">
            <span>Explore Floorplans</span><span aria-hidden="true">Explore Floorplans</span>
          </a>
        </section>

      </main>
      <HomeScript />
    </>
  );
}
