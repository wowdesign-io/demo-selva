import type { Metadata } from 'next';
import HomeScript from '../../components/ui/HomeScript/HomeScript';
import PressIndex, { type PressCardItem } from '../../components/blocks/PressIndex/PressIndex';
import type { PressIndexBlok } from '../../components/blocks/PressIndex/PressIndex';
import type { PressArticleBlok } from '../../components/blocks/PressArticle/PressArticle';
import { getStoryblokApi } from '../../lib/storyblok';

export const metadata: Metadata = {
  title: 'Press — SELVA Residences',
  description:
    'The latest news and coverage of SELVA Residences — a 40-residence botanical sanctuary in Coconut Grove, Miami.',
};

export const revalidate = 60;

// Index order: cards come back sorted by created_at desc; we preserve that.
// Reveal delays cycle: 0 / 80 / 80 repeating across grid rows of 3.
const DELAYS = ['', '80', '160'];

export default async function PressPage({
  searchParams,
}: {
  searchParams: Promise<{ _storyblok?: string }>
}) {
  const params    = await searchParams;
  const isPreview = '_storyblok' in params;
  const version   = isPreview ? 'draft' : ((process.env.STORYBLOK_VERSION as 'draft' | 'published') ?? 'published');

  const sbApi = getStoryblokApi();

  // Fetch 1 — press index story at press/index (label / heading / note / media / CTA)
  const { data: indexData } = await sbApi.get('cdn/stories/press/index', { version });
  const pressBlok = indexData.story.content as PressIndexBlok;

  // Fetch 2 — all article stories nested under press/ (excluding the index story)
  const { data: articlesData } = await sbApi.get('cdn/stories', {
    version,
    starts_with: 'press/',
    per_page: 25,
    sort_by: 'created_at:desc',
    excluding_slugs: 'press/index',
    excluding_fields: 'body,lead_image_alt,lead_image_caption,byline,read_time,seo_title,seo_description,related',
  });

  const cards: PressCardItem[] = (articlesData.stories ?? []).map(
    (s: { slug: string; content: PressArticleBlok }, i: number) => ({
      pub:   s.content.publication ?? '',
      date:  s.content.date        ?? '',
      title: s.content.title       ?? '',
      slug:  s.slug,
      delay: DELAYS[i % 3] || undefined,
    })
  );

  return (
    <>
      <main>
        <PressIndex blok={isPreview ? pressBlok : pressBlok} cards={cards} />
      </main>
      <HomeScript />
    </>
  );
}
