import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from './AboutPage';

afterEach(cleanup);

describe('about page', () => {
  it('shows the professional introduction, apprenticeship details, and values', () => {
    render(<MemoryRouter initialEntries={['/about']}><AboutPage /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: /early-career engineer/i })).toBeInTheDocument();
    expect(screen.getByText('Kampala, Uganda')).toBeInTheDocument();
    expect(screen.getByText(/Refactory Academy apprenticeship/)).toHaveTextContent('Refactory Academy apprenticeship, to Dec 2026');
    expect(screen.getByRole('heading', { name: 'What I care about' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Clean code' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Accessibility' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Reliable software' })).toBeInTheDocument();
    expect(screen.getByText('Open to junior engineering roles')).toBeInTheDocument();
    expect(screen.getByText('Django REST Framework')).toBeInTheDocument();
    expect(screen.queryByText('SECOND PHOTO (OPTIONAL)')).not.toBeInTheDocument();
  });

  it('links directly to the downloadable resume PDF', () => {
    render(<MemoryRouter initialEntries={['/about']}><AboutPage /></MemoryRouter>);

    const resumeLink = screen.getByRole('link', { name: /download resume/i });
    expect(resumeLink).toHaveAttribute('href', '/Belinda-Irakoze-CV.pdf');
    expect(resumeLink).toHaveAttribute('download', 'Belinda-Irakoze-CV.pdf');
    expect(screen.getByRole('link', { name: /contact me/i })).toHaveAttribute('href', '/contact');
  });
});
