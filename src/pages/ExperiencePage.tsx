import { ArrowDown, ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { experience } from '../data/experience';
import { profile } from '../data/profile';

const projectNotes = [
  { label: 'GreenHill Schools ISMP', to: '/projects/greenhill-schools-ismp' },
  { label: 'AgriSmart Platform', to: '/projects/agrismart-platform' },
  { label: 'Nyondo General Hardware', to: '/projects/nyondo-general-hardware' },
];

const qualifications = [
  {
    title: 'Certificate in Software Engineering',
    organization: 'Refactory Academy, Kampala, Uganda',
    date: 'In progress, expected December 2026',
  },
  {
    title: 'Uganda Advanced Certificate of Education (UACE)',
    organization: 'Uganda',
    date: 'Completed in 2023',
  },
];

export function ExperiencePage() {
  const training = experience.find((item) => item.kind === 'training');
  const highlights = training?.highlights?.slice(0, 3) ?? [];

  return <>
    <Navigation />
    <main className="page-shell content-page experience-page">
      <header className="content-page-header">
        <p className="eyebrow">Experience &amp; education</p>
        <h1>Training and project work.</h1>
        <p>A short record of my training, project work and education.</p>
      </header>

      <ol className="timeline" aria-label="Experience and education">
        {training && (
          <li className="timeline-entry timeline-entry-current">
            <p className="timeline-date">Now – Dec 2026</p>
            <article className="timeline-card timeline-card-featured">
              <div className="timeline-card-top">
                <p className="timeline-label">Training</p>
                <p className="status-pill status-progress">
                  <span className="status-dot" aria-hidden="true" />In progress
                </p>
              </div>
              <h2>{training.title}<span className="timeline-dot" aria-hidden="true" /></h2>
              <p>Refactory Academy, Kampala. Structured, project-based training in software engineering.</p>
              {highlights.length > 0 && (
                <ul className="timeline-highlights">
                  {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              )}
            </article>
          </li>
        )}

        <li className="timeline-entry">
          <p className="timeline-date">Ongoing</p>
          <article className="timeline-card">
            <div className="timeline-card-top">
              <p className="timeline-label">Project work</p>
            </div>
            <h2>GreenHill, AgriSmart and Nyondo<span className="timeline-dot" aria-hidden="true" /></h2>
            <p>GreenHill Schools ISMP is a team project. AgriSmart Platform and Nyondo General Hardware are personal projects.</p>
            <ul className="timeline-chips">
              {projectNotes.map((project) => (
                <li key={project.to}>
                  <Link to={project.to}>{project.label} <ArrowUpRight size={12} aria-hidden="true" /></Link>
                </li>
              ))}
            </ul>
            <Link className="timeline-more" to="/projects">View all projects <ArrowRight size={14} aria-hidden="true" /></Link>
          </article>
        </li>

        <li className="timeline-entry">
          <p className="timeline-date">2023</p>
          <article className="timeline-card">
            <div className="timeline-card-top">
              <p className="timeline-label">Education</p>
            </div>
            <h2>Education &amp; Qualifications<span className="timeline-dot" aria-hidden="true" /></h2>
            <div className="qualification-list">
              {qualifications.map((item) => (
                <div className="qualification-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.organization}</p>
                  <p className="qualification-date">{item.date}</p>
                </div>
              ))}
            </div>
          </article>
        </li>
      </ol>

      <section className="experience-outro" aria-label="Next step">
        <h2>Want the full picture?</h2>
        <div className="experience-outro-actions">
          {profile.resumePath ? (
            <a className="button button-primary" href={profile.resumePath} download="Belinda-Irakoze-CV.pdf">Download resume <ArrowDown size={16} aria-hidden="true" /></a>
          ) : (
            <button className="button button-primary resume-disabled" type="button" disabled aria-label="Download resume; unavailable until a real PDF is added" title="Add your real resume PDF to enable this action">Download resume <ArrowDown size={16} aria-hidden="true" /></button>
          )}
          <Link className="button button-outline" to="/contact">Contact me <Mail size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  </>;
}
