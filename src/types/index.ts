export interface SocialLink {
  label: string;
  href: string;
  kind: 'github' | 'linkedin' | 'email';
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  summary: string;
  status: string;
  stack: string[];
  problem: string;
  users: string;
  architecture: string;
  contribution: string;
  challenge: string;
  response: string;
  decisions: string[];
  quality: string;
  collaboration: string;
  repo?: string;
  tone: 'navy' | 'blue' | 'slate';
}

export interface SkillGroup {
  title: string;
  note: string;
  skills: string[];
}

export interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  detail: string;
  kind: 'training' | 'project';
}
