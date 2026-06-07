import HeroSection from '../components/blocks/HeroSection/HeroSection';
import OverviewSection from '../components/blocks/OverviewSection/OverviewSection';
import VisionSection from '../components/blocks/VisionSection/VisionSection';
import ResidencesSection from '../components/blocks/ResidencesSection/ResidencesSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <OverviewSection />
      <VisionSection />
      <ResidencesSection />
    </main>
  );
}
