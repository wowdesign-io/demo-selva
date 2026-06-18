import { StoryblokStory } from '@storyblok/react/rsc'
import { getStoryblokApi } from '../lib/storyblok'
import HomeScript from '../components/ui/HomeScript/HomeScript'
import StoryblokPreviewView from '../components/ui/StoryblokPreviewView/StoryblokPreviewView'

export const revalidate = 60

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ _storyblok?: string }>
}) {
  const params = await searchParams
  const isPreview = '_storyblok' in params
  const version = isPreview ? 'draft' : ((process.env.STORYBLOK_VERSION as 'draft' | 'published') ?? 'published')

  const sbApi = getStoryblokApi()
  const { data } = await sbApi.get('cdn/stories/home', { version })

  return (
    <main>
      {isPreview
        // Preview: client component uses bridge data directly — no API round-trip race condition
        ? <StoryblokPreviewView story={data.story} />
        // Production: server-rendered for SSR/ISR
        : <StoryblokStory story={data.story} />
      }
      <HomeScript />
    </main>
  )
}
