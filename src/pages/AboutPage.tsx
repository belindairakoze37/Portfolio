import { ArrowDown, MapPin } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { profile } from '../data/profile';

const principles = [
  { title: 'Reliable APIs', detail: 'Clear contracts, validation and sensible error handling.' },
  { title: 'Tested code', detail: 'Automated tests so changes are easier to trust.' },
  { title: 'Continuous learning', detail: 'Collaboration, feedback and steady improvement.' },
];

export function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main" className="about-page page-shell">
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-copy">
            <p className="eyebrow">ABOUT</p>
            <h1 id="about-title">Early-career engineer,<br className="about-title-break" />serious about the<br className="about-title-break" />fundamentals.</h1>
            <p className="about-lede">I’m growing as a full-stack software engineer through structured training and practical projects. I build accessible interfaces with React and TypeScript, connect them to APIs, and work with the data workflows behind reliable applications.</p>
            <p className="about-followup">I value clear communication, thoughtful problem-solving and testing that helps the whole system work together.</p>
            <p className="about-followup">I am an excellent team player who collaborates effectively with others to develop innovative solutions that best meet clients’ needs.</p>
            
          </div>
          <aside className="about-aside" aria-label="Profile details">
            <div className="profile-facts">
              <div><h2><MapPin size={14} aria-hidden="true" /> Location</h2><p>{profile.location}</p></div>
              <div><h2>Training</h2><p>Refactory Academy apprenticeship, to {profile.courseCompletion.replace('December ', 'Dec ')}</p></div>
            </div>
            {profile.resumePath ? (
              <a className="button button-primary" href={profile.resumePath} download="Belinda-Irakoze-CV.pdf">Download resume <ArrowDown size={16} aria-hidden="true" /></a>
            ) : (
              <button className="button button-primary resume-disabled" type="button" disabled aria-label="Download resume; unavailable until a real PDF is added" title="Add your real resume PDF to enable this action">Download resume <ArrowDown size={16} aria-hidden="true" /></button>
            )}
          </aside>
        </section>

        <section className="principles-section" aria-labelledby="principles-title">
          <h2 id="principles-title">What I care about</h2>
          <div className="principles-grid">
            {principles.map((principle) => (
              <article className="principle-card" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
