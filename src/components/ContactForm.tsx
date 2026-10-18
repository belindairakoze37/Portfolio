import { useState, type ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { contactSchema, type ContactValues } from '../lib/validation';
import { profile } from '../data/profile';

type SubmitState = { kind: 'idle' } | { kind: 'success' } | { kind: 'error'; message: string };

export function ContactForm({ variant = 'default' }: { variant?: 'default' | 'page' }) {
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: 'idle' });
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactValues) {
    setSubmitState({ kind: 'idle' });
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
      if (!response.ok) {
        if (response.status === 429) throw new Error('Too many messages were sent recently. Please wait a moment and try again.');
        throw new Error(result?.errors?.map((item) => item.message).filter(Boolean).join(' ') || 'The message could not be sent. Please try again or email Belinda directly.');
      }
      if (result?.success === false) throw new Error(result.message || 'The message could not be sent. Please try again or email Belinda directly.');
      setSubmitState({ kind: 'success' });
      reset();
    } catch (error) {
      setSubmitState({ kind: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please try again or email Belinda directly.' });
    }
  }

  return (
    <form className={variant === 'page' ? 'contact-form contact-page-form' : 'contact-form'} onSubmit={handleSubmit(onSubmit)} noValidate>
      <input className="honeypot" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('_honey')} />
      <div className="form-row">
        <Field label={variant === 'page' ? 'Name' : 'Your name'} name="name" error={errors.name?.message}><input id="name" autoComplete="name" placeholder="Your name" {...register('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} /></Field>
        <Field label={variant === 'page' ? 'Email' : 'Email address'} name="email" error={errors.email?.message}><input id="email" type="email" autoComplete="email" placeholder="you@company.com" {...register('email')} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} /></Field>
      </div>
      <Field label={variant === 'page' ? 'Subject' : 'Subject (optional)'} name="subject" error={errors.subject?.message}><input id="subject" placeholder="What’s this about?" {...register('subject')} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} /></Field>
      <Field label="Message" name="message" error={errors.message?.message}><textarea id="message" rows={5} placeholder="Tell me about the role or project" {...register('message')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} /></Field>
      {submitState.kind === 'success' && <p className="form-status success" role="status">Your message was accepted. If this is the first submission, Belinda must confirm the FormSubmit email to activate delivery.</p>}
      {submitState.kind === 'error' && <p className="form-status error" role="alert">{submitState.message}</p>}
      <button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span></button>
    </form>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: ReactNode }) {
  return <div className="form-field"><label htmlFor={name}>{label}</label>{children}{error && <span id={`${name}-error`} className="field-error">{error}</span>}</div>;
}
