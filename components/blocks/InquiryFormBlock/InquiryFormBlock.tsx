import '@/styles/selva/inquiry-form.css'
import { storyblokEditable } from '@storyblok/react/rsc';
import InquiryForm from '../InquiryForm/InquiryForm';

export interface InquiryFormBlockBlok {
  _uid: string; component: 'inquiry_form_block'
  sales_gallery_label?: string
  phone?: string
  email?: string
  visit_label?: string
  address_label?: string
  address?: string
  location_image?: { filename: string; alt?: string }
  location_caption?: string
  hours_label?: string
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
        salesGalleryLabel={blok?.sales_gallery_label}
        phone={blok?.phone}
        email={blok?.email}
        visitLabel={blok?.visit_label}
        addressLabel={blok?.address_label}
        address={blok?.address}
        locationImage={blok?.location_image?.filename}
        locationImageAlt={blok?.location_image?.alt}
        locationCaption={blok?.location_caption}
        hoursLabel={blok?.hours_label}
        hours={blok?.hours}
      />
    </div>
  );
}
