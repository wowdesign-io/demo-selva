import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoryblokStory } from '@storyblok/react/rsc';
import HomeScript from '../../../components/ui/HomeScript/HomeScript';
import StoryblokPreviewView from '../../../components/ui/StoryblokPreviewView/StoryblokPreviewView';
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

  return (
    <>
      <main>
        {isPreview
          ? <StoryblokPreviewView story={data.story} />
          : <StoryblokStory story={data.story} />
        }
      </main>
      <HomeScript />
    </>
  );
}
