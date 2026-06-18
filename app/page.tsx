import { draftMode } from 'next/headers'
import { StoryblokStory } from '@storyblok/react/rsc'
import { getStoryblokApi } from '../lib/storyblok'
import HomeScript from '../components/ui/HomeScript/HomeScript'
import StoryblokBridgeWrapper from '../components/ui/StoryblokBridgeWrapper/StoryblokBridgeWrapper'

// ISR — revalidates every 60s. Session 10 adds on-demand revalidation via publish webhook.
export const revalidate = 60

export default async function Home() {
  // Draft Mode is enabled only when the Storyblok Visual Editor calls /api/draft.
  // Real production visitors never have this cookie → always get published content.
  const { isEnabled } = await draftMode()
  const version = isEnabled ? 'draft' : 'published'

  const sbApi = getStoryblokApi()
  const { data } = await sbApi.get('cdn/stories/home', { version })

  return (
    <main>
      <StoryblokStory story={data.story} />
      <StoryblokBridgeWrapper storyId={data.story.id} />
      <HomeScript />
    </main>
  )
}
