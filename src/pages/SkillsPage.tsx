import type { ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, CircleCheck, GitBranch, Monitor, Server, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { profile } from '../data/profile';
import { skillGroups } from '../data/skills';
import type { SkillGroup } from '../types';

const groupIcons = {
  Frontend: Monitor,
  'Backend Development': Server,
  Testing: CircleCheck,
  Workflow: GitBranch,
  'Soft Skills': Users,
} as const;

function ContextLine({ note, noteLinks }: Pick<SkillGroup, 'note' | 'noteLinks'>) {
  const parts: ReactNode[] = [];
  let rest = note;

  noteLinks?.forEach((link) => {
    const index = rest.indexOf(link.label);
    if (index === -1) return;
    parts.push(rest.slice(0, index));
    parts.push(
      <Link className="skill-context-link" key={link.label} to={link.to}>
        {link.label} <ArrowUpRight size={12} aria-hidden="true" />
      </Link>,
    );
    rest = rest.slice(index + link.label.length);
  });

  parts.push(rest);
  return <p className="skill-context">{parts}</p>;
}

export function SkillsPage() {
  return <>
    <Navigation />
    <main className="page-shell content-page skills-page">
      <header className="content-page-header">
        <p className="eyebrow">Skills</p>
        <h1>Tools, with the work to back them up.</h1>
        <p>No percentage bars. Each group notes where I’ve used it.</p>
      </header>
      <section className="skill-grid" aria-label="Skills and tools">
        {skillGroups.map((group) => {
          const Icon = groupIcons[group.title as keyof typeof groupIcons] ?? Monitor;
          return (
            <article className={`skill-card${group.wide ? ' skill-card-wide' : ''}${group.quiet ? ' skill-card-quiet' : ''}`} key={group.title}>
              <div className="skill-card-head">
                <span className="skill-card-icon" aria-hidden="true"><Icon size={17} /></span>
                <h2>{group.title}</h2>
              </div>
              <ContextLine note={group.note} noteLinks={group.noteLinks} />
              <ul className="skill-tags">
                {group.skills.map((skill) => (
                  <li className={skill.core ? 'is-core' : undefined} key={skill.name}>{skill.name}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>
      <section className="skills-outro">
        <h2>See these skills in action.</h2>
        <div className="skills-outro-actions">
          <Link className="button button-primary" to="/projects">View projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
          {profile.resumePath ? (
            <a className="button button-outline" href={profile.resumePath} download="Belinda-Irakoze-CV.pdf">Download resume <ArrowDown size={16} aria-hidden="true" /></a>
          ) : (
            <button className="button button-outline resume-disabled" type="button" disabled aria-label="Download resume; unavailable until a real PDF is added" title="Add your real resume PDF to enable this action">Download resume <ArrowDown size={16} aria-hidden="true" /></button>
          )}
        </div>
      </section>
    </main>
  </>;
}

