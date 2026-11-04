import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    note: 'Used in AgriSmart and this portfolio',
    noteLinks: [{ label: 'AgriSmart', to: '/projects/agrismart-platform' }],
    skills: [
      { name: 'JavaScript' },
      { name: 'TypeScript', core: true },
      { name: 'React', core: true },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    title: 'Backend Development',
    note: 'Used in AgriSmart and Nyondo',
    noteLinks: [
      { label: 'AgriSmart', to: '/projects/agrismart-platform' },
      { label: 'Nyondo', to: '/projects/nyondo-general-hardware' },
    ],
    skills: [
      { name: 'Python', core: true },
      { name: 'Django', core: true },
      { name: 'Django REST Framework', core: true },
      { name: 'REST API design' },
      { name: 'Auth & permissions' },
      { name: 'API validation' },
      { name: 'Relational databases' },
    ],
  },
  {
    title: 'Testing',
    note: 'Testing frameworks and API tools',
    skills: [
      { name: 'pytest' },
      { name: 'unittest' },
      { name: 'Django Test Framework' },
      { name: 'Postman' },
      { name: 'Swagger / OpenAPI' },
      { name: 'Vitest' },
    ],
  },
  {
    title: 'Workflow',
    note: 'Day-to-day tools',
    skills: [{ name: 'Git' }, { name: 'GitHub' }, { name: 'VS Code' }, { name: 'npm' }],
  },
  {
    title: 'Soft Skills',
    note: 'How I work with teams and clients',
    skills: [
      { name: 'Teamwork & Collaboration' },
      { name: 'Problem-Solving' },
      { name: 'Client-Centered Thinking' },
      { name: 'Communication' },
      { name: 'Adaptability' },
      { name: 'Critical Thinking' },
      { name: 'Time Management' },
      { name: 'Attention to Detail' },
    ],
    wide: true,
    quiet: true,
  },
];

