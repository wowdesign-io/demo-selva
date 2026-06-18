'use client'

import { useStoryblokBridge } from '@storyblok/react'
import { useState } from 'react'
import PageHero            from '../../blocks/PageHero/PageHero'
import OverviewSection     from '../../blocks/OverviewSection/OverviewSection'
import VisionSection       from '../../blocks/VisionSection/VisionSection'
import ResidencesSection   from '../../blocks/ResidencesSection/ResidencesSection'
import ResHscroll          from '../../blocks/ResHscroll/ResHscroll'
import AmenitiesSection    from '../../blocks/AmenitiesSection/AmenitiesSection'
import NeighborhoodSection from '../../blocks/NeighborhoodSection/NeighborhoodSection'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SECTIONS: Record<string, React.ComponentType<{ blok: any }>> = {
  page_hero:           PageHero,
  overview_section:    OverviewSection,
  vision_teaser:       VisionSection,
  residences_teaser:   ResidencesSection,
  res_hscroll:         ResHscroll,
  amenities_teaser:    AmenitiesSection,
  neighborhood_teaser: NeighborhoodSection,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StoryblokHomeView({ story: initialStory }: { story: any }) {
  const [story, setStory] = useState(initialStory)

  // useStoryblokBridge activates the Visual Editor bridge:
  // — enables canvas click-to-edit
  // — fires setStory on every field change → live preview updates
  useStoryblokBridge(story.id, (updatedStory) => setStory(updatedStory))

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
