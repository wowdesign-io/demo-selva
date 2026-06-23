import '@/styles/selva/inquiry-form.css'
import { storyblokEditable } from '@storyblok/react/rsc';
import InquiryForm from '../InquiryForm/InquiryForm';

export interface InquiryFormBlockBlok {
  _uid: string; component: 'inquiry_form_block'
  label_1?: string
  item_1?: string
  item_2?: string
  label_2?: string
  sub_label?: string
  body_text?: string
  image?: { filename: string; alt?: string }
  caption?: string
  label_3?: string
  note?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

// Wraps the client-side InquiryForm for Storyblok Visual Editor targeting.
// Webhook URL lives in INQUIRY_WEBHOOK_URL env var — never exposed to CMS.
export default function InquiryFormBlock({ blok }: { blok?: InquiryFormBlockBlok }) {
  return (
    <div {...(blok ? storyblokEditable(blok) : {})}>
      <InquiryForm
        label1={blok?.label_1}
        item1={blok?.item_1}
        item2={blok?.item_2}
        label2={blok?.label_2}
        subLabel={blok?.sub_label}
        bodyText={blok?.body_text}
        image={blok?.image?.filename}
        imageAlt={blok?.image?.alt}
        caption={blok?.caption}
        label3={blok?.label_3}
        note={blok?.note}
      />
    </div>
  );
}
