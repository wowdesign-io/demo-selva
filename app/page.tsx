import { getStoryblokApi } from '../lib/storyblok'
import StoryblokHomeView  from '../components/ui/StoryblokHomeView/StoryblokHomeView'
import HomeScript         from '../components/ui/HomeScript/HomeScript'

export const revalidate = 60

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
