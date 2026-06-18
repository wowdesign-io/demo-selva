import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import Page               from '../components/blocks/Page/Page'
import HeroSection        from '../components/blocks/HeroSection/HeroSection'
import OverviewSection    from '../components/blocks/OverviewSection/OverviewSection'
import VisionSection      from '../components/blocks/VisionSection/VisionSection'
import ResidencesSection  from '../components/blocks/ResidencesSection/ResidencesSection'
import ResHscroll         from '../components/blocks/ResHscroll/ResHscroll'
import AmenitiesSection   from '../components/blocks/AmenitiesSection/AmenitiesSection'
import NeighborhoodSection from '../components/blocks/NeighborhoodSection/NeighborhoodSection'
import PageHero           from '../components/blocks/PageHero/PageHero'
import ResStatsBridge     from '../components/blocks/ResStatsBridge/ResStatsBridge'
import ResModelsSlider    from '../components/blocks/ResModelsSlider/ResModelsSlider'
import PlanpointEmbed     from '../components/blocks/PlanpointEmbed/PlanpointEmbed'
import ResidenceFeatures  from '../components/blocks/ResidenceFeatures/ResidenceFeatures'
import PageCta            from '../components/blocks/PageCta/PageCta'

// All Storyblok block components are registered here.
// Pattern: add imports + entries as each session wires new pages.
// Keys must match the `component` field in Storyblok Block Library exactly.
// See: references/sops/storyblok-nextjs-architecture.md

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
  components: {
    // Root content type — shared across all pages
    page:                 Page,

    // Session 1 — Home page
    home_hero:            HeroSection,
    overview_section:     OverviewSection,
    vision_teaser:        VisionSection,
    residences_teaser:    ResidencesSection,
    res_hscroll:          ResHscroll,
    amenities_teaser:     AmenitiesSection,
    neighborhood_teaser:  NeighborhoodSection,

    // Session 2 — Residences page
    page_hero:            PageHero,
    res_stats_bridge:     ResStatsBridge,
    res_models_slider:    ResModelsSlider,
    planpoint_embed:      PlanpointEmbed,
    res_features_grid:    ResidenceFeatures,
    page_cta:             PageCta,

    // Session 3 — Vision page
    // vision_copy_band, design_pillars, vis_feature, manifesto

    // Session 4 — Amenities page
    // amenities_intro, amenities_carousel_block, cinematic_band, amenities_grid, amen_sticky_slider

    // Session 5 — Neighborhood page
    // nbhd_intro, nbhd_story, nbhd_map

    // Session 6 — Gallery + Team
    // gallery_intro, gallery_grid_block, team_intro, team_partners

    // Session 7 — Inquiry + Downloads
    // inquiry_masthead, inquiry_form_block, downloads_masthead, downloads_grid, downloads_request

    // Session 8 — Press + Articles
    // press_index, press_media, press_article, body_paragraph, body_heading, body_quote, body_figure

    // Session 9 — Legal + Privacy
    // legal_page, legal_section

    // Session 10 — Production: token swap, ISR webhook, catch-all route
  },
})
