import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, Barlow } from 'next/font/google';
import Nav from '../components/ui/Nav/Nav';
import Footer from '../components/ui/Footer/Footer';
import Loader from '../components/ui/Loader/Loader';
import SmoothScroll from '../components/ui/SmoothScroll/SmoothScroll';
import ScrollProgress from '../components/ui/ScrollProgress/ScrollProgress';
import StoryblokProvider from '../components/ui/StoryblokProvider/StoryblokProvider';
import '../styles/globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-label',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SELVA Residences',
  description:
    '40 residences. Botanical luxury. A place where nature defines every detail.',
  openGraph: {
    title: 'SELVA Residences',
    description:
      '40 residences. Botanical luxury. A place where nature defines every detail.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${barlow.variable}`}
    >
      <body>
        {/* Runs before paint: on repeat visits within a session, hide the
            loader curtain immediately so it never flashes before hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('selvaLoaded'))document.documentElement.classList.add('selva-loaded')}catch(e){}`,
          }}
        />
        <Loader />
        <StoryblokProvider>
          <SmoothScroll>
            <Nav />
            {children}
            <Footer />
            <ScrollProgress />
          </SmoothScroll>
        </StoryblokProvider>
      </body>
    </html>
  );
}
