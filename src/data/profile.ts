import type { SocialLink } from '../types';

export const profile = {
  name: 'Irakoze Belinda',
  title: 'Junior Full-Stack Software Engineer',
  focus: 'Frontend and Backend Development',
  location: 'Kampala, Uganda',
  github: 'https://github.com/belindairakoze37',
  linkedin: 'https://www.linkedin.com/in/belindairakoze',
  email: 'belindairakoze37@gmail.com',
  resumePath: '/Belinda-Irakoze-CV.pdf',
  courseCompletion: 'December 2026',
};

export const socials: SocialLink[] = [
  { label: 'GitHub', href: profile.github, kind: 'github' },
  ...(profile.linkedin ? [{ label: 'LinkedIn', href: profile.linkedin, kind: 'linkedin' as const }] : []),
  ...(profile.email ? [{ label: 'Email', href: `mailto:${profile.email}`, kind: 'email' as const }] : []),
];
