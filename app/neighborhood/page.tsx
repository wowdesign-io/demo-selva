import type { Metadata } from 'next';
import { StoryblokStory } from '@storyblok/react/rsc'
import { getStoryblokApi } from '../../lib/storyblok'
import HomeScript from '../../components/ui/HomeScript/HomeScript'
import NeighborhoodScript from '../../components/blocks/NeighborhoodScript/NeighborhoodScript'
import StoryblokPreviewView from '../../components/ui/StoryblokPreviewView/StoryblokPreviewView'

export const metadata: Metadata = {
  title: 'The Neighborhood — SELVA Residences',
  description:
    "Rooted in Coconut Grove — where Miami's oldest canopy meets the bay, the galleries and the marina. The neighborhood around SELVA Residences.",
};

export const revalidate = 60

export default async function NeighborhoodPage({
  searchParams,
}: {
  searchParams: Promise<{ _storyblok?: string }>
}) {
  const params    = await searchParams
  const isPreview = '_storyblok' in params
  const version   = isPreview ? 'draft' : ((process.env.STORYBLOK_VERSION as 'draft' | 'published') ?? 'published')

  const sbApi = getStoryblokApi()
  const { data } = await sbApi.get('cdn/stories/neighborhood', { version })

  return (
    <>
      <main>
        {isPreview
          ? <StoryblokPreviewView story={data.story} />
          : <StoryblokStory story={data.story} />
        }
      </main>
      <HomeScript />
      <NeighborhoodScript />
    </>
  )
}
