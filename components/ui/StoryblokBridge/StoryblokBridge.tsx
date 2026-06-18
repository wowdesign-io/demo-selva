'use client'

import { useStoryblokBridge } from '@storyblok/react'
import { useRouter } from 'next/navigation'

// Activates the Storyblok Visual Editor bridge for live preview.
// On any field change in the editor, router.refresh() re-fetches the page
// server-side — preserving full SSR while showing updated draft content (~1s).
// This component is loaded client-only (ssr:false via StoryblokBridgeWrapper)
// because useStoryblokBridge accesses window on init.
export default function StoryblokBridge({ storyId }: { storyId: number }) {
  const router = useRouter()
  useStoryblokBridge(storyId, () => router.refresh())
  return null
}
