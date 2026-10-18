import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

function renderHome() {
  return render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><HomePage /></MemoryRouter>);
}

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('portfolio home page', () => {
  it('renders the identity, sections, and selected featured projects', () => {
    renderHome();
    expect(screen.getByRole('heading', { name: /junior full-stack engineer building useful web apps from ui to api/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /selected projects/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'GreenHill Schools ISMP' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AgriSmart Platform' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Nyondo General Hardware' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Hospital Django REST API' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Contact' }).some((link) => link.getAttribute('href') === '/contact')).toBe(true);
  });

  it('provides a working expandable mobile navigation', async () => {
    const user = userEvent.setup();
    renderHome();
    const toggle = screen.getByRole('button', { name: 'Open navigation' });
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const nav = screen.getByRole('navigation', { name: 'Primary navigation' });
    const projectsLink = within(nav).getByRole('link', { name: 'Projects' });
    await user.click(projectsLink);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows inline validation errors for invalid contact fields', async () => {
    const user = userEvent.setup();
    renderHome();
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText('Please enter at least 2 characters.')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
    expect(screen.getByText('Please enter at least 10 characters.')).toBeInTheDocument();
  });

  it('reports success only after the configured service accepts a message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ success: true }) }));
    const user = userEvent.setup();
    renderHome();
    await user.type(screen.getByLabelText('Your name'), 'Belinda Irakoze');
    await user.type(screen.getByLabelText('Email address'), 'belinda@example.com');
    await user.type(screen.getByLabelText('Message'), 'I would like to discuss a software opportunity.');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('status')).toHaveTextContent('Your message was accepted.');
    expect(fetch).toHaveBeenCalledWith('https://formsubmit.co/ajax/belindairakoze37@gmail.com', expect.objectContaining({ body: expect.stringContaining('"_honey":""') }));
    expect(JSON.parse(vi.mocked(fetch).mock.calls[0]?.[1]?.body as string)).toMatchObject({
      email: 'belinda@example.com',
      _replyto: 'belinda@example.com',
      _subject: 'Portfolio message from Belinda Irakoze',
    });
  });

  it('shows useful feedback when message delivery fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 400, json: () => Promise.resolve({}) }));
    const user = userEvent.setup();
    renderHome();
    await user.type(screen.getByLabelText('Your name'), 'Belinda Irakoze');
    await user.type(screen.getByLabelText('Email address'), 'belinda@example.com');
    await user.type(screen.getByLabelText('Message'), 'I would like to discuss a software opportunity.');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('The message could not be sent.');
  });

});
