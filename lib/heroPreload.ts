// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getHeroPreloadHref(story: any): string | null {
  const body = story?.content?.body
  if (!Array.isArray(body)) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroBlok = body.find((b: any) => b.component === 'page_hero')
  if (!heroBlok) return null
  const src: string = heroBlok.bg_image?.filename || ''
  if (!src) return null
  return `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`
}
