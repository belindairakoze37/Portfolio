import { useState, type ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Send } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldErrors } from 'react-hook-form';
import { contactSchema, type ContactValues } from '../lib/validation';
import { profile } from '../data/profile';

type SubmitState = 'idle' | 'success' | 'error' | 'unconfigured';

export function ContactForm({ variant = 'default' }: { variant?: 'default' | 'page' }) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', contact_ref: '' },
  });

  async function onSubmit(values: ContactValues) {
    setSubmitState('idle');

    // Honeypot: only bots fill this hidden field.
      if (values.contact_ref) {
      setSubmitState('error');
      return;
    }

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
    if (!endpoint || endpoint.includes('your_form_id')) {
      setSubmitState('unconfigured');
      return;
    }

    try {
      const subject = values.subject?.trim() || `Portfolio message from ${values.name}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject,
          message: values.message,
          _replyto: values.email,
          _subject: subject,
        }),
      });

      
      if (!response.ok) throw new Error(`Formspree responded with ${response.status}`);

      setSubmitState('success');
      reset();
    } catch (error) {
      if (import.meta.env.DEV) console.error('Contact form error:', error);
      setSubmitState('error');
    }
  }

  function onInvalid(formErrors: FieldErrors<ContactValues>) {
    if (import.meta.env.DEV) console.log('Invalid fields:', formErrors);
  }

  return (
    <form
      className={variant === 'page' ? 'contact-form contact-page-form' : 'contact-form'}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
    >
      <input
        className="honeypot"
        type="text"
        tabIndex={-1}
        autoComplete="nope"
        aria-hidden="true"
        {...register('contact_ref')}
      />
      <div className="form-row">
        <Field label={variant === 'page' ? 'Name' : 'Your name'} name="name" error={errors.name?.message}>
          <input
            id="name"
            autoComplete="name"
            placeholder="Your name"
            {...register('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </Field>
        <Field label={variant === 'page' ? 'Email' : 'Email address'} name="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            {...register('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>
      </div>
      <Field label={variant === 'page' ? 'Subject' : 'Subject (optional)'} name="subject" error={errors.subject?.message}>
        <input
          id="subject"
          placeholder="What’s this about?"
          {...register('subject')}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
      </Field>
      <Field label="Message" name="message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about the role or project"
          {...register('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
      </Field>

      <div aria-live="polite">
        {isSubmitting && (
          <div className="form-status" role="status">
            <Send className="form-status-icon" size={20} aria-hidden="true" />
            <div className="form-status-body">
              <strong className="form-status-title">Sending your message…</strong>
            </div>
          </div>
        )}
        {submitState === 'success' && (
          <div className="form-status success" role="status">
            <CheckCircle2 className="form-status-icon" size={20} aria-hidden="true" />
            <div className="form-status-body">
              <strong className="form-status-title">Thanks, your message has been sent.</strong>
              <p className="form-status-text">I’ll reply to the email you provided as soon as I can.</p>
            </div>
          </div>
        )}
        {submitState === 'error' && (
          <div className="form-status error" role="alert">
            <AlertTriangle className="form-status-icon" size={20} aria-hidden="true" />
            <div className="form-status-body">
              <strong className="form-status-title">Something went wrong and your message wasn’t sent.</strong>
              <p className="form-status-text">
                Please try again, or email me directly at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </p>
            </div>
          </div>
        )}
        {submitState === 'unconfigured' && (
          <div className="form-status error" role="alert">
            <AlertTriangle className="form-status-icon" size={20} aria-hidden="true" />
            <div className="form-status-body">
              <strong className="form-status-title">The form isn’t active right now. Please email me directly</strong>
              <p className="form-status-text">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
            </div>
          </div>
        )}
      </div>

      <button className="button button-primary" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'} <Send size={16} aria-hidden="true" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      {children}
      {error && (
        <span id={`${name}-error`} className="field-error">
          {error}
        </span>
      )}
    </div>
  );
}