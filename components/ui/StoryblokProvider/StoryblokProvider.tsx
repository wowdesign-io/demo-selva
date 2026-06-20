'use client'

import { storyblokInit } from '@storyblok/react'
import { storyblokComponents } from '../../../lib/storyblok-components'

// Client-side init — no apiPlugin, no accessToken.
// The apiPlugin (and token) live server-side in lib/storyblok.ts.
// This call only registers components so StoryblokComponent works in the Visual Editor.
storyblokInit({ components: storyblokComponents })

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
