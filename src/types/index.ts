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

export interface SkillTag {
  name: string;
  /** Marks the skills that lead the page; core tags get the accent treatment. */
  core?: boolean;
}

export interface SkillGroup {
  title: string;
  note: string;
  /** Project names inside `note` that link to their case study. */
  noteLinks?: { label: string; to: string }[];
  skills: SkillTag[];
  /** Spans two grid columns on desktop and tablet. */
  wide?: boolean;
  /** Renders the tags quieter than the technical groups. */
  quiet?: boolean;
}

export interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  detail: string;
  kind: 'training' | 'project';
  /** Short bullets for the featured entry; up to three are rendered. */
  highlights?: string[];
}
