import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import Page               from '../components/blocks/Page/Page'
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
import DesignPillars      from '../components/blocks/DesignPillars/DesignPillars'
import VisFeature         from '../components/blocks/VisFeature/VisFeature'
import Manifesto          from '../components/blocks/Manifesto/Manifesto'
import AmenitiesIntroSection from '../components/blocks/AmenitiesIntroSection/AmenitiesIntroSection'
import CinematicBand      from '../components/blocks/CinematicBand/CinematicBand'
import AmenitiesGridSection from '../components/blocks/AmenitiesGridSection/AmenitiesGridSection'
import AmenStickySlider   from '../components/blocks/AmenStickySlider/AmenStickySlider'

// Block component registry — one entry per Storyblok block type.
// Key = component field value in Storyblok (never change after stories are created).
// Display name in Storyblok Block Library = layout/function label for content editors.
// See integration plan: C:\Users\info\.claude\plans\i-went-into-storyblok-refactored-clock.md

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
  components: {
    // Root content type — shared across all pages
    page:                 Page,

    // Session 1 — Home page
    overview_section:     OverviewSection,
    vision_teaser:        VisionSection,      // "50/50" — also used on Vision page (was: vision_copy_band)
    residences_teaser:    ResidencesSection,
    res_hscroll:          ResHscroll,         // "Horizontal Slider"
    amenities_teaser:     AmenitiesSection,
    neighborhood_teaser:  NeighborhoodSection,

    // Session 2 — Residences page
    page_hero:            PageHero,           // "Hero" — used on all inner pages
    res_stats_bridge:     ResStatsBridge,     // "Stat Strip" — also used on Vision page (was: vision_stats_bridge)
    res_models_slider:    ResModelsSlider,    // "Models Slider"
    planpoint_embed:      PlanpointEmbed,     // "Digital Twin"
    res_features_grid:    ResidenceFeatures,  // "Features Grid"
    page_cta:             PageCta,            // "Call to Action" — shared across all pages

    // Session 3 — Vision page
    design_pillars:       DesignPillars,      // "Icon Grid" — items are feature_item (was: design_pillar)
    vis_feature:          VisFeature,         // "Feature Row" — used on Vision + Team pages
    manifesto:            Manifesto,

    // Session 4 — Amenities page
    amenities_intro:      AmenitiesIntroSection, // Intro copy + carousel (shares .amen section)
    cinematic_band:       CinematicBand,          // Full-width image band
    amenities_grid:       AmenitiesGridSection,   // 7-item amenity icon grid
    amen_sticky_slider:   AmenStickySlider,        // "A Day at SELVA" sticky scroll

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
