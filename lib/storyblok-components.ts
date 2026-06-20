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
import NbhdIntro          from '../components/blocks/NbhdIntro/NbhdIntro'
import NbhdStory          from '../components/blocks/NbhdStory/NbhdStory'
import NbhdMap            from '../components/blocks/NbhdMap/NbhdMap'
import GalleryGrid        from '../components/blocks/GalleryGrid/GalleryGrid'
import TeamIntro          from '../components/blocks/TeamIntro/TeamIntro'
import TeamPartners       from '../components/blocks/TeamPartners/TeamPartners'
import DocMasthead        from '../components/blocks/DocMasthead/DocMasthead'
import InquiryFormBlock   from '../components/blocks/InquiryFormBlock/InquiryFormBlock'
import DownloadsGrid      from '../components/blocks/DownloadsGrid/DownloadsGrid'
import DownloadsRequest   from '../components/blocks/DownloadsRequest/DownloadsRequest'
import PressIndex         from '../components/blocks/PressIndex/PressIndex'
import PressArticle       from '../components/blocks/PressArticle/PressArticle'
import LegalPage          from '../components/blocks/LegalPage/LegalPage'

export const storyblokComponents = {
  // Root content type — shared across all pages
  page:                 Page,

  // Session 1 — Home page
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
  design_pillars:       DesignPillars,
  vis_feature:          VisFeature,
  manifesto:            Manifesto,

  // Session 4 — Amenities page
  amenities_intro:      AmenitiesIntroSection,
  cinematic_band:       CinematicBand,
  amenities_grid:       AmenitiesGridSection,
  amen_sticky_slider:   AmenStickySlider,

  // Session 5 — Neighborhood page
  nbhd_intro:            NbhdIntro,
  nbhd_story:            NbhdStory,
  nbhd_map:              NbhdMap,

  // Session 6 — Gallery + Team
  gallery_grid_block:   GalleryGrid,
  team_intro:           TeamIntro,
  team_partners:        TeamPartners,

  // Session 7 — Inquiry + Downloads
  doc_masthead:         DocMasthead,
  inquiry_form_block:   InquiryFormBlock,
  downloads_grid:       DownloadsGrid,
  downloads_request:    DownloadsRequest,

  // Session 8 — Press + Articles
  press_index:      PressIndex,
  press_article:    PressArticle,

  // Session 9 — Legal + Privacy
  legal_page:       LegalPage,
}
