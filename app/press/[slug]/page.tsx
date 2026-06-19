import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoryblokStory } from '@storyblok/react/rsc';
import HomeScript from '../../../components/ui/HomeScript/HomeScript';
import StoryblokPreviewView from '../../../components/ui/StoryblokPreviewView/StoryblokPreviewView';
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
    excluding_fields: 'body,lead_image_alt,lead_image_caption,byline,read_time,seo_title,seo_description,related',
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

  // Fetch related cards (only in live mode — preview omits them)
  let relatedCards: { pub: string; date: string; title: string; slug: string; delay?: string }[] = [];
  if (!isPreview) {
    const relatedSlugs = (blok.related ?? '')
      .split(',').map((s: string) => s.trim()).filter(Boolean);
    if (relatedSlugs.length > 0) {
      try {
        const bySlugs = relatedSlugs.map((s: string) => `press/${s}`).join(',');
        const { data: relData } = await sbApi.get('cdn/stories', {
          version, by_slugs: bySlugs, per_page: 5,
          excluding_fields: 'body,lead_image_alt,lead_image_caption,byline,read_time,seo_title,seo_description,related',
        });
        const storiesMap = new Map(
          (relData.stories ?? []).map((s: { slug: string; content: PressArticleBlok }) => [s.slug, s])
        );
        relatedCards = relatedSlugs
          .map((slug: string, i: number) => {
            const s = storiesMap.get(slug) as { slug: string; content: PressArticleBlok } | undefined;
            if (!s) return null;
            return { pub: s.content.publication ?? '', date: s.content.date ?? '', title: s.content.title ?? '', slug: s.slug, delay: i === 1 ? '80' : i === 2 ? '160' : undefined };
          })
          .filter(Boolean) as typeof relatedCards;
      } catch {
        // related fetch failure must not break the article page
      }
    }
  }

  return (
    <>
      <main>
        {isPreview
          ? <StoryblokPreviewView story={data.story} />
          : <PressArticle blok={blok} relatedCards={relatedCards} />
        }
      </main>
      <HomeScript />
    </>
  );
}
