import { Navigation } from '../components/Navigation';
import { skillGroups } from '../data/skills';

export function SkillsPage() {
  return <>
    <Navigation />
    <main className="page-shell content-page skills-page">
      <header className="content-page-header">
        <p className="eyebrow">Skills</p>
        <h1>Tools, with the work to back them up.</h1>
        <p>No percentage bars. Each group notes where I’ve used it.</p>
      </header>
      <section className="skills-showcase-grid" aria-label="Skills and tools">
        {skillGroups.map((group) => <article className="skills-showcase-card" key={group.title}>
          <h2>{group.title}</h2>
          <p>{group.note}</p>
          <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
        </article>)}
      </section>
    </main>
  </>;
}
