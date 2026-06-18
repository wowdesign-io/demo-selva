import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'

// Block components are registered here as each session wires them up.
// Session 0: SDK init only — no components yet.

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
  components: {
    // Session 1: home_hero, overview_section, vision_teaser, ...
    // Session 2: page_hero, res_models_slider, planpoint_embed, ...
    // Add registrations progressively per session plan.
  },
})
