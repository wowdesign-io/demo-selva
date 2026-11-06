import ShowcaseEmbed from '@/components/blocks/ShowcaseEmbed/ShowcaseEmbed';

export const metadata = {
  title: 'Immersive 3D demo',
  robots: { index: false, follow: false },
};

/** Laurent logo-free Immersive — use Chrome if the view stays black in Brave */
const PROJECT_URL = 'https://app.planpoint.io/demo/planpoint3d?lang=English';

export default function ShowcaseImmersivePage() {
  return (
    <ShowcaseEmbed
      projectUrl={PROJECT_URL}
      title="Immersive 3D demo"
      note="Best in Chrome. If the view stays black, turn off Brave Shields or switch browser."
    />
  );
}
