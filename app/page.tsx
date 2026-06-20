import { StoryblokStory } from '@storyblok/react/rsc'
import { getStoryblokApi } from '../lib/storyblok'
import HomeScript from '../components/ui/HomeScript/HomeScript'
import StoryblokPreviewView from '../components/ui/StoryblokPreviewView/StoryblokPreviewView'

export const revalidate = 60

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ _storyblok?: string }>
}) {
  const params = await searchParams
  const isPreview = '_storyblok' in params
  const version = isPreview ? 'draft' : ((process.env.STORYBLOK_VERSION as 'draft' | 'published') ?? 'published')

  const sbApi = getStoryblokApi()
  const { data } = await sbApi.get('cdn/stories/home', { version })

  // Extract hero image URL to emit a fetchpriority=high preload server-side.
  // PageHero is 'use client' so its <Image priority> doesn't reliably add
  // fetchpriority to the <link rel="preload"> in the server HTML.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroBlok = (data.story.content.body as any[])?.find((b: any) => b.component === 'page_hero')
  const heroImgSrc: string = heroBlok?.bg_image?.filename || '/images/hero/360-front.jpg'
  const heroPreloadHref = `/_next/image?url=${encodeURIComponent(heroImgSrc)}&w=828&q=75`

  return (
    <>
      {/* LCP preload: tells browser to fetch hero at top priority before JS hydrates */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore — fetchPriority is valid on <link> but missing from React's HTMLLinkElement types */}
      <link rel="preload" as="image" href={heroPreloadHref} fetchPriority="high" />
      <main>
        {isPreview
          // Preview: client component uses bridge data directly — no API round-trip race condition
          ? <StoryblokPreviewView story={data.story} />
          // Production: server-rendered for SSR/ISR
          : <StoryblokStory story={data.story} />
        }
        <HomeScript />
      </main>
    </>
  )
}
