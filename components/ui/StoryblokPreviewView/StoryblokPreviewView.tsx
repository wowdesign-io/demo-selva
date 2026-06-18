'use client'

import { useStoryblokBridge, StoryblokComponent } from '@storyblok/react'
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StoryblokPreviewView({ story: initialStory }: { story: any }) {
  const [story, setStory] = useState(initialStory)

  // Bridge sends the full updated story on every field change — no API round-trip.
  // This avoids the router.refresh() race condition with boolean toggles and fast saves.
  useStoryblokBridge(story.id, (updatedStory) => setStory(updatedStory))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any[] = story?.content?.body ?? []

  return (
    <>
      {body.map((blok) => (
        <StoryblokComponent key={blok._uid} blok={blok} />
      ))}
    </>
  )
}
