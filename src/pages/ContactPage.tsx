import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { ContactForm } from '../components/ContactForm';
import { profile } from '../data/profile';

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const helper = document.createElement('textarea');
  helper.value = value;
  helper.setAttribute('readonly', '');
  helper.style.position = 'fixed';
  helper.style.opacity = '0';
  document.body.appendChild(helper);
  helper.select();
  document.execCommand('copy');
  document.body.removeChild(helper);
}

export function ContactPage() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function handleCopyEmail() {
    try {
      await copyText(profile.email);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return <>
    <Navigation />
    <main className="page-shell content-page contact-page">
      <section className="contact-page-layout" aria-labelledby="contact-page-title">
        <div className="contact-page-copy">
          <p className="eyebrow">Contact</p>
          <h1 id="contact-page-title">Let’s talk about your team or project.</h1>
          <p className="contact-page-intro">Recruiters, engineering teams and freelance clients are all welcome.</p>

          <ul className="contact-cards">
            <li className="contact-card">
              <span className="contact-card-icon" aria-hidden="true"><Mail size={17} /></span>
              <span className="contact-card-body">
                <span className="contact-card-label">Email</span>
                <a className="contact-card-value contact-card-stretched" href={`mailto:${profile.email}`}>{profile.email}</a>
              </span>
              <button type="button" className="copy-email" onClick={handleCopyEmail}>
                {copied ? <><Check size={14} aria-hidden="true" /> Copied</> : <><Copy size={14} aria-hidden="true" /> Copy email</>}
              </button>
            </li>
            <li className="contact-card">
              <span className="contact-card-icon" aria-hidden="true"><Github size={17} /></span>
              <span className="contact-card-body">
                <span className="contact-card-label">GitHub</span>
                <a className="contact-card-value contact-card-stretched" href={profile.github} target="_blank" rel="noopener noreferrer">github.com/belindairakoze37</a>
              </span>
              <ArrowUpRight className="contact-card-arrow" size={16} aria-hidden="true" />
            </li>
            <li className="contact-card">
              <span className="contact-card-icon" aria-hidden="true"><Linkedin size={17} /></span>
              <span className="contact-card-body">
                <span className="contact-card-label">LinkedIn</span>
                <a className="contact-card-value contact-card-stretched" href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/belindairakoze</a>
              </span>
              <ArrowUpRight className="contact-card-arrow" size={16} aria-hidden="true" />
            </li>
          </ul>

          <p className="contact-availability"><span className="contact-availability-dot" aria-hidden="true" />Open to junior engineering roles</p>
        </div>
        <div className="contact-page-panel"><ContactForm variant="page" /></div>
      </section>
    </main>
    <footer className="site-footer contact-footer">
      <span className="brand">Belinda Irakoze</span>
      <nav className="site-footer-links" aria-label="Social profiles">
        <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </nav>
      <p>Built with React and Django REST Framework</p>
    </footer>
  </>;
}
