import { Navigation } from '../components/Navigation';
import { experience } from '../data/experience';

export function ExperiencePage() {
  const training = experience.find((item) => item.kind === 'training');

  return <>
    <Navigation />
    <main className="page-shell content-page experience-page">
      <header className="content-page-header">
        <p className="eyebrow">Experience &amp; education</p>
        <h1>Training and project work.</h1>
      </header>
      <section className="experience-timeline" aria-label="Experience and education">
        {training && <article className="experience-card">
          <span className="experience-badge training-badge">Training · Expected Dec 2026</span>
          <h2>{training.title}</h2>
          <p>Refactory Academy, Kampala. Structured, project-based training in software engineering.</p>
        </article>}
        <article className="experience-card">
          <span className="experience-badge project-badge">Project work</span>
          <h2>GreenHill, AgriSmart and Nyondo</h2>
          <p>GreenHill Schools ISMP is a team project. AgriSmart Platform and Nyondo General Hardware are personal projects.</p>
        </article>
        <article className="experience-card">
          <span className="experience-badge education-badge">Education</span>
         
<div className="qualification">
  <h2>Education & Qualifications</h2>

  <div className="qualification-item">
    <h3>Certificate in Software Engineering</h3>
    <p>Refactory Academy, Kampala, Uganda</p>
    <p>Expected Completion: December 2026</p>
  </div>

  <div className="qualification-item">
    <h3>Uganda Advanced Certificate of Education (UACE)</h3>
    <p>Completed in 2023</p>
    <p>Uganda</p>
  </div>
</div>

        </article>
      </section>
    </main>
  </>;
}
