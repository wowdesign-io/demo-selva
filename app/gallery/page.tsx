import type { Metadata } from 'next';
import { StoryblokStory } from '@storyblok/react/rsc'
import { getStoryblokApi } from '../../lib/storyblok'
import { getHeroPreloadHref } from '../../lib/heroPreload'
import HomeScript from '../../components/ui/HomeScript/HomeScript'
import StoryblokPreviewView from '../../components/ui/StoryblokPreviewView/StoryblokPreviewView'

export const metadata: Metadata = {
  title: 'Gallery — SELVA Residences',
  description:
    'A closer look at SELVA Residences — architecture, interiors, amenities and the Coconut Grove neighborhood, frame by frame.',
};

export const revalidate = 60

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ _storyblok?: string }>
}) {
  const params    = await searchParams
  const isPreview = '_storyblok' in params
  const version   = isPreview ? 'draft' : ((process.env.STORYBLOK_VERSION as 'draft' | 'published') ?? 'published')

  const sbApi = getStoryblokApi()
  const { data } = await sbApi.get('cdn/stories/gallery', { version })

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
  )
}
