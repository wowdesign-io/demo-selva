import type { Metadata } from 'next';
import LegalDoc, { type LegalSection } from '../../components/blocks/LegalDoc/LegalDoc';
import HomeScript from '../../components/ui/HomeScript/HomeScript';

export const metadata: Metadata = {
  title: 'Privacy Policy — SELVA Residences',
  description:
    'How we collect, use and protect the information you share with us as you explore SELVA Residences.',
};

const SECTIONS: LegalSection[] = [
  {
    id: 'collect', tocLabel: 'Information We Collect', title: 'Information We Collect',
    body: <>
      <p>We collect information you provide directly and information gathered automatically as you browse.</p>
      <h3>Information you give us</h3>
      <ul className="legaldoc__list">
        <li><strong>Contact details</strong> &mdash; name, email address and phone number submitted through enquiry forms or the sales gallery.</li>
        <li><strong>Preferences</strong> &mdash; the residences, models or amenities you ask about, and any notes you share with our sales team.</li>
        <li><strong>Correspondence</strong> &mdash; the content of messages you send to us by email or through the site.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul className="legaldoc__list">
        <li><strong>Usage data</strong> &mdash; pages viewed, time on site, referring links and similar activity.</li>
        <li><strong>Device data</strong> &mdash; browser type, operating system, approximate location and IP address.</li>
      </ul>
    </>,
  },
  {
    id: 'use', tocLabel: 'How We Use It', title: 'How We Use Your Information',
    body: <>
      <p>We use the information we collect to:</p>
      <ul className="legaldoc__list">
        <li>Respond to enquiries and arrange private viewings at the sales gallery.</li>
        <li>Share brochures, floor plans, pricing and availability you request.</li>
        <li>Keep you informed about the development, where you have asked to hear from us.</li>
        <li>Operate, maintain and improve the website and understand how it is used.</li>
        <li>Comply with applicable legal obligations and protect against misuse.</li>
      </ul>
    </>,
  },
  {
    id: 'cookies', tocLabel: <>Cookies &amp; Analytics</>, title: <>Cookies &amp; Analytics</>,
    body: <>
      <p>This website uses cookies and similar technologies to enable core functionality, remember your preferences and measure engagement. Analytics cookies help us understand which content is most useful so we can refine the experience.</p>
      <p>You can control or disable cookies through your browser settings. Disabling certain cookies may affect the availability of some features. Where required, we request consent before setting non-essential cookies.</p>
    </>,
  },
  {
    id: 'share', tocLabel: 'How We Share', title: 'How We Share Information',
    body: <>
      <p>We do not sell your personal information. We may share it with:</p>
      <ul className="legaldoc__list">
        <li><strong>Our sales &amp; marketing partner</strong>, Meridian Residential, to respond to your enquiry and manage the pre-sales process.</li>
        <li><strong>Service providers</strong> who host the website, deliver email or provide analytics on our behalf, under appropriate confidentiality obligations.</li>
        <li><strong>Authorities or advisors</strong> where disclosure is required by law or necessary to protect legal rights.</li>
      </ul>
    </>,
  },
  {
    id: 'retention', tocLabel: 'Data Retention', title: 'Data Retention',
    body: <p>We retain personal information for as long as needed to fulfil the purposes described in this policy, to maintain our relationship with prospective purchasers, and to meet legal and record-keeping requirements. When information is no longer needed, we take reasonable steps to delete or anonymise it.</p>,
  },
  {
    id: 'rights', tocLabel: <>Your Choices &amp; Rights</>, title: <>Your Choices &amp; Rights</>,
    body: <>
      <p>Depending on your location, you may have the right to access, correct, delete or restrict the use of your personal information, and to object to certain processing. You may also opt out of marketing communications at any time using the unsubscribe link in our emails or by contacting us.</p>
      <p>To exercise any of these rights, email <a href="mailto:privacy@selvaresidences.com">privacy@selvaresidences.com</a>. We will respond within a reasonable period and in accordance with applicable law.</p>
    </>,
  },
  {
    id: 'security', tocLabel: 'Data Security', title: 'Data Security',
    body: <p>We use reasonable administrative, technical and organisational measures designed to protect personal information against loss, misuse and unauthorised access. No method of transmission or storage is completely secure, however, and we cannot guarantee absolute security.</p>,
  },
  {
    id: 'thirdparty', tocLabel: 'Third-Party Embeds', title: <>Third-Party Links &amp; Embeds</>,
    body: <p>This website may link to, or embed, third-party services &mdash; including the interactive availability tool on the Residences page. Those services are governed by their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices or content of third parties.</p>,
  },
  {
    id: 'children', tocLabel: <>Children&rsquo;s Privacy</>, title: <>Children&rsquo;s Privacy</>,
    body: <p>This website is intended for adults and is not directed to children. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it.</p>,
  },
  {
    id: 'changes', tocLabel: <>Changes &amp; Contact</>, title: <>Changes &amp; Contact</>,
    body: <>
      <p>We may update this Privacy Policy from time to time. When we do, we will revise the date shown above. Material changes will be communicated where appropriate. Your continued use of the website after an update constitutes acceptance of the revised policy.</p>
      <p>If you have questions about this policy or how your information is handled, contact us at <a href="mailto:privacy@selvaresidences.com">privacy@selvaresidences.com</a> or by post at our sales gallery, 3000 Hibiscus Lane, Coconut Grove, Miami, FL 33133.</p>
    </>,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <main>
        <LegalDoc
          title="Privacy Policy"
          lead="How we collect, use and protect the information you share with us as you explore SELVA Residences."
          intro="This Privacy Policy explains how SELVA Residences and its developer, Banyan Bay Development, handle personal information collected through this website. SELVA Residences is a fictional development presented for demonstration purposes; this policy is provided as a representative example. By using this website you consent to the practices described below."
          sections={SECTIONS}
        />
      </main>
      <HomeScript />
    </>
  );
}
