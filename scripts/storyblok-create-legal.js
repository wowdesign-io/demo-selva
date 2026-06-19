'use strict';
// Session 9 — Legal + Privacy
// Creates legal_section + legal_page block schemas, then creates/updates and
// publishes stories at slug "legal" and "privacy".
// Run: node scripts/storyblok-create-legal.js

const TOKEN    = process.env.STORYBLOK_PERSONAL_TOKEN;
const SPACE_ID = '293255653505523';

// ---------------------------------------------------------------------------
// Richtext helpers
// ---------------------------------------------------------------------------
function p(...content) { return { type: 'paragraph', content }; }
function t(str)        { return { type: 'text', text: str }; }
function bold(str)     { return { type: 'text', text: str, marks: [{ type: 'bold' }] }; }
function link(href, str) { return { type: 'text', text: str, marks: [{ type: 'link', attrs: { href, target: '_blank', linktype: 'url' } }] }; }
function h3(...content) { return { type: 'heading', attrs: { level: 3 }, content }; }
function ul(items)     { return { type: 'bullet_list', content: items.map(li => ({ type: 'list_item', content: [p(...li)] })) }; }
function doc(...content) { return { type: 'doc', content }; }

// ---------------------------------------------------------------------------
// Block schemas
// ---------------------------------------------------------------------------
const BLOCKS = [
  {
    name: 'legal_section',
    display_name: 'Legal Section',
    is_root: false, is_nestable: true,
    schema: {
      section_id: { type: 'text',      pos: 0, display_name: 'Section ID (anchor)',  description: 'No spaces, e.g. "offer" or "thirdparty"' },
      toc_label:  { type: 'text',      pos: 1, display_name: 'TOC Label' },
      title:      { type: 'text',      pos: 2, display_name: 'Section Heading' },
      body:       { type: 'richtext',  pos: 3, display_name: 'Body',
        customize_toolbar: true,
        toolbar: ['bold', 'italic', 'link', 'paragraph', 'heading3', 'olist', 'ulist'],
      },
    },
  },
  {
    name: 'legal_page',
    display_name: 'Legal Document',
    is_root: true, is_nestable: false,
    schema: {
      page_title: { type: 'text',     pos: 0, display_name: 'Page Title', description: 'e.g. "Legal" or "Privacy Policy"' },
      lead:       { type: 'text',     pos: 1, display_name: 'Lead (subtitle under title)' },
      intro:      { type: 'textarea', pos: 2, display_name: 'Intro Paragraph' },
      updated:    { type: 'text',     pos: 3, display_name: 'Last Updated', description: 'e.g. "June 2026"' },
      sections:   { type: 'bloks',    pos: 4, display_name: 'Sections',
        restrict_components: true,
        component_whitelist: ['legal_section'],
      },
    },
  },
];

