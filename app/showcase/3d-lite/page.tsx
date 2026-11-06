import ShowcaseEmbed from '@/components/blocks/ShowcaseEmbed/ShowcaseEmbed';

export const metadata = {
  title: '3D Lite demo',
  robots: { index: false, follow: false },
};

/** Laurent logo-free 3D Lite — Prince W / Audom */
const PROJECT_URL = 'https://app.planpoint.io/William/Audom?lang=English';

export default function Showcase3dLitePage() {
  return (
    <ShowcaseEmbed
      projectUrl={PROJECT_URL}
      title="3D Lite demo"
    />
  );
}
