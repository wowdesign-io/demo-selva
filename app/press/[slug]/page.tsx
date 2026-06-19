import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { StoryblokStory } from '@storyblok/react/rsc';
import HomeScript from '../../../components/ui/HomeScript/HomeScript';
import PressArticle from '../../../components/blocks/PressArticle/PressArticle';
import { getStoryblokApi } from '../../../lib/storyblok';
import type { PressArticleBlok } from '../../../components/blocks/PressArticle/PressArticle';

export const revalidate = 60;

export async function generateStaticParams() {
  const sbApi = getStoryblokApi();
  const { data } = await sbApi.get('cdn/stories', {
    version: 'published',
    starts_with: 'press/',
    per_page: 50,
    excluding_slugs: 'press/index',
    excluding_fields: 'body,lead_image,lead_image_caption,byline,seo_title,seo_description,related',
  });
  return (data.stories ?? []).map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get(`cdn/stories/press/${slug}`, { version: 'published' });
    const blok = data.story.content as PressArticleBlok;
    return {
      title: blok.seo_title || blok.title || 'Press — SELVA Residences',
      description: blok.seo_description || blok.dek || '',
    };
  } catch {
    return {};
  }
}

export default async function PressArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ _storyblok?: string }>
}) {
  const { slug }  = await params;
  const qp        = await searchParams;

  // Storyblok visual editor opens press/index at /press/index — redirect to the real index page
  if (slug === 'index') {
    const qs = new URLSearchParams(qp as Record<string, string>).toString();
    redirect(qs ? `/press?${qs}` : '/press');
  }

  const isPreview = '_storyblok' in qp;
  const version   = isPreview ? 'draft' : ((process.env.STORYBLOK_VERSION as 'draft' | 'published') ?? 'published');

  const sbApi = getStoryblokApi();

  let data;
  try {
    const res = await sbApi.get(`cdn/stories/press/${slug}`, { version });
    data = res.data;
  } catch {
    notFound();
  }

  if (!data?.story) notFound();

  const blok = data.story.content as PressArticleBlok;

  type RelatedStory = { slug: string; content: PressArticleBlok };
  const CARD_FIELDS = 'body,lead_image,lead_image_caption,byline,seo_title,seo_description,related';

  // Fetch related cards (only in live mode — preview omits them)
  let relatedCards: { pub: string; date: string; title: string; slug: string; delay?: string }[] = [];
  if (!isPreview) {
    // related field is now options/internal_stories → CDN returns array of UUIDs
    const relatedUuids: string[] = Array.isArray(blok.related) ? blok.related.filter(Boolean) : [];

    if (relatedUuids.length > 0) {
      try {
        const { data: relData } = await sbApi.get('cdn/stories', {
          version, by_uuids_ordered: relatedUuids.join(','), per_page: 5,
          excluding_fields: CARD_FIELDS,
        });
        relatedCards = (relData.stories ?? []).map((s: RelatedStory, i: number) => ({
          pub: s.content.publication ?? '', date: s.content.date ?? '',
          title: s.content.title ?? '', slug: s.slug,
          delay: i === 1 ? '80' : i === 2 ? '160' : undefined,
        }));
      } catch {
        // related fetch failure must not break the article page
      }
    } else {
      // Random fallback: shuffle all other press articles, take up to 3
      try {
        const { data: allData } = await sbApi.get('cdn/stories', {
          version, starts_with: 'press/',
          excluding_slugs: `press/index,press/${slug}`,
          per_page: 50, excluding_fields: CARD_FIELDS,
        });
        const all: RelatedStory[] = allData.stories ?? [];
        for (let i = all.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [all[i], all[j]] = [all[j], all[i]];
        }
        relatedCards = all.slice(0, 3).map((s, i) => ({
          pub: s.content.publication ?? '', date: s.content.date ?? '',
          title: s.content.title ?? '', slug: s.slug,
          delay: i === 1 ? '80' : i === 2 ? '160' : undefined,
        }));
      } catch {
        // random fallback failure must not break the article page
      }
    }
  }

  return (
    <>
      <main>
        {isPreview
          ? <StoryblokStory story={data.story} />
          : <PressArticle blok={blok} relatedCards={relatedCards} />
        }
      </main>
      <HomeScript />
    </>
  );
}
