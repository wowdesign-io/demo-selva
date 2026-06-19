import type { Metadata } from 'next';
import { StoryblokStory } from '@storyblok/react/rsc'
import { getStoryblokApi } from '../../lib/storyblok'
import HomeScript from '../../components/ui/HomeScript/HomeScript'
import StoryblokPreviewView from '../../components/ui/StoryblokPreviewView/StoryblokPreviewView'

export const metadata: Metadata = {
  title: 'Downloads — SELVA Residences',
  description:
    'Brochures, conceptual floor plans and the essentials for SELVA Residences — all in one place.',
};

export const revalidate = 60

export default async function DownloadsPage({
  searchParams,
}: {
  searchParams: Promise<{ _storyblok?: string }>
}) {
  const params    = await searchParams
  const isPreview = '_storyblok' in params
  const version   = isPreview ? 'draft' : ((process.env.STORYBLOK_VERSION as 'draft' | 'published') ?? 'published')

  const sbApi = getStoryblokApi()
  const { data } = await sbApi.get('cdn/stories/downloads', { version })

  return (
    <>
      <main>
        {isPreview
          ? <StoryblokPreviewView story={data.story} />
          : <StoryblokStory story={data.story} />
        }
      </main>
      <HomeScript />
    </>
  )
}
