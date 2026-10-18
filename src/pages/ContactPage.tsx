import { Navigation } from '../components/Navigation';
import { ContactForm } from '../components/ContactForm';
import { profile } from '../data/profile';

export function ContactPage() {
  return <>
    <Navigation />
    <main className="page-shell content-page contact-page">
      <section className="contact-page-layout" aria-labelledby="contact-page-title">
        <div className="contact-page-copy">
          <p className="eyebrow">Contact</p>
          <h1 id="contact-page-title">Let’s talk about your team or project.</h1>
          <p className="contact-page-intro">Recruiters, engineering teams and freelance clients are all welcome.</p>
          <dl className="contact-details">
            <div><dt>Email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
            <div><dt>GitHub</dt><dd><a href={profile.github} target="_blank" rel="noreferrer">github.com/belindairakoze37</a></dd></div>
            <div><dt>LinkedIn</dt><dd><a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/belindairakoze</a></dd></div>
          </dl>
        </div>
        <div className="contact-page-panel"><ContactForm variant="page" /></div>
      </section>
    </main>
  </>;
}
