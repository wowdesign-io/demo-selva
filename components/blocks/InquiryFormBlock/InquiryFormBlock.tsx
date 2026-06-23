import '@/styles/selva/inquiry-form.css'
import { storyblokEditable } from '@storyblok/react/rsc';
import InquiryForm from '../InquiryForm/InquiryForm';

export interface InquiryFormBlockBlok {
  _uid: string; component: 'inquiry_form_block'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

// Wraps the client-side InquiryForm for Storyblok Visual Editor targeting.
// Webhook URL lives in INQUIRY_WEBHOOK_URL env var — never exposed to CMS.
export default function InquiryFormBlock({ blok }: { blok?: InquiryFormBlockBlok }) {
  return (
    <div {...(blok ? storyblokEditable(blok) : {})}>
      <InquiryForm />
    </div>
  );
}
