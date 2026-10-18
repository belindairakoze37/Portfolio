import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';

const cardTechnologies: Record<string, string[]> = {
  'greenhill-schools-ismp': ['Team project', 'Django', 'DRF', 'In review'],
  'agrismart-platform': ['Personal project', 'DRF', 'React', 'Expo'],
  'nyondo-general-hardware': ['Personal project', 'Django', 'Database', 'Roles'],
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card-heading">
        <h3>{project.name}</h3>
        <Link to={`/projects/${project.slug}`} className="project-card-link" aria-label={`Read ${project.name} case study`}><ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <p>{project.summary}</p>
      <ul className="tech-list" aria-label={`${project.name} technologies`}>
        {(cardTechnologies[project.slug] ?? project.stack.slice(0, 4)).map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}
