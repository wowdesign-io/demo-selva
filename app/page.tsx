import { getStoryblokApi } from '../lib/storyblok'
import HeroSection        from '../components/blocks/HeroSection/HeroSection'
import OverviewSection    from '../components/blocks/OverviewSection/OverviewSection'
import VisionSection      from '../components/blocks/VisionSection/VisionSection'
import ResidencesSection  from '../components/blocks/ResidencesSection/ResidencesSection'
import ResHscroll         from '../components/blocks/ResHscroll/ResHscroll'
import AmenitiesSection   from '../components/blocks/AmenitiesSection/AmenitiesSection'
import NeighborhoodSection from '../components/blocks/NeighborhoodSection/NeighborhoodSection'
import HomeScript         from '../components/ui/HomeScript/HomeScript'

export const revalidate = 60

// Map Storyblok component names to React components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SECTIONS: Record<string, React.ComponentType<{ blok: any }>> = {
  home_hero:           HeroSection,
  overview_section:    OverviewSection,
  vision_teaser:       VisionSection,
  residences_teaser:   ResidencesSection,
  res_hscroll:         ResHscroll,
  amenities_teaser:    AmenitiesSection,
  neighborhood_teaser: NeighborhoodSection,
}

export default async function Home() {
  const sbApi = getStoryblokApi()
  const { data } = await sbApi.get('cdn/stories/home', { version: 'draft' })
  const body: Array<{ _uid: string; component: string }> = data.story.content.body ?? []

  return (
    <main>
      {body.map((blok) => {
        const Comp = SECTIONS[blok.component]
        if (!Comp) return null
        return <Comp key={blok._uid} blok={blok} />
      })}
      <HomeScript />
    </main>
  )
}
