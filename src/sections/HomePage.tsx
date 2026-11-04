import { ArrowRight, ArrowUpRight, Github, Mail, MapPin } from 'lucide-react';
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
const heroRole = 'Junior Full-Stack Developer';
const heroRoles = ['Junior Full-Stack Developer', 'Backend Developer', 'Frontend Developer', 'Python Developer'] as const;
const featuredProjects = featuredSlugs.map((slug) => projects.find((project) => project.slug === slug)).filter((project) => project !== undefined);

function prefersReducedMotion() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useRotatingText(words: readonly string[]) {
  const [reducedMotion] = useState(prefersReducedMotion);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const word = words[wordIndex] ?? '';
    const finishedTyping = !erasing && letterCount >= word.length;
    const finishedErasing = erasing && letterCount === 0;
    let delay = 25;
    if (finishedTyping) delay = 1500;
    else if (finishedErasing) delay = 280;
    else if (!erasing) delay = 65;

    const timer = window.setTimeout(() => {
      if (finishedTyping) setErasing(true);
      else if (finishedErasing) {
        setErasing(false);
        setLetterCount(0);
        setWordIndex((index) => (index + 1) % words.length);
      } else setLetterCount((count) => count + (erasing ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [erasing, letterCount, reducedMotion, wordIndex, words]);

  if (reducedMotion) return { text: words[0] ?? '', wordIndex: 0 };
  return { text: (words[wordIndex] ?? '').slice(0, letterCount), wordIndex };
}

export function HomePage() {
  const [portraitUnavailable, setPortraitUnavailable] = useState(false);
  const rotatingRole = useRotatingText(heroRoles);
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
      <main id="main" className="container">
        <section className="home-hero" id="home" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="hero-hello">Hello, I’m</p>
              <p className="sr-only">{heroRole} focused on {profile.focus}</p>
              <h1 id="hero-title">
                <span className="hero-name">Belinda Irakoze</span>
                <span className="sr-only">{heroRole}</span>
                <span className="hero-role" aria-hidden="true">
                  {Array.from(rotatingRole.text).map((char, index) => (
                    <span className="hero-role-char" key={`${rotatingRole.wordIndex}-${index}`}>{char === ' ' ? '\u00a0' : char}</span>
                  ))}
                </span>
              </h1>
              <p className="hero-intro">I build thoughtful web experiences with React and TypeScript, backed by reliable APIs in Django REST Framework. I care about clean code, accessible and user-friendly interfaces, and software that works as it should.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">View My Work <ArrowRight size={16} aria-hidden="true" /></a>
                <Link className="button button-secondary" to="/contact"><Mail size={16} aria-hidden="true" /> Contact Me</Link>
              </div>
            </div>
            <div className="hero-media">
              <div className={portraitUnavailable ? 'hero-portrait photo-placeholder home-photo-placeholder' : 'hero-portrait'}>
                {portraitUnavailable ? (
                  <div><strong>YOUR PHOTO HERE</strong><span>Portrait, waist up<br />transparent PNG</span></div>
                ) : (
                  <img className="profile-portrait" src="/images/belinda-portrait-circle.jpg?v=2" alt="Irakoze Belinda" onError={() => setPortraitUnavailable(true)} />
                )}
              </div>
            </div>
            
          </div>
        </section>

        <section className="projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading-row"><h2 id="projects-title">Selected projects</h2></div>
          <div className="project-list">{featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
        </section>

        <section className="lower-section" id="skills" aria-labelledby="skills-title">
          <div className="lower-heading"><p className="eyebrow">PRACTICE & TOOLKIT</p><h2 id="skills-title">Tools I use to solve problems.</h2></div>
          <div className="skill-groups">{skillGroups.map((group) => <article className="skill-group" key={group.title}><div><h3>{group.title}</h3><span>{group.note}</span></div><ul>{group.skills.map((skill) => <li key={skill.name}>{skill.name}</li>)}</ul></article>)}</div>
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
      <footer className="site-footer">
        <div className="container site-footer-inner">
          <Link to="/" className="brand"><span className="brand-dot" aria-hidden="true" />Belinda Irakoze</Link>
          <p>Growing as an engineer, one useful solution at a time.</p>
          <span>© {new Date().getFullYear()} Irakoze Belinda</span>
        </div>
      </footer>
    </>
  );
}
