'use client'

// dynamic() with ssr:false is only allowed in Client Components.
// This wrapper is the Client Component boundary so app/page.tsx (a Server
// Component) can include the bridge without triggering the Next.js error:
// "'ssr: false' is not allowed with 'next/dynamic' in Server Components."
import dynamic from 'next/dynamic'

const StoryblokBridge = dynamic(
  () => import('../StoryblokBridge/StoryblokBridge'),
  { ssr: false }
)

export default function StoryblokBridgeWrapper({ storyId }: { storyId: number }) {
  return <StoryblokBridge storyId={storyId} />
}
