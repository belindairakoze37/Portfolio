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
    expect(screen.getByText(/Refactory Academy apprenticeship, to Dec 2026/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'What I care about' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Reliable APIs' })).toBeInTheDocument();
    expect(screen.queryByText('SECOND PHOTO (OPTIONAL)')).not.toBeInTheDocument();
  });

  it('keeps the resume action disabled until a real file is configured', () => {
    render(<MemoryRouter initialEntries={['/about']}><AboutPage /></MemoryRouter>);

    expect(screen.getByRole('button', { name: /download resume/i })).toBeDisabled();
  });
});