// ---------------------------------------------------------------------------
// Story content
// ---------------------------------------------------------------------------
const LEGAL_SECTIONS = [
  {
    section_id: 'offer', toc_label: 'No Offer or Solicitation', title: 'No Offer or Solicitation',
    body: doc(
      p(t("The materials on this website do not constitute an offer to sell, or the solicitation of an offer to buy, a unit in any jurisdiction where prior registration or other qualification is required. Nothing herein shall be construed as a representation, warranty or guarantee. No statement should be relied upon as the basis of a purchase decision; any prospective purchaser should consult the formal purchase and sale documentation and seek independent professional advice."))
    ),
  },
  {
    section_id: 'renderings', toc_label: 'Renderings & Conceptions', title: "Renderings & Artist's Conceptions",
    body: doc(
      p(t("All images, renderings, floor plans and depictions on this website are artist's conceptions and are conceptual only. They are provided for illustrative purposes, may be enhanced or stylised, and are not intended to be, nor should they be relied upon as, an accurate representation of the final product.")),
      p(t("Views, landscaping, finishes, fixtures, furnishings and architectural details are illustrative and subject to change without notice. Furnishings, accessories and decorator items are not included with any residence. Floor plans labelled as conceptual or estimated are not construction drawings and are not to scale."))
    ),
  },
  {
    section_id: 'pricing', toc_label: 'Pricing & Specifications', title: 'Pricing, Availability & Specifications',
    body: doc(
      p(t("Prices, availability, dimensions, square footage, models and specifications are estimates, are subject to change at any time without notice, and may vary among residences. Square-footage figures are approximate and may be measured using methods that differ from those a purchaser may use; actual areas may vary from those shown.")),
      p(t("SELVA Residences comprises forty residences across three storeys, with delivery anticipated in mid-2027. Such figures, together with any timelines, are projections only and are not guaranteed. The developer reserves the right to make modifications, revisions and changes it deems desirable in its sole and absolute discretion."))
    ),
  },
  {
    section_id: 'developer', toc_label: 'The Developer', title: 'The Developer',
    body: doc(
      p(t('SELVA Residences is being developed by Banyan Bay Development, the developer of the project (the “Developer”). This website and its contents are presented by the Developer and its authorised representatives. The Developer reserves the right to modify, revise or withdraw any or all of the materials presented at any time without prior notice.'))
    ),
  },
  {
    section_id: 'brokerage', toc_label: 'Brokerage & Sales', title: 'Brokerage & Sales',
    body: doc(
      p(t("Exclusive sales and marketing are conducted by Meridian Residential. Cooperating brokers are welcome and must register a prospective purchaser in accordance with the developer’s registration policy. Brokerage participation is subject to the terms in effect at the time of registration.")),
      p(t("For sales enquiries, contact the sales gallery at "), link("mailto:sales@selvaresidences.com", "sales@selvaresidences.com"), t(" or "), link("tel:+13055550100", "305.555.0100"), t("."))
    ),
  },
  {
    section_id: 'trademarks', toc_label: 'Trademarks', title: 'Trademarks',
    body: doc(
      p(t('“SELVA,” “SELVA Residences” and the associated logos and wordmarks are marks of the Developer. All other trademarks, service marks and trade names referenced on this website are the property of their respective owners. Nothing on this website should be construed as granting any licence or right to use any mark displayed without the written permission of its owner.'))
    ),
  },
  {
    section_id: 'housing', toc_label: 'Equal Housing', title: 'Equal Housing Opportunity',
    body: doc(
      p(t("SELVA Residences supports the principles of equal housing opportunity. Residences are offered without regard to race, colour, religion, sex, national origin, familial status, disability or any other class protected under applicable fair-housing laws."))
    ),
  },
  {
    section_id: 'oral', toc_label: 'Oral Representations', title: 'Oral Representations',
    body: doc(
      p(t("Oral representations cannot be relied upon as correctly stating the representations of the Developer. No statement made by any sales representative, broker or other party should be relied upon unless it is set forth in the formal purchase and sale documentation. Prospective purchasers should refer to that documentation for the representations and disclosures applicable to a purchase."))
    ),
  },
  {
    section_id: 'thirdparty', toc_label: 'Third-Party Content', title: 'Third-Party Content & Links',
    body: doc(
      p(t("This website may reference or link to third-party services, including the interactive availability tool embedded on the Residences page. The Developer is not responsible for the content, accuracy or practices of third-party services, and such references do not constitute an endorsement. Any data presented through third-party tools is subject to the terms and limitations of those providers.")),
      p(t("For questions about these notices, please contact "), link("mailto:sales@selvaresidences.com", "sales@selvaresidences.com"), t("."))
    ),
  },
];

