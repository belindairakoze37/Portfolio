import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { profile } from '../data/profile';

export function ProjectCaseStudyPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <main className="not-found"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>This page isn’t here.</h1><p>Let’s get you back to the portfolio.</p><Link className="button button-primary" to="/">Back to home <ArrowLeft size={16} /></Link></main>;
  }

  return (
    <div className="case-study-page">
      <header className="case-header"><Link className="brand" to="/">BELINDA<span>.</span></Link><Link className="case-back" to="/#projects"><ArrowLeft size={15} /> All projects</Link></header>
      <main className="case-main">
        <p className="eyebrow">PROJECT NOTES · {project.category}</p>
        <h1>{project.name}</h1>
        <p className="case-summary">{project.summary}</p>
        <p className="project-status case-status"><span className="status-mark" />{project.status}</p>
        <ul className="tech-list case-stack">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="case-detail-grid">
          <article><span className="case-count">01</span><h2>The problem</h2><p>{project.problem}</p></article>
          <article><span className="case-count">02</span><h2>Intended users</h2><p>{project.users}</p></article>
          <article><span className="case-count">03</span><h2>Architecture</h2><p>{project.architecture}</p></article>
          <article><span className="case-count">04</span><h2>My contribution</h2><p>{project.contribution}</p></article>
          <article><span className="case-count">05</span><h2>Implementation notes</h2><ul>{project.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul></article>
          <article><span className="case-count">06</span><h2>Challenge & response</h2><p>{project.challenge}</p><p>{project.response}</p></article>
          <article><span className="case-count">07</span><h2>Testing & quality</h2><p>{project.quality}</p></article>
          <article><span className="case-count">08</span><h2>Collaboration & status</h2><p>{project.collaboration}</p><p>{project.status}</p></article>
        </div>
        <div className="case-links">{project.repo ? <a href={project.repo} target="_blank" rel="noreferrer"><Github size={16} /> View repository <ArrowUpRight size={14} /></a> : <p>Repository URL pending verification. <a href={profile.github} target="_blank" rel="noreferrer">Visit GitHub profile <ArrowUpRight size={13} /></a></p>}</div>
        <Link className="case-back bottom-back" to="/#projects"><ArrowLeft size={15} /> Back to selected projects</Link>
      </main>
    </div>
  );
}
