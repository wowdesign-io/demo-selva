'use client'

import { useStoryblok } from '@storyblok/react'
import HeroSection        from '../../blocks/HeroSection/HeroSection'
import OverviewSection    from '../../blocks/OverviewSection/OverviewSection'
import VisionSection      from '../../blocks/VisionSection/VisionSection'
import ResidencesSection  from '../../blocks/ResidencesSection/ResidencesSection'
import ResHscroll         from '../../blocks/ResHscroll/ResHscroll'
import AmenitiesSection   from '../../blocks/AmenitiesSection/AmenitiesSection'
import NeighborhoodSection from '../../blocks/NeighborhoodSection/NeighborhoodSection'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StoryblokHomeView({ story: initialStory }: { story: any }) {
  // useStoryblok initialises the Storyblok bridge — enables:
  //   • canvas click-to-edit in the Visual Editor
  //   • real-time preview updates when fields change
  const story = useStoryblok(initialStory, { version: 'draft' })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any[] = story?.content?.body ?? []

  return (
    <>
      {body.map((blok) => {
        const Comp = SECTIONS[blok.component]
        if (!Comp) return null
        return <Comp key={blok._uid} blok={blok} />
      })}
    </>
  )
}
