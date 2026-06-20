import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import { storyblokComponents } from './storyblok-components'

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
  components: storyblokComponents,
})
