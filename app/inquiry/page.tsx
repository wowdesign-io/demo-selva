import type { Metadata } from 'next';
import HomeScript from '../../components/ui/HomeScript/HomeScript';
import InquiryForm from '../../components/blocks/InquiryForm/InquiryForm';

export const metadata: Metadata = {
  title: 'Inquire — SELVA Residences',
  description:
    'Enquire about SELVA Residences — share a few details and a member of our Coconut Grove sales team will be in touch.',
};

export default function InquiryPage() {
  return (
    <>
      <main>

        {/* ============ MASTHEAD ============ */}
        <header className="doc-head" data-screen-label="Inquiry Header">
          <div className="doc-head__inner">
            <p className="doc-head__label reveal">SELVA Residences &middot; Coconut Grove</p>
            <h1 className="doc-head__title reveal" data-delay="80">Inquire</h1>
            <div className="doc-head__rule reveal" data-delay="160"></div>
            <p className="doc-head__lead reveal" data-delay="200">Pre-sales are now open, from $300,000. Share a few details and a member of our sales team will be in touch.</p>
          </div>
        </header>

        {/* ============ INQUIRY ============ */}
        <InquiryForm />

      </main>
      <HomeScript />
    </>
  );
}