const PRIVACY_SECTIONS = [
  {
    section_id: 'collect', toc_label: 'Information We Collect', title: 'Information We Collect',
    body: doc(
      p(t("We collect information you provide directly and information gathered automatically as you browse.")),
      h3(t("Information you give us")),
      ul([
        [bold("Contact details"), t(" — name, email address and phone number submitted through enquiry forms or the sales gallery.")],
        [bold("Preferences"), t(" — the residences, models or amenities you ask about, and any notes you share with our sales team.")],
        [bold("Correspondence"), t(" — the content of messages you send to us by email or through the site.")],
      ]),
      h3(t("Information collected automatically")),
      ul([
        [bold("Usage data"), t(" — pages viewed, time on site, referring links and similar activity.")],
        [bold("Device data"), t(" — browser type, operating system, approximate location and IP address.")],
      ])
    ),
  },
  {
    section_id: 'use', toc_label: 'How We Use It', title: 'How We Use Your Information',
    body: doc(
      p(t("We use the information we collect to:")),
      ul([
        [t("Respond to enquiries and arrange private viewings at the sales gallery.")],
        [t("Share brochures, floor plans, pricing and availability you request.")],
        [t("Keep you informed about the development, where you have asked to hear from us.")],
        [t("Operate, maintain and improve the website and understand how it is used.")],
        [t("Comply with applicable legal obligations and protect against misuse.")],
      ])
    ),
  },
  {
    section_id: 'cookies', toc_label: 'Cookies & Analytics', title: 'Cookies & Analytics',
    body: doc(
      p(t("This website uses cookies and similar technologies to enable core functionality, remember your preferences and measure engagement. Analytics cookies help us understand which content is most useful so we can refine the experience.")),
      p(t("You can control or disable cookies through your browser settings. Disabling certain cookies may affect the availability of some features. Where required, we request consent before setting non-essential cookies."))
    ),
  },
  {
    section_id: 'share', toc_label: 'How We Share', title: 'How We Share Information',
    body: doc(
      p(t("We do not sell your personal information. We may share it with:")),
      ul([
        [bold("Our sales & marketing partner"), t(", Meridian Residential, to respond to your enquiry and manage the pre-sales process.")],
        [bold("Service providers"), t(" who host the website, deliver email or provide analytics on our behalf, under appropriate confidentiality obligations.")],
        [bold("Authorities or advisors"), t(" where disclosure is required by law or necessary to protect legal rights.")],
      ])
    ),
  },
  {
    section_id: 'retention', toc_label: 'Data Retention', title: 'Data Retention',
    body: doc(
      p(t("We retain personal information for as long as needed to fulfil the purposes described in this policy, to maintain our relationship with prospective purchasers, and to meet legal and record-keeping requirements. When information is no longer needed, we take reasonable steps to delete or anonymise it."))
    ),
  },
  {
    section_id: 'rights', toc_label: 'Your Choices & Rights', title: 'Your Choices & Rights',
    body: doc(
      p(t("Depending on your location, you may have the right to access, correct, delete or restrict the use of your personal information, and to object to certain processing. You may also opt out of marketing communications at any time using the unsubscribe link in our emails or by contacting us.")),
      p(t("To exercise any of these rights, email "), link("mailto:privacy@selvaresidences.com", "privacy@selvaresidences.com"), t(". We will respond within a reasonable period and in accordance with applicable law."))
    ),
  },
  {
    section_id: 'security', toc_label: 'Data Security', title: 'Data Security',
    body: doc(
      p(t("We use reasonable administrative, technical and organisational measures designed to protect personal information against loss, misuse and unauthorised access. No method of transmission or storage is completely secure, however, and we cannot guarantee absolute security."))
    ),
  },
  {
    section_id: 'thirdparty', toc_label: 'Third-Party Embeds', title: 'Third-Party Links & Embeds',
    body: doc(
      p(t("This website may link to, or embed, third-party services — including the interactive availability tool on the Residences page. Those services are governed by their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices or content of third parties."))
    ),
  },
  {
    section_id: 'children', toc_label: "Children's Privacy", title: "Children's Privacy",
    body: doc(
      p(t("This website is intended for adults and is not directed to children. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it."))
    ),
  },
  {
    section_id: 'changes', toc_label: 'Changes & Contact', title: 'Changes & Contact',
    body: doc(
      p(t("We may update this Privacy Policy from time to time. When we do, we will revise the date shown above. Material changes will be communicated where appropriate. Your continued use of the website after an update constitutes acceptance of the revised policy.")),
      p(t("If you have questions about this policy or how your information is handled, contact us at "), link("mailto:privacy@selvaresidences.com", "privacy@selvaresidences.com"), t(" or by post at our sales gallery, 3000 Hibiscus Lane, Coconut Grove, Miami, FL 33133."))
    ),
  },
];

function uid()   { return Math.random().toString(36).slice(2, 10); }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function makeSectionBlok(s) {
  return {
    _uid: uid(),
    component: 'legal_section',
    section_id: s.section_id,
    toc_label:  s.toc_label,
    title:      s.title,
    body:       s.body,
  };
}

