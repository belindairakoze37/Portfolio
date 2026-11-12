import { useState } from 'react';
import {
  Accessibility,
  ArrowDown,
  Braces,
  CalendarCheck,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { profile } from '../data/profile';

const skillChips = ['React', 'TypeScript', 'Django REST Framework', 'REST APIs', 'Git', 'Testing'];

const values = [
  { icon: Braces, title: 'Clean code', detail: 'Readable, well-structured code that is easy to review and extend.' },
  { icon: Accessibility, title: 'Accessibility', detail: 'Interfaces that work with keyboards, screen readers and real constraints.' },
  { icon: ShieldCheck, title: 'Reliable software', detail: 'Clear contracts, validated inputs and tests that keep changes safe.' },
];

export function AboutPage() {
  const [portraitUnavailable, setPortraitUnavailable] = useState(false);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main" className="about-page container">
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-main">
            <div className="about-copy">
              <p className="eyebrow">ABOUT</p>
              <h1 id="about-title">Early-career engineer,<br className="about-title-break" /> serious about the fundamentals.</h1>
              <p className="about-lede">I’m  a full-stack software engineer through structured training and practical projects. I build accessible interfaces with React and TypeScript, connect them to APIs, and work with the data workflows behind reliable applications.</p>
              <p className="about-followup">I value clear communication, thoughtful problem-solving and testing that helps the whole system work together.</p>
              <p className="about-followup">I am an excellent team player who collaborates effectively with others to develop innovative solutions that best meet clients’ needs.</p>
            </div>
            <div className="about-actions">
              {profile.resumePath ? (
                <a className="button button-primary" href={profile.resumePath} download="Belinda-Irakoze-CV.pdf">Download resume <ArrowDown size={16} aria-hidden="true" /></a>
              ) : (
                <button className="button button-primary resume-disabled" type="button" disabled aria-label="Download resume; unavailable until a real PDF is added" title="Add your real resume PDF to enable this action">Download resume <ArrowDown size={16} aria-hidden="true" /></button>
              )}
              <Link className="button button-outline" to="/contact">Contact me <Mail size={16} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="about-aside">
            <div className={portraitUnavailable ? 'about-portrait photo-placeholder' : 'about-portrait'}>
              {portraitUnavailable ? (
                <div><strong>Belinda Irakoze</strong><span>Portrait unavailable</span></div>
              ) : (
                <img className="profile-portrait" src="/images/belinda-portrait-circle.jpg?v=2" alt="Irakoze Belinda" onError={() => setPortraitUnavailable(true)} />
              )}
            </div>
            <div className="profile-facts" role="group" aria-label="Profile details">
              <div><h2><MapPin size={14} aria-hidden="true" /> Location</h2><p>{profile.location}</p></div>
              <div><h2><GraduationCap size={14} aria-hidden="true" /> Training</h2><p>Refactory Academy apprenticeship, to <span className="nowrap">{profile.courseCompletion.replace('December ', 'Dec ')}</span></p></div>
              <div><h2><Target size={14} aria-hidden="true" /> Focus</h2><p>{profile.focus}</p></div>
              <div><h2><Layers size={14} aria-hidden="true" /> Stack</h2><p>React, TypeScript &amp; Django REST Framework</p></div>
              <div className="fact-wide"><h2><CalendarCheck size={14} aria-hidden="true" /> Availability</h2><p>Open to junior engineering roles</p></div>
            </div>
          </div>
        </section>

        <section className="about-toolkit" aria-labelledby="skills-title">
          <h2 id="skills-title" className="sr-only">Core skills</h2>
          <ul className="skill-chips">
            {skillChips.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </section>

        <section className="principles-section" aria-labelledby="principles-title">
          <h2 id="principles-title">What I care about</h2>
          <div className="principles-grid">
            {values.map(({ icon: Icon, title, detail }) => (
              <article className="principle-card" key={title}>
                <span className="value-icon"><Icon size={18} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
