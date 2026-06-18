import { StoryblokStory } from '@storyblok/react/rsc'
import { getStoryblokApi } from '../lib/storyblok'
import HomeScript from '../components/ui/HomeScript/HomeScript'
import StoryblokBridgeWrapper from '../components/ui/StoryblokBridgeWrapper/StoryblokBridgeWrapper'

export const revalidate = 60

export default async function Home() {
  const sbApi = getStoryblokApi()
  const version = (process.env.STORYBLOK_VERSION as 'draft' | 'published') ?? 'published'
  const { data } = await sbApi.get('cdn/stories/home', { version })

  return (
    <main>
      <StoryblokStory story={data.story} />
      <StoryblokBridgeWrapper storyId={data.story.id} />
      <HomeScript />
    </main>
  )
}
