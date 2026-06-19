import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoryblokStory } from '@storyblok/react/rsc';
import HomeScript from '../../components/ui/HomeScript/HomeScript';
import LegalPage, { type LegalPageBlok } from '../../components/blocks/LegalPage/LegalPage';
import { getStoryblokApi } from '../../lib/storyblok';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Privacy Policy — SELVA Residences',
  description:
    'How we collect, use and protect the information you share with us as you explore SELVA Residences.',
};

export default async function PrivacyRoute({
  searchParams,
}: {
  searchParams: Promise<{ _storyblok?: string }>;
}) {
  const qp = await searchParams;
  const isPreview = '_storyblok' in qp;
  const version = isPreview ? 'draft' : ((process.env.STORYBLOK_VERSION as 'draft' | 'published') ?? 'published');

  const sbApi = getStoryblokApi();

  let data;
  try {
    const res = await sbApi.get('cdn/stories/privacy', { version });
    data = res.data;
  } catch {
    notFound();
  }

  if (!data?.story) notFound();

  const blok = data.story.content as LegalPageBlok;

  return (
    <>
      <main>
        {isPreview
          ? <StoryblokStory story={data.story} />
          : <LegalPage blok={blok} />
        }
      </main>
      <HomeScript />
    </>
  );
}