const STORIES = [
  {
    name: 'Legal',
    slug: 'legal',
    content: {
      _uid: uid(),
      component: 'legal_page',
      page_title: 'Legal',
      lead: 'The notices and disclaimers that govern this website and the materials presented within it.',
      intro: 'SELVA Residences is a fictional pre-sales development presented for demonstration purposes. The following notices outline how the information, imagery and figures on this website should be understood. By using this site you acknowledge and accept the terms below.',
      updated: 'June 2026',
      sections: LEGAL_SECTIONS.map(makeSectionBlok),
    },
  },
  {
    name: 'Privacy Policy',
    slug: 'privacy',
    content: {
      _uid: uid(),
      component: 'legal_page',
      page_title: 'Privacy Policy',
      lead: 'How we collect, use and protect the information you share with us as you explore SELVA Residences.',
      intro: 'This Privacy Policy explains how SELVA Residences and its developer, Banyan Bay Development, handle personal information collected through this website. SELVA Residences is a fictional development presented for demonstration purposes; this policy is provided as a representative example. By using this website you consent to the practices described below.',
      updated: 'June 2026',
      sections: PRIVACY_SECTIONS.map(makeSectionBlok),
    },
  },
];

// ---------------------------------------------------------------------------
// API helpers (same pattern as storyblok-create-press.js)
// ---------------------------------------------------------------------------
async function upsertBlock(block) {
  const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components/?search=${block.name}`, {
    headers: { Authorization: TOKEN },
  });
  const d = await r.json();
  const existing = d.components?.find(c => c.name === block.name);
  const payload  = { component: { name: block.name, display_name: block.display_name, schema: block.schema, is_root: block.is_root, is_nestable: block.is_nestable } };

  if (existing) {
    const u = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components/${existing.id}`, {
      method: 'PUT', headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const ud = await u.json();
    console.log(`  ✓ Updated block: ${block.name} (id ${ud.component?.id ?? existing.id})`);
  } else {
    const c = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components/`, {
      method: 'POST', headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const cd = await c.json();
    console.log(`  ✓ Created block: ${block.name} (id ${cd.component?.id})`);
  }
}

async function findStory(slug) {
  const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/?slug=${slug}`, {
    headers: { Authorization: TOKEN },
  });
  const d = await r.json();
  return d.stories?.find(s => s.slug === slug) ?? null;
}

async function upsertStory(story) {
  const payload = { story: { name: story.name, slug: story.slug, content: story.content } };
  const existing = await findStory(story.slug);

  let storyId;
  if (existing) {
    const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${existing.id}`, {
      method: 'PUT', headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const d = await r.json();
    if (!r.ok) { console.error(`    PUT failed: ${JSON.stringify(d)}`); return null; }
    storyId = existing.id;
    console.log(`  ✓ Updated story: ${story.slug} (id ${storyId})`);
  } else {
    const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/`, {
      method: 'POST', headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const d = await r.json();
    if (!r.ok) { console.error(`    POST failed: ${JSON.stringify(d)}`); return null; }
    storyId = d.story?.id;
    console.log(`  ✓ Created story: ${story.slug} (id ${storyId})`);
  }
  return storyId;
}

async function publishStory(storyId) {
  const r = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${storyId}/publish`, {
    method: 'GET', headers: { Authorization: TOKEN },
  });
  if (r.ok) console.log(`  ✓ Published story id ${storyId}`);
  else { const d = await r.json(); console.error(`  ✗ Publish failed for ${storyId}: ${JSON.stringify(d)}`); }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  if (!TOKEN) { console.error('STORYBLOK_PERSONAL_TOKEN not set'); process.exit(1); }

  console.log('\n=== Session 9: Legal + Privacy ===\n');

  console.log('1. Upserting block schemas...');
  for (const block of BLOCKS) await upsertBlock(block);

  await sleep(500);
  console.log('\n2. Upserting stories...');
  const ids = [];
  for (const story of STORIES) {
    await sleep(400);
    const id = await upsertStory(story);
    if (id) ids.push(id);
  }

  console.log('\n3. Publishing...');
  for (const id of ids) {
    await sleep(400);
    await publishStory(id);
  }

  console.log('\nDone. Both stories are live on the Storyblok CDN.\n');
})();
