import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within, cleanup, waitFor } from '@testing-library/react';
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
    expect(screen.getByRole('heading', { name: /belinda irakoze junior full-stack developer/i })).toBeInTheDocument();
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
    await user.type(screen.getByLabelText('Email address'), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText('Please enter at least 2 characters.')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
    expect(screen.getByText('Please enter at least 10 characters.')).toBeInTheDocument();
  });

  it('shows success only after Formspree accepts the message', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/test-form');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    const user = userEvent.setup();
    renderHome();
    await user.type(screen.getByLabelText('Your name'), 'Belinda Irakoze');
    await user.type(screen.getByLabelText('Email address'), 'belinda@example.com');
    await user.type(screen.getByLabelText('Message'), 'I would like to discuss a software opportunity.');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('status')).toHaveTextContent('Thanks, your message has been sent.');
    expect(screen.getByLabelText('Your name')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
    expect(fetch).toHaveBeenCalledWith('https://formspree.io/f/test-form', expect.objectContaining({
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    }));
  });

  it.each([
    ['rejects the request', vi.fn().mockRejectedValue(new Error('network failure'))],
    ['returns a non-ok response', vi.fn().mockResolvedValue({ ok: false })],
  ])('shows an error when fetch %s', async (_case, fetchMock) => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/test-form');
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    renderHome();
    await user.type(screen.getByLabelText('Your name'), 'Belinda Irakoze');
    await user.type(screen.getByLabelText('Email address'), 'belinda@example.com');
    await user.type(screen.getByLabelText('Message'), 'I would like to discuss a software opportunity.');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong and your message wasn’t sent.');
    expect(screen.getByLabelText('Message')).toHaveValue('I would like to discuss a software opportunity.');
  });

  it('shows the unconfigured state without calling fetch', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', '');
    vi.stubGlobal('fetch', vi.fn());
    const user = userEvent.setup();
    renderHome();
    await user.type(screen.getByLabelText('Your name'), 'Belinda Irakoze');
    await user.type(screen.getByLabelText('Email address'), 'belinda@example.com');
    await user.type(screen.getByLabelText('Message'), 'I would like to discuss a software opportunity.');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('The form isn’t active right now. Please email me directly');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('disables the button while sending', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/test-form');
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => undefined)));
    const user = userEvent.setup();
    renderHome();
    await user.type(screen.getByLabelText('Your name'), 'Belinda Irakoze');
    await user.type(screen.getByLabelText('Email address'), 'belinda@example.com');
    await user.type(screen.getByLabelText('Message'), 'I would like to discuss a software opportunity.');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled());
  });

});
