import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

// Called by the Storyblok Visual Editor when opening a story for preview.
// Sets the Next.js Draft Mode cookie, then redirects to the actual page.
// Production visitors never hit this route — their requests always serve published content.
//
// Storyblok Visual Editor → Default Environment → Preview URL:
//   https://demo.wowdesign.io/api/draft?secret=STORYBLOK_PREVIEW_SECRET&slug=
//   (Storyblok appends the story slug automatically)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug   = searchParams.get('slug') ?? ''

  if (secret !== process.env.STORYBLOK_PREVIEW_SECRET) {
    return new Response('Invalid preview token', { status: 401 })
  }

  const dm = await draftMode()
  dm.enable()

  // slug 'home' rewrites to '/' via next.config.ts; all other slugs map directly
  redirect(`/${slug}`)
}
