import { ArrowUpRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { projects } from '../data/projects';

const featuredSlugs = ['greenhill-schools-ismp', 'agrismart-platform', 'nyondo-general-hardware'];

type StatusTone = 'live' | 'progress' | 'pending';

type CardMeta = {
  kind: string;
  blurb: string;
  tags: string[];
  status: { label: string; tone: StatusTone };
};

const cardMeta: Record<string, CardMeta> = {
  'greenhill-schools-ismp': {
    kind: 'Team project',
    blurb: 'Incident and service management platform for schools.',
    tags: ['Django', 'DRF'],
    status: { label: 'Review pending', tone: 'pending' },
  },
  'agrismart-platform': {
    kind: 'Personal project',
    blurb: 'Web and mobile platform for smallholder farmers in Uganda.',
    tags: ['DRF', 'React', 'Expo'],
    status: { label: 'In progress', tone: 'progress' },
  },
  'nyondo-general-hardware': {
    kind: 'Personal project',
    blurb: 'Django business app with role-based access for admins, sales attendants and store managers.',
    tags: ['Django', 'Roles'],
    status: { label: 'Public repository', tone: 'live' },
  },
};

const featuredProjects = featuredSlugs.flatMap((slug) => {
  const project = projects.find((item) => item.slug === slug);
  const meta = cardMeta[slug];
  return project && meta ? [{ project, meta }] : [];
});

export function ProjectsPage() {
  return <>
    <Navigation />
    <main className="container content-page projects-page">
      <header className="content-page-header">
        <p className="eyebrow">Projects</p>
        <h1>Selected projects</h1>
        <p>Each one has a case study covering my role, architecture, testing and current status.</p>
      </header>
      <section className="project-grid" aria-label="Selected projects">
        {featuredProjects.map(({ project, meta }) => (
          <article className="project-tile" key={project.slug}>
            <div className="project-tile-head">
              <p className="project-tile-label">{meta.kind}</p>
              <p className={`status-pill status-${meta.status.tone}`}>
                <span className="status-dot" aria-hidden="true" />
                {meta.status.label}
              </p>
            </div>
            <h2>
              <Link className="project-tile-stretched" to={`/projects/${project.slug}`}>{project.name}</Link>
            </h2>
            <p className="project-tile-blurb">{meta.blurb}</p>
            <ul className="project-tile-tags" aria-label={`${project.name} technologies`}>
              {meta.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <div className="project-tile-footer">
              <Link className="button button-primary project-tile-cta" to={`/projects/${project.slug}`}>Case study <ArrowUpRight size={15} aria-hidden="true" /></Link>
              {project.repo ? (
                <a className="project-tile-repo" href={project.repo} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
              ) : (
                <span className="project-tile-repo is-disabled" aria-disabled="true">Repository pending</span>
              )}
            </div>
          </article>
        ))}
      </section>
      <section className="projects-outro" aria-label="Next step">
        <p>Want to see how I work? Read a case study or get in touch.</p>
        <Link className="button button-primary" to="/contact">Contact me <Mail size={16} aria-hidden="true" /></Link>
      </section>
    </main>
  </>;
}
