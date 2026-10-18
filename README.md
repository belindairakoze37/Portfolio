# Irakoze Belinda Â· Software Engineer Portfolio

A responsive React and TypeScript portfolio for Irakoze Belinda, a junior software engineer focused on practical software engineering. Project, profile, skills, and experience content lives in a small data layer, separate from the page components.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local URL, usually `http://localhost:5173`.

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Content and links

- `src/data/profile.ts` â€” name, role, location, social links, email, and resume path.
- `src/data/projects.ts` â€” project descriptions, verified stack, case study notes, status, and repository links.
- `src/data/skills.ts` â€” visible skill groups.
- `src/data/experience.ts` â€” apprenticeship and project experience.

The public repositories for AgriSmart, Nyondo General Hardware, and the Hospital API were inspected through GitHub. Project feature descriptions are based on the available README and source structure, but the remote project test suites were not run here. Confirm Belindaâ€™s specific module ownership for AgriSmart and the Hospital API before strengthening those attribution notes. The supplied brief mentions GreenHill Schools ISMP, but no matching public repository appeared in Belindaâ€™s public repository listing; its case study remains explicitly brief-based until its code is shared.

## Contact form setup

The contact form posts directly to FormSubmit's AJAX endpoint for Belinda's public email address. On the first submission, FormSubmit emails Belinda a verification request; she must confirm it to activate delivery. After activation, messages are emailed to `belindairakoze37@gmail.com` and the sender's email is set as Reply-To. No environment variable or account is required. FormSubmit receives the submitted form data, so do not collect sensitive information in this form.

## Resume and social profiles

Place the real PDF at `public/resume/belinda-irakoze-resume.pdf`, then set `resumePath` in `src/data/profile.ts` to `/resume/belinda-irakoze-resume.pdf`. The resume navigation action remains hidden until a path is configured. Add only a verified LinkedIn URL and a preferred public email in the same profile file.

## SEO and sharing

Page title, description, theme color, Open Graph fields, favicon, and an SVG social card are set in `index.html` and `public/`. There is no canonical URL or sitemap yet because the production domain is unknown. After choosing a domain, add a canonical tag, set the Open Graph URL, and publish a `sitemap.xml` with that real origin. Do not use a placeholder domain.

## Deploy to Vercel

1. Import this project into Vercel or run `npx vercel` from the project directory.
2. Use the Vite framework preset. Vercel detects `npm run build` and `dist` as the output directory.
3. Add the production domain, then update canonical and sitemap configuration.
4. Deploy a preview and verify navigation, form delivery, rÃ©sumÃ©, and project links before promoting it.

`vercel.json` sends client-side routes through `index.html`, so direct project case-study URLs resolve correctly. No deployment or remote repository changes have been made.

## Project structure

```text
src/
  components/       Navigation, project cards, contact form
  data/             Profile, project, skills, and experience content
  lib/              Zod contact validation
  pages/            About page, project case studies, and not found state
  sections/         Home page and component tests
  styles/           Tailwind v3 and responsive visual system
  test/             Vitest setup
public/             Favicon, social card, robots, resume instructions
```

The portfolio is a client-side React application built with Vite. It has no backend runtime dependency.

## Dependency security notes

`npm audit` currently reports advisories in Tailwind CSS v3's development-only dependency tree and in React Router v6. The audit's automatic fixes require major upgrades to Tailwind v4 and React Router v7, which conflict with the requested stack. Keep project links and route destinations controlled by the portfolio data, and review the audit again before each deployment. The site does not use server rendering or deserialize route payloads.

## Still needed from Belinda

- GreenHill repository access, if it is private or has another name.
- Belindaâ€™s specific module ownership for AgriSmart and the Hospital API.
- Further contribution detail for Nyondo and project test evidence/status updates.
- Current implementation status and test evidence for the projects.
- Real PDF rÃ©sumÃ© to enable the resume action.
- Confirm the first FormSubmit verification email to activate contact-form delivery.
- Production domain.

