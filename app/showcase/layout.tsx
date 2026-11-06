import type { Metadata } from 'next';
import './showcase.css';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
