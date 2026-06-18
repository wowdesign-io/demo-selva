'use client'

import { useStoryblokBridge } from '@storyblok/react'
import { useRouter } from 'next/navigation'

export default function StoryblokBridge({ storyId }: { storyId: number }) {
  const router = useRouter()
  // Delay gives Storyblok's API time to propagate the save before refetching.
  // Without this, router.refresh() races the save and returns the pre-save draft.
  useStoryblokBridge(storyId, () => setTimeout(() => router.refresh(), 300))
  return null
}
