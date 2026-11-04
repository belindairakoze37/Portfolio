import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/profile';

const links = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/about', label: 'About', key: 'about' },
  { href: '/projects', label: 'Projects', key: 'projects' },
  { href: '/skills', label: 'Skills', key: 'skills' },
  { href: '/experience', label: 'Experience', key: 'experience' },
  { href: '/contact', label: 'Contact', key: 'contact' },
];

export function Navigation() {  const [open, setOpen] = useState(false);
  const location = useLocation();
  const activeKey = location.pathname === '/about'
    ? 'about'
    : location.pathname === '/projects'
      ? 'projects'
      : location.pathname === '/skills'
        ? 'skills'
        : location.pathname === '/experience'
          ? 'experience'
          : location.pathname === '/contact'
            ? 'contact'
        : location.pathname === '/' && location.hash
          ? location.hash.slice(2)
          : 'home';

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link className="brand" to="/" aria-label={`${profile.name}, home`} onClick={() => setOpen(false)}>
          <span className="brand-text">
            <span className="brand-name">
              Belinda <em>Irakoze</em>
              <span className="brand-mark" aria-hidden="true" />
            </span>
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav id="primary-navigation" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          {links.map((link) => {
            const className = activeKey === link.key ? 'active' : undefined;
            const ariaCurrent = activeKey === link.key ? 'page' as const : undefined;
            return link.href.includes('#') ? (
              <a key={link.key} href={link.href} aria-current={ariaCurrent} className={className} onClick={() => setOpen(false)}>{link.label}</a>
            ) : (
              <Link key={link.key} to={link.href} aria-current={ariaCurrent} className={className} onClick={() => setOpen(false)}>{link.label}</Link>
            );
          })}
        </nav>
        <a className="header-social" href={profile.github} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
