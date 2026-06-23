'use client';

import Image from 'next/image'
import { useRef, useState, type FormEvent } from 'react';

/* Ports selva/inquiry.js: native HTML5 validation runs, then the real submit
   is prevented and the form swaps for an inline thank-you state. Client-only
   demo — no backend, nothing persisted. The contact/location aside is static
   but lives inside `.inquiry`, so it's rendered here too. */

interface Props {
  label1?: string
  item1?: string
  item2?: string
  label2?: string
  subLabel?: string
  bodyText?: string
  image?: string
  imageAlt?: string
  caption?: string
  label3?: string
  note?: string
}

export default function InquiryForm({
  label1   = 'Sales Gallery',
  item1    = '305.555.0100',
  item2    = 'sales@selvaresidences.com',
  label2   = 'Visit',
  subLabel = 'By Appointment',
  bodyText = '3000 Hibiscus Lane,\nCoconut Grove, Miami, FL 33133',
  image    = '',
  imageAlt = '',
  caption  = 'Coconut Grove, Miami',
  label3   = 'Hours',
  note     = 'Monday–Saturday, 10am–6pm\nSunday by appointment',
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [firstName, setFirstName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    setSent(true);
  };

  return (
    <section className={`inquiry${sent ? ' is-sent' : ''}`} data-screen-label="Inquiry">

      {/* Form column */}
      <div className="inquiry__formCol">
        <form ref={formRef} className="inquiry__form" noValidate onSubmit={handleSubmit}>
          <p className="inquiry__req">Fields marked <span style={{ color: 'var(--color-accent)' }}>*</span> are required.</p>
          <div className="inquiry__grid">

            <div className="inquiry__field">
              <label className="inquiry__label" htmlFor="firstName">First Name <span className="req">*</span></label>
              <input className="inquiry__input" type="text" id="firstName" name="firstName" autoComplete="given-name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="inquiry__field">
              <label className="inquiry__label" htmlFor="lastName">Last Name <span className="req">*</span></label>
              <input className="inquiry__input" type="text" id="lastName" name="lastName" autoComplete="family-name" required />
            </div>

            <div className="inquiry__field">
              <label className="inquiry__label" htmlFor="email">Email <span className="req">*</span></label>
              <input className="inquiry__input" type="email" id="email" name="email" autoComplete="email" required />
            </div>
            <div className="inquiry__field">
              <label className="inquiry__label" htmlFor="phone">Phone</label>
              <input className="inquiry__input" type="tel" id="phone" name="phone" autoComplete="tel" />
            </div>

            <div className="inquiry__field">
              <label className="inquiry__label" htmlFor="interest">I&rsquo;m interested in <span className="req">*</span></label>
              <select className="inquiry__select" id="interest" name="interest" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Visiting the sales gallery</option>
                <option>Floor plans &amp; pricing</option>
                <option>General information</option>
              </select>
            </div>
            <div className="inquiry__field">
              <label className="inquiry__label" htmlFor="hear">How did you hear about us?</label>
              <select className="inquiry__select" id="hear" name="hear" defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Broker referral</option>
                <option>Friend or family</option>
                <option>Instagram</option>
                <option>Search</option>
                <option>Press</option>
                <option>Walked by</option>
                <option>Other</option>
              </select>
            </div>

            <div className="inquiry__field">
              <label className="inquiry__label" htmlFor="broker">Are you a broker?</label>
              <select className="inquiry__select" id="broker" name="broker" defaultValue="">
                <option value="" disabled>Select one</option>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div className="inquiry__field">
              <label className="inquiry__label" htmlFor="timeline">Purchase timeline</label>
              <select className="inquiry__select" id="timeline" name="timeline" defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Ready now</option>
                <option>Within 3 months</option>
                <option>Within 6&ndash;12 months</option>
                <option>Just exploring</option>
              </select>
            </div>

            <div className="inquiry__field inquiry__field--full">
              <label className="inquiry__label" htmlFor="message">Your message</label>
              <textarea className="inquiry__textarea" id="message" name="message" placeholder="Tell us what you&rsquo;re looking for&hellip;"></textarea>
            </div>

            <div className="inquiry__consent">
              <input className="inquiry__check" type="checkbox" id="consent" name="consent" required />
              <label className="inquiry__consentLabel" htmlFor="consent">I agree to be contacted by the SELVA sales team and accept the <a href="/legal">terms</a> and <a href="/privacy">privacy policy</a>. <span className="req" style={{ color: 'var(--color-accent)' }}>*</span></label>
            </div>

            <button className="btnSlide inquiry__submit" type="submit"><span>Send Inquiry</span><span aria-hidden="true">Send Inquiry</span></button>

          </div>
        </form>

        {/* success state */}
        <div className="inquiry__success" role="status" aria-live="polite">
          <h2>Thank you<span className="inquiry__successName">{firstName.trim() ? `, ${firstName.trim()}` : ''}</span>.</h2>
          <p>Your enquiry is on its way. A member of the SELVA sales team will be in touch shortly. In the meantime, you&rsquo;re welcome to <a href="/residences#digital-twin">explore the floor plans</a>.</p>
        </div>
      </div>

      {/* Contact / location aside */}
      <aside className="inquiry__aside">
        <div className="inquiry__block">
          <p className="inquiry__blockLabel">{label1}</p>
          <a className="inquiry__contactItem" href={`tel:${item1.replace(/[^+\d]/g, '')}`}>{item1}</a>
          <a className="inquiry__contactItem" href={`mailto:${item2}`}>{item2}</a>
        </div>
        <div className="inquiry__block">
          <p className="inquiry__blockLabel">{label2}</p>
          <p className="inquiry__address">
            <strong>{subLabel}</strong>
            {bodyText.split('\n').map((line, i) => <span key={i}>{line}{i < bodyText.split('\n').length - 1 ? <br /> : null}</span>)}
          </p>
          {image && (
            <figure className="inquiry__locFig">
              <div style={{ position: 'relative', height: '220px' }}>
                <Image fill src={image} alt={imageAlt ?? ''} quality={85} sizes="(max-width: 768px) 100vw, 45vw" style={{ objectFit: 'cover', objectPosition: 'center' }} loading="lazy" />
              </div>
              {caption && <figcaption className="inquiry__locCaption">{caption}</figcaption>}
            </figure>
          )}
        </div>
        <div className="inquiry__block">
          <p className="inquiry__blockLabel">{label3}</p>
          <p className="inquiry__address">
            {note.split('\n').map((line, i) => <span key={i}>{line}{i < note.split('\n').length - 1 ? <br /> : null}</span>)}
          </p>
        </div>
      </aside>

    </section>
  );
}
