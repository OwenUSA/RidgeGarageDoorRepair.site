// STUB: no submission target
// components/sections/ContactFormBlock.tsx
// Contract row: docs/sections.md, our-section-id `contact-form-block`.
// Copy: content/copy.ts `contact.form-block` on route `/contact`. Read it, never rewrite it.
//
// docs/behavior/06-form-states.md is the governing spec: validate on blur and on submit
// only (never on change), color is never the only carrier of the error state, the whole
// form is REPLACED by a confirmation panel on success (not a toast), and there is no
// backend of any kind (D-18, D-05).

'use client';

import { useId, useRef, useState, type FormEvent, type FocusEvent } from 'react';
import { AlertCircle, CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { dataSection, getSection } from '@/lib/sections';

type FieldName = 'name' | 'phone' | 'symptom' | 'window' | 'message';

type FormState = {
  name: string;
  phone: string;
  symptom: string;
  window: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  phone: '',
  symptom: '',
  window: '',
  message: '',
};

const WINDOW_OPTIONS = ['Morning', 'Midday', 'Afternoon', 'Evening'];

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

function formatPhone(value: string): string {
  const digits = digitsOnly(value).slice(0, 10);
  if (digits.length < 10) return value;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

function validateField(name: FieldName, state: FormState): string {
  switch (name) {
    case 'name':
      return state.name.trim().length > 0 ? '' : 'Enter your name';
    case 'phone':
      return digitsOnly(state.phone).length === 10 ? '' : 'Enter a 10-digit phone number';
    case 'symptom':
      return state.symptom ? '' : 'Choose the closest match';
    case 'window':
      return state.window ? '' : 'Choose a callback window';
    case 'message':
      return '';
    default:
      return '';
  }
}

export default function ContactFormBlock() {
  const s = getSection('/contact', 'contact.form-block');
  const symptoms = getSection('/services', 'services.symptoms');

  const uid = useId();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState('');

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const symptomRef = useRef<HTMLSelectElement>(null);
  const windowRef = useRef<HTMLSelectElement>(null);
  const doneHeadingRef = useRef<HTMLHeadingElement>(null);

  const fieldRefs: Record<FieldName, React.RefObject<HTMLInputElement | HTMLSelectElement | null>> = {
    name: nameRef,
    phone: phoneRef,
    symptom: symptomRef,
    window: windowRef,
    message: nameRef,
  };

  function handleBlurValidate(name: FieldName) {
    return (_e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      if (name === 'phone') {
        setValues((prev) => ({ ...prev, phone: formatPhone(prev.phone) }));
      }
      setErrors((prev) => ({ ...prev, [name]: validateField(name, values) }));
    };
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fields: FieldName[] = ['name', 'phone', 'symptom', 'window', 'message'];
    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of fields) {
      nextErrors[field] = validateField(field, values);
    }
    setErrors(nextErrors);

    const firstInvalid = fields.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setSummary('Please fix the highlighted field before submitting.');
      const ref = fieldRefs[firstInvalid];
      ref.current?.focus();
      return;
    }

    setSummary('');
    setSubmitted(true);
    // eslint-disable-next-line no-console
    console.warn('STUB: no submission target — this form has no backend and sends nothing.');
  }

  if (submitted) {
    return (
      <section className="band" data-section={dataSection(s.id)}>
        <div className="u-container">
          <div className="formdone">
            <h3 ref={doneHeadingRef} tabIndex={-1}>
              <CheckCircle2 size={24} strokeWidth={2} aria-hidden="true" />
              Request received
            </h3>
            <p>{s.note}</p>
          </div>
        </div>
      </section>
    );
  }

  const errId = (name: FieldName) => `${uid}-${name}-err`;

  return (
    <section className="band" data-section={dataSection(s.id)}>
      <div className="u-container split split--wide-text">
        <div>
          <div className="sec-head">
            <p className="u-eyebrow">{s.subheading}</p>
            <h2>{s.heading}</h2>
            <p className="u-muted">{s.body?.[0]}</p>
            <p className="u-muted">{s.body?.[1]}</p>
          </div>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="field__label" htmlFor={`${uid}-name`}>
                {s.items?.[0]} <span className="field__req">(required)</span>
              </label>
              <input
                ref={nameRef}
                id={`${uid}-name`}
                type="text"
                name="name"
                required
                value={values.name}
                onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
                onBlur={handleBlurValidate('name')}
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errId('name')}
              />
              <p className="field__err" id={errId('name')}>
                {errors.name && (
                  <>
                    <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
                    {errors.name}
                  </>
                )}
              </p>
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`${uid}-phone`}>
                {s.items?.[1]} <span className="field__req">(required)</span>
              </label>
              <input
                ref={phoneRef}
                id={`${uid}-phone`}
                type="tel"
                name="phone"
                required
                inputMode="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => setValues((prev) => ({ ...prev, phone: e.target.value }))}
                onBlur={handleBlurValidate('phone')}
                aria-invalid={errors.phone ? 'true' : undefined}
                aria-describedby={errId('phone')}
              />
              <p className="field__err" id={errId('phone')}>
                {errors.phone && (
                  <>
                    <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
                    {errors.phone}
                  </>
                )}
              </p>
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`${uid}-symptom`}>
                {s.items?.[2]} <span className="field__req">(required)</span>
              </label>
              <select
                ref={symptomRef}
                id={`${uid}-symptom`}
                name="symptom"
                required
                value={values.symptom}
                onChange={(e) => setValues((prev) => ({ ...prev, symptom: e.target.value }))}
                onBlur={handleBlurValidate('symptom')}
                aria-invalid={errors.symptom ? 'true' : undefined}
                aria-describedby={errId('symptom')}
              >
                <option value="" disabled>
                  Choose the closest match
                </option>
                {symptoms.cards?.map((card) => (
                  <option key={card.heading} value={card.heading}>
                    {card.heading}
                  </option>
                ))}
              </select>
              <p className="field__err" id={errId('symptom')}>
                {errors.symptom && (
                  <>
                    <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
                    {errors.symptom}
                  </>
                )}
              </p>
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`${uid}-window`}>
                {s.items?.[3]} <span className="field__req">(required)</span>
              </label>
              <select
                ref={windowRef}
                id={`${uid}-window`}
                name="window"
                required
                value={values.window}
                onChange={(e) => setValues((prev) => ({ ...prev, window: e.target.value }))}
                onBlur={handleBlurValidate('window')}
                aria-invalid={errors.window ? 'true' : undefined}
                aria-describedby={errId('window')}
              >
                <option value="" disabled>
                  Choose a callback window
                </option>
                {WINDOW_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <p className="field__err" id={errId('window')}>
                {errors.window && (
                  <>
                    <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
                    {errors.window}
                  </>
                )}
              </p>
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`${uid}-message`}>
                {s.items?.[4]}
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                value={values.message}
                onChange={(e) => setValues((prev) => ({ ...prev, message: e.target.value }))}
              />
              <p className="field__err" id={errId('message')} />
            </div>

            <p aria-live="polite" className="form__note">
              {summary}
            </p>

            <button className="u-btn u-btn--call form__submit" type="submit">
              <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
              {s.ctas?.[0]}
            </button>
          </form>
        </div>

        <div className="split__media">
          <div className="napcard">
            <div className="napcard__row">
              <Phone size={20} strokeWidth={2} aria-hidden="true" />
              <div>
                <p className="napcard__k">Phone</p>
                <p className="napcard__v">
                  <a href={business.phone.href}>{business.phone.display}</a>
                </p>
              </div>
            </div>
            <div className="napcard__row">
              <Clock size={20} strokeWidth={2} aria-hidden="true" />
              <div>
                <p className="napcard__k">Hours</p>
                <p className="napcard__v">{business.hours.display}</p>
              </div>
            </div>
            <div className="napcard__row">
              <MapPin size={20} strokeWidth={2} aria-hidden="true" />
              <div>
                <p className="napcard__k">Address</p>
                <p className="napcard__v">{business.address.oneLine}</p>
              </div>
            </div>
          </div>
          <p className="u-muted">{business.serviceArea}</p>
        </div>
      </div>
    </section>
  );
}
