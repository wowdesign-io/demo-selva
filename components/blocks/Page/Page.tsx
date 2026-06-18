import { StoryblokServerComponent, storyblokEditable } from '@storyblok/react/rsc'

// Root content type — every page story in Storyblok uses component: 'page'.
// Renders each block in body[] via StoryblokServerComponent, which looks up
// the registered component in lib/storyblok.ts by blok.component name.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ blok }: { blok: any }) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <div {...storyblokEditable(blok)}>
      {blok.body?.map((item: any) => (
        <StoryblokServerComponent key={item._uid} blok={item} />
      ))}
    </div>
  )
}
