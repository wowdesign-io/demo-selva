import HeroSection       from '../components/blocks/HeroSection/HeroSection';
import OverviewSection   from '../components/blocks/OverviewSection/OverviewSection';
import VisionSection     from '../components/blocks/VisionSection/VisionSection';
import ResidencesSection from '../components/blocks/ResidencesSection/ResidencesSection';
import ResHscroll        from '../components/blocks/ResHscroll/ResHscroll';
import AmenitiesSection  from '../components/blocks/AmenitiesSection/AmenitiesSection';
import NeighborhoodSection from '../components/blocks/NeighborhoodSection/NeighborhoodSection';
import HomeScript        from '../components/ui/HomeScript/HomeScript';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <OverviewSection />
      <VisionSection />
      <ResidencesSection />
      <ResHscroll />
      <AmenitiesSection />
      <NeighborhoodSection />
      <HomeScript />
    </main>
  );
}
