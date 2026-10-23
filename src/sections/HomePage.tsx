import { ArrowRight, ArrowUpRight, Github, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ContactForm } from '../components/ContactForm';
import { Navigation } from '../components/Navigation';
import { ProjectCard } from '../components/ProjectCard';
import { experience } from '../data/experience';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';

const featuredSlugs = ['greenhill-schools-ismp', 'agrismart-platform', 'nyondo-general-hardware'];
const featuredProjects = featuredSlugs.map((slug) => projects.find((project) => project.slug === slug)).filter((project) => project !== undefined);
const focusAreas = ['React & TypeScript interfaces', 'Responsive, accessible UI', 'REST API design', 'Data, validation & testing'];

export function HomePage() {
  const [portraitUnavailable, setPortraitUnavailable] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const targetId = decodeURIComponent(hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main" className="page-shell">
        <section className="home-hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="availability-pill">{profile.location} · Open to opportunities</p>
            <p className="sr-only">{profile.title} focused on {profile.focus}</p>
            <h1 id="hero-title">Junior full-stack engineer<br />building useful web apps<br />from UI to API.</h1>
            <p className="hero-intro">I’m Irakoze Belinda, a junior full-stack software engineer building frontend experiences with React and TypeScript and backend APIs with Django REST Framework. I care about clean code, accessible user-friendly interfaces and software that works reliably.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View projects <ArrowRight size={16} aria-hidden="true" /></a>
              <Link className="button button-secondary" to="/contact">Contact</Link>
            </div>
          </div>
          <aside className="hero-aside" aria-label="Profile and focus areas">
            <div className="photo-placeholder home-photo-placeholder">
              {portraitUnavailable ? (
                <div><strong>YOUR PHOTO HERE</strong><span>Portrait, 4:5 ratio<br />at least 800 × 1000 px</span></div>
              ) : (
                <img className="profile-portrait" src="/images/belinda-irakoze-portrait.jpeg" alt="Irakoze Belinda" onError={() => setPortraitUnavailable(true)} />
              )}
            </div>
            <div className="focus-card">
              <h2>Focus areas</h2>
              <ul>{focusAreas.map((area) => <li key={area}>{area}</li>)}</ul>
            </div>
          </aside>
        </section>

        <section className="projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading-row"><h2 id="projects-title">Selected projects</h2></div>
          <div className="project-list">{featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
        </section>

        <section className="lower-section" id="skills" aria-labelledby="skills-title">
          <div className="lower-heading"><p className="eyebrow">PRACTICE & TOOLKIT</p><h2 id="skills-title">Tools I use to solve problems.</h2></div>
          <div className="skill-groups">{skillGroups.map((group) => <article className="skill-group" key={group.title}><div><h3>{group.title}</h3><span>{group.note}</span></div><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
        </section>

        <section className="lower-section experience-section" id="experience" aria-labelledby="experience-title">
          <div className="lower-heading"><p className="eyebrow">EXPERIENCE & LEARNING</p><h2 id="experience-title">Learning by doing.</h2></div>
          <div className="timeline">{experience.map((item) => <article className="timeline-item" key={item.title}><div><p className="eyebrow">{item.kind === 'training' ? 'APPRENTICESHIP' : 'PROJECT EXPERIENCE'}</p><h3>{item.title}</h3><p className="timeline-meta">{item.organization} · {item.period}</p><p>{item.detail}</p></div></article>)}</div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy"><p className="eyebrow">GET IN TOUCH</p><h2 id="contact-title">Let’s build something useful.</h2><p>For engineering opportunities, collaboration, or practical software projects, get in touch.</p><a href={`mailto:${profile.email}`} className="contact-email">{profile.email} <ArrowUpRight size={15} aria-hidden="true" /></a><div className="contact-socials"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={15} aria-hidden="true" /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a><span><MapPin size={14} aria-hidden="true" /> {profile.location}</span></div></div>
          <ContactForm />
        </section>
      </main>
      <footer className="site-footer"><Link to="/" className="brand"><span className="brand-dot" aria-hidden="true" />Belinda Irakoze</Link><p>Growing as an engineer, one useful solution at a time.</p><span>© {new Date().getFullYear()} Irakoze Belinda</span></footer>
    </>
  );
}
