import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './sections/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectCaseStudyPage } from './pages/ProjectCaseStudyPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return <BrowserRouter><Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/projects" element={<ProjectsPage />} /><Route path="/skills" element={<SkillsPage />} /><Route path="/experience" element={<ExperiencePage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/projects/:slug" element={<ProjectCaseStudyPage />} /><Route path="*" element={<ProjectCaseStudyPage />} /></Routes></BrowserRouter>;
}
