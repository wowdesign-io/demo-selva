import dynamic from 'next/dynamic'
import { getStoryblokApi } from '../lib/storyblok'
import HomeScript from '../components/ui/HomeScript/HomeScript'

export const revalidate = 60

// Storyblok bridge uses window — must be client-only (no SSR)
const StoryblokHomeView = dynamic(
  () => import('../components/ui/StoryblokHomeView/StoryblokHomeView'),
  { ssr: false }
)

export default async function Home() {
  const sbApi = getStoryblokApi()
  const { data } = await sbApi.get('cdn/stories/home', { version: 'draft' })

  return (
    <main>
      <StoryblokHomeView story={data.story} />
      <HomeScript />
    </main>
  )
}
