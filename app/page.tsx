import HeroSection from '../components/blocks/HeroSection/HeroSection';
import OverviewSection from '../components/blocks/OverviewSection/OverviewSection';
import VisionSection from '../components/blocks/VisionSection/VisionSection';
import ResidencesSection from '../components/blocks/ResidencesSection/ResidencesSection';
import AmenitiesSection from '../components/blocks/AmenitiesSection/AmenitiesSection';
import NeighborhoodSection from '../components/blocks/NeighborhoodSection/NeighborhoodSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <OverviewSection />
      <VisionSection />
      <ResidencesSection />
      <AmenitiesSection />
      <NeighborhoodSection />
    </main>
  );
}
