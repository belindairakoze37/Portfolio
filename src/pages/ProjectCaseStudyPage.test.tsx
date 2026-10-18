import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProjectCaseStudyPage } from './ProjectCaseStudyPage';

describe('project case study routes', () => {
  it('shows the available project detail and a return link', () => {
    render(<MemoryRouter initialEntries={['/projects/agrismart-platform']}><Routes><Route path="/projects/:slug" element={<ProjectCaseStudyPage />} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'AgriSmart Platform' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Architecture' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Challenge & response' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to selected projects/i })).toHaveAttribute('href', '/#projects');
  });

  it('renders a useful 404 state for unknown project routes', () => {
    render(<MemoryRouter initialEntries={['/projects/not-a-real-project']}><Routes><Route path="/projects/:slug" element={<ProjectCaseStudyPage />} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'This page isn’t here.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });
});
