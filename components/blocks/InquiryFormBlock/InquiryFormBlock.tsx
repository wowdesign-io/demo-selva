import '@/styles/selva/inquiry-form.css'
import { storyblokEditable } from '@storyblok/react/rsc';
import InquiryForm from '../InquiryForm/InquiryForm';

export interface InquiryFormBlockBlok {
  _uid: string; component: 'inquiry_form_block'
  label_1?: string
  phone?: string
  email?: string
  label_2?: string
  address_label?: string
  address?: string
  location_image?: { filename: string; alt?: string }
  location_caption?: string
  label_3?: string
  hours?: string
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
        phone={blok?.phone}
        email={blok?.email}
        label2={blok?.label_2}
        addressLabel={blok?.address_label}
        address={blok?.address}
        locationImage={blok?.location_image?.filename}
        locationImageAlt={blok?.location_image?.alt}
        locationCaption={blok?.location_caption}
        label3={blok?.label_3}
        hours={blok?.hours}
      />
    </div>
  );
}
