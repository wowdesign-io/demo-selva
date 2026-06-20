import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Page Not Found · SELVA Residences',
};

export default function NotFound() {
  return (
    <main>
      <header className="doc-head">
        <div className="doc-head__inner">
          <p className="doc-head__label">SELVA Residences &middot; Coconut Grove</p>
          <h1 className="doc-head__title">404</h1>
          <div className="doc-head__rule"></div>
          <p className="doc-head__lead">This page doesn&rsquo;t exist or has been moved.</p>
          <Link href="/" className="btnSlide" style={{ marginTop: 'var(--space-8)', display: 'inline-flex' }}>
            <span>Back to home</span>
            <span>Back to home</span>
          </Link>
        </div>
      </header>
    </main>
  );
}
