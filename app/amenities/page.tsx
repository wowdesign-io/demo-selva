import type { Metadata } from 'next';
import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '../../lib/storyblok';
import { getHeroPreloadHref } from '../../lib/heroPreload';
import StoryblokPreviewView from '../../components/ui/StoryblokPreviewView/StoryblokPreviewView';
import HomeScript from '../../components/ui/HomeScript/HomeScript';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Amenities — SELVA Residences',
  description: 'Seven amenities conceived for a life of botanical luxury. SELVA Residences, Miami.',
};

export default async function AmenitiesPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const isPreview = '_storyblok' in params;
  const version = isPreview ? 'draft' : (process.env.STORYBLOK_VERSION as 'draft' | 'published' ?? 'published');

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get('cdn/stories/amenities', { version });

  const heroPreload = getHeroPreloadHref(data.story)

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {heroPreload && <link rel="preload" as="image" href={heroPreload} fetchPriority="high" />}
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
