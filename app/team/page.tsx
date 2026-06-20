import type { Metadata } from 'next';
import { StoryblokStory } from '@storyblok/react/rsc'
import { getStoryblokApi } from '../../lib/storyblok'
import { getHeroPreloadHref } from '../../lib/heroPreload'
import HomeScript from '../../components/ui/HomeScript/HomeScript'
import StoryblokPreviewView from '../../components/ui/StoryblokPreviewView/StoryblokPreviewView'

export const metadata: Metadata = {
  title: 'The Team — SELVA Residences',
  description:
    'The architects, interior and landscape designers behind SELVA Residences — a small team shaping a building that lives with the Coconut Grove canopy.',
};

export const revalidate = 60

export default async function TeamPage({
  searchParams,
}: {
  searchParams: Promise<{ _storyblok?: string }>
}) {
  const params    = await searchParams
  const isPreview = '_storyblok' in params
  const version   = isPreview ? 'draft' : ((process.env.STORYBLOK_VERSION as 'draft' | 'published') ?? 'published')

  const sbApi = getStoryblokApi()
  const { data } = await sbApi.get('cdn/stories/team', { version })

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
