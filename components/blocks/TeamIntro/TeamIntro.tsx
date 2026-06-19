import { storyblokEditable } from '@storyblok/react/rsc';

export interface TeamIntroBlok {
  _uid: string; component: 'team_intro'
  label?: string; lead?: string; body?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function TeamIntro({ blok }: { blok?: TeamIntroBlok }) {
  const label = blok?.label ?? 'The Makers';
  const lead  = blok?.lead  ?? 'SELVA is the work of a small, like-minded group of partners — the developer, architects, interior and landscape designers, and the people who bring it to the world — united by one idea: that a home should feel grown, not built.';
  const body  = blok?.body  ?? 'Each discipline shaped the next, in close collaboration, so that structure, interior and planting read as a single, continuous gesture — a building that belongs to its corner of Coconut Grove.';

  return (
    <section
      className="team-intro"
      data-screen-label="Team Intro"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <span className="team-intro__label reveal">{label}</span>
      <p className="team-intro__lead reveal" data-delay="100">{lead}</p>
      <p className="team-intro__text reveal" data-delay="200">{body}</p>
    </section>
  );
}
