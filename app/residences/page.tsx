import type { Metadata } from 'next';
import { StoryblokStory } from '@storyblok/react/rsc'
import { getStoryblokApi } from '../../lib/storyblok'
import HomeScript from '../../components/ui/HomeScript/HomeScript'
import StoryblokBridgeWrapper from '../../components/ui/StoryblokBridgeWrapper/StoryblokBridgeWrapper'

export const metadata: Metadata = {
  title: 'Residences — SELVA',
  description:
    'Explore 40 botanical residences in Miami. Select your residence, view floorplans, and reserve — powered by the SELVA digital twin.',
};

export const revalidate = 60

export default async function ResidencesPage({
  searchParams,
}: {
  searchParams: Promise<{ _storyblok?: string }>
}) {
  const params = await searchParams
  const isPreview = '_storyblok' in params
  const version = isPreview ? 'draft' : ((process.env.STORYBLOK_VERSION as 'draft' | 'published') ?? 'published')

  const sbApi = getStoryblokApi()
  const { data } = await sbApi.get('cdn/stories/residences', { version })

  return (
    <>
      <main>
        <StoryblokStory story={data.story} />
        {isPreview && <StoryblokBridgeWrapper storyId={data.story.id} />}
      </main>
      <HomeScript />
    </>
  )
}
