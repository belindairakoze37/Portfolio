import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  { title: 'Backend', note: 'Used in AgriSmart and Nyondo', skills: ['Python', 'Django', 'Django REST Framework', 'REST API design', 'Auth & permissions', 'API validation'] },
  { title: 'Frontend', note: 'Used in AgriSmart and this portfolio', skills: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'Tailwind CSS'] },
  { title: 'Data & testing', note: 'Models in Nyondo; tests in AgriSmart and this portfolio', skills: ['Relational databases', 'Django tests', 'Vitest'] },
  { title: 'Workflow', note: 'Day-to-day tools', skills: ['Git', 'GitHub', 'VS Code', 'npm'] },
];
