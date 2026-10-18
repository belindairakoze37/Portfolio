import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { projects } from '../data/projects';

const featuredSlugs = ['greenhill-schools-ismp', 'agrismart-platform', 'nyondo-general-hardware'];
const featuredProjects = featuredSlugs.map((slug) => projects.find((project) => project.slug === slug)).filter((project) => project !== undefined);

export function ProjectsPage() {
  return <>
    <Navigation />
    <main className="page-shell content-page projects-page">
      <header className="content-page-header">
        <p className="eyebrow">Projects</p>
        <h1>Selected projects</h1>
        <p>Each one has a case study covering my role, architecture, testing and current status.</p>
      </header>
      <section className="showcase-grid" aria-label="Selected projects">
        {featuredProjects.map((project) => <article className="showcase-card" key={project.slug}>
          <div className="showcase-body">
            <h2>{project.name}</h2>
            <p>{project.slug === 'greenhill-schools-ismp' ? 'Team project: incident and service management platform for schools. Repository review is pending.' : `Personal project: ${project.summary}`}</p>
            <div className="showcase-tags">
              <span>{project.slug === 'agrismart-platform' ? 'DRF · React · Expo' : project.slug === 'nyondo-general-hardware' ? 'Django · Roles' : 'Django · DRF'}</span>
              <span className={project.slug === 'agrismart-platform' ? 'showcase-status in-progress' : 'showcase-status'}>{project.slug === 'agrismart-platform' ? 'In progress' : project.slug === 'nyondo-general-hardware' ? 'Public repository' : 'Review pending'}</span>
            </div>
            <div className="showcase-actions">
              <Link to={`/projects/${project.slug}`}>Case study →</Link>
              {project.repo ? <a href={project.repo} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} aria-hidden="true" /></a> : <span className="repository-pending">Repository pending</span>}
            </div>
          </div>
        </article>)}
      </section>
    </main>
  </>;
}
