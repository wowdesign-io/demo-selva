import { StoryblokStory } from '@storyblok/react/rsc'
import { getStoryblokApi } from '../lib/storyblok'
import HomeScript from '../components/ui/HomeScript/HomeScript'
import StoryblokBridgeWrapper from '../components/ui/StoryblokBridgeWrapper/StoryblokBridgeWrapper'

// ISR — page data refreshes every 60 seconds without a full redeploy.
// Storyblok publish webhook (Session 10) will also trigger on-demand revalidation.
export const revalidate = 60

// version is controlled by STORYBLOK_VERSION env var:
//   .env.local         → draft   (local dev + Storyblok Visual Editor)
//   Vercel Preview     → draft   (staging / editor preview deployments)
//   Vercel Production  → published (live site — serves only published content)
// Default: 'published' so production is always safe without the env var set.
const version = (process.env.STORYBLOK_VERSION ?? 'published') as 'draft' | 'published'

export default async function Home() {
  const sbApi = getStoryblokApi()
  const { data } = await sbApi.get('cdn/stories/home', { version })

  return (
    <main>
      {/*
        StoryblokStory renders the root 'page' block, which renders body[]
        via StoryblokServerComponent — full SSR, SEO safe, no ssr:false.
        Each block in body[] maps to a registered component in lib/storyblok.ts.
      */}
      <StoryblokStory story={data.story} />

      {/*
        Bridge is loaded client-only (ssr:false). On any field change in the
        Storyblok editor, it calls router.refresh() → server refetches draft
        content → Visual Editor canvas updates (~1s).
        Outside the editor, bridge is a no-op.
      */}
      <StoryblokBridgeWrapper storyId={data.story.id} />

      <HomeScript />
    </main>
  )
}
