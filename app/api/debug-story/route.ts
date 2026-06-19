import { NextResponse } from 'next/server';
import { getStoryblokApi } from '../../../lib/storyblok';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sbApi = getStoryblokApi();
  const version = (process.env.STORYBLOK_VERSION as 'draft' | 'published') || 'published';
  let data;
  try {
    const res = await sbApi.get('cdn/stories/press/coconut-groves-most-anticipated-new-address', { version });
    data = res.data;
  } catch (e) {
    return NextResponse.json({ error: String(e) });
  }
  const c = data?.story?.content;
  return NextResponse.json({
    version_used: version,
    published_at: data?.story?.published_at,
    lead_image: c?.lead_image,
    body_type: c?.body?.type,
    body_nodes: c?.body?.content?.length,
    first_node: c?.body?.content?.[0],
    publication: c?.publication,
  });
}
