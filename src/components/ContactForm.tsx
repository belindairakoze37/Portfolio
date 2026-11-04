import { useState, type ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Send } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { contactSchema, type ContactValues } from '../lib/validation';
import { profile } from '../data/profile';

type SubmitState = 'idle' | 'success' | 'error';

export function ContactForm({ variant = 'default' }: { variant?: 'default' | 'page' }) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactValues) {
    setSubmitState('idle');
    const endpoint = `https://formsubmit.co/ajax/${profile.email}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          _replyto: values.email,
          _subject: values.subject || `Portfolio message from ${values.name}`,
          _honey: values._honey || '',
        }),
      });
      const result: { success?: boolean | string; message?: string; errors?: { message?: string }[] } | null = typeof response.json === 'function'
        ? await response.json().catch(() => null)
        : null;
      if (!response.ok) throw new Error('Request failed');
      if (result?.success === false) throw new Error('Request rejected');
      setSubmitState('success');
      reset();
    } catch {
      setSubmitState('error');
    }
  }

  return (
    <form className={variant === 'page' ? 'contact-form contact-page-form' : 'contact-form'} onSubmit={handleSubmit(onSubmit)} noValidate>
      <input className="honeypot" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('_honey')} />
      <div className="form-row">
        <Field label={variant === 'page' ? 'Name' : 'Your name'} name="name" error={errors.name?.message}><input id="name" autoComplete="name" placeholder="Your name" required {...register('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} /></Field>
        <Field label={variant === 'page' ? 'Email' : 'Email address'} name="email" error={errors.email?.message}><input id="email" type="email" autoComplete="email" placeholder="you@company.com" required {...register('email')} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} /></Field>
      </div>
      <Field label={variant === 'page' ? 'Subject' : 'Subject (optional)'} name="subject" error={errors.subject?.message}><input id="subject" placeholder="What’s this about?" {...register('subject')} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} /></Field>
      <Field label="Message" name="message" error={errors.message?.message}><textarea id="message" rows={5} placeholder="Tell me about the role or project" required {...register('message')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} /></Field>
      {submitState === 'success' && (
        <div className="form-status success" role="status">
          <CheckCircle2 className="form-status-icon" size={20} aria-hidden="true" />
          <div className="form-status-body">
            <strong className="form-status-title">Thanks, your message is on its way.</strong>
            <p className="form-status-text">I’ll reply to the email you provided as soon as I can.</p>
          </div>
        </div>
      )}
      {submitState === 'error' && (
        <div className="form-status error" role="alert">
          <AlertTriangle className="form-status-icon" size={20} aria-hidden="true" />
          <div className="form-status-body">
            <strong className="form-status-title">Something went wrong and your message wasn’t sent.</strong>
            <p className="form-status-text">Please try again, or email me directly at <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p>
          </div>
        </div>
      )}
      <button className="button button-primary" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send message'} <Send size={16} aria-hidden="true" /></button>
    </form>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: ReactNode }) {
  return <div className="form-field"><label htmlFor={name}>{label}</label>{children}{error && <span id={`${name}-error`} className="field-error">{error}</span>}</div>;
}
