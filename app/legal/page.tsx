import type { Metadata } from 'next';
import LegalDoc, { type LegalSection } from '../../components/blocks/LegalDoc/LegalDoc';
import HomeScript from '../../components/ui/HomeScript/HomeScript';

export const metadata: Metadata = {
  title: 'Legal — SELVA Residences',
  description:
    'Legal notices and disclaimers for SELVA Residences, a pre-sales residential development in Coconut Grove, Miami.',
};

const SECTIONS: LegalSection[] = [
  {
    id: 'offer', tocLabel: 'No Offer or Solicitation', title: 'No Offer or Solicitation',
    body: <p>The materials on this website do not constitute an offer to sell, or the solicitation of an offer to buy, a unit in any jurisdiction where prior registration or other qualification is required. Nothing herein shall be construed as a representation, warranty or guarantee. No statement should be relied upon as the basis of a purchase decision; any prospective purchaser should consult the formal purchase and sale documentation and seek independent professional advice.</p>,
  },
  {
    id: 'renderings', tocLabel: <>Renderings &amp; Conceptions</>, title: <>Renderings &amp; Artist&rsquo;s Conceptions</>,
    body: <>
      <p>All images, renderings, floor plans and depictions on this website are artist&rsquo;s conceptions and are conceptual only. They are provided for illustrative purposes, may be enhanced or stylised, and are not intended to be, nor should they be relied upon as, an accurate representation of the final product.</p>
      <p>Views, landscaping, finishes, fixtures, furnishings and architectural details are illustrative and subject to change without notice. Furnishings, accessories and decorator items are not included with any residence. Floor plans labelled as conceptual or estimated are not construction drawings and are not to scale.</p>
    </>,
  },
  {
    id: 'pricing', tocLabel: <>Pricing &amp; Specifications</>, title: <>Pricing, Availability &amp; Specifications</>,
    body: <>
      <p>Prices, availability, dimensions, square footage, models and specifications are estimates, are subject to change at any time without notice, and may vary among residences. Square-footage figures are approximate and may be measured using methods that differ from those a purchaser may use; actual areas may vary from those shown.</p>
      <p>SELVA Residences comprises forty residences across three storeys, with delivery anticipated in mid-2027. Such figures, together with any timelines, are projections only and are not guaranteed. The developer reserves the right to make modifications, revisions and changes it deems desirable in its sole and absolute discretion.</p>
    </>,
  },
  {
    id: 'developer', tocLabel: 'The Developer', title: 'The Developer',
    body: <p>SELVA Residences is being developed by Banyan Bay Development, the developer of the project (the &ldquo;Developer&rdquo;). This website and its contents are presented by the Developer and its authorised representatives. The Developer reserves the right to modify, revise or withdraw any or all of the materials presented at any time without prior notice.</p>,
  },
  {
    id: 'brokerage', tocLabel: <>Brokerage &amp; Sales</>, title: <>Brokerage &amp; Sales</>,
    body: <>
      <p>Exclusive sales and marketing are conducted by Meridian Residential. Cooperating brokers are welcome and must register a prospective purchaser in accordance with the developer&rsquo;s registration policy. Brokerage participation is subject to the terms in effect at the time of registration.</p>
      <p>For sales enquiries, contact the sales gallery at <a href="mailto:sales@selvaresidences.com">sales@selvaresidences.com</a> or <a href="tel:+13055550100">305.555.0100</a>.</p>
    </>,
  },
  {
    id: 'trademarks', tocLabel: 'Trademarks', title: 'Trademarks',
    body: <p>&ldquo;SELVA,&rdquo; &ldquo;SELVA Residences&rdquo; and the associated logos and wordmarks are marks of the Developer. All other trademarks, service marks and trade names referenced on this website are the property of their respective owners. Nothing on this website should be construed as granting any licence or right to use any mark displayed without the written permission of its owner.</p>,
  },
  {
    id: 'housing', tocLabel: 'Equal Housing', title: 'Equal Housing Opportunity',
    body: <p>SELVA Residences supports the principles of equal housing opportunity. Residences are offered without regard to race, colour, religion, sex, national origin, familial status, disability or any other class protected under applicable fair-housing laws.</p>,
  },
  {
    id: 'oral', tocLabel: 'Oral Representations', title: 'Oral Representations',
    body: <p>Oral representations cannot be relied upon as correctly stating the representations of the Developer. No statement made by any sales representative, broker or other party should be relied upon unless it is set forth in the formal purchase and sale documentation. Prospective purchasers should refer to that documentation for the representations and disclosures applicable to a purchase.</p>,
  },
  {
    id: 'thirdparty', tocLabel: 'Third-Party Content', title: <>Third-Party Content &amp; Links</>,
    body: <>
      <p>This website may reference or link to third-party services, including the interactive availability tool embedded on the Residences page. The Developer is not responsible for the content, accuracy or practices of third-party services, and such references do not constitute an endorsement. Any data presented through third-party tools is subject to the terms and limitations of those providers.</p>
      <p>For questions about these notices, please contact <a href="mailto:sales@selvaresidences.com">sales@selvaresidences.com</a>.</p>
    </>,
  },
];

export default function LegalPage() {
  return (
    <>
      <main>
        <LegalDoc
          title="Legal"
          lead="The notices and disclaimers that govern this website and the materials presented within it."
          intro="SELVA Residences is a fictional pre-sales development presented for demonstration purposes. The following notices outline how the information, imagery and figures on this website should be understood. By using this site you acknowledge and accept the terms below."
          sections={SECTIONS}
        />
      </main>
      <HomeScript />
    </>
  );
}
