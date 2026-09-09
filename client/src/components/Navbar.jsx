import React, { useState } from 'react';
import { Compass, Save, Menu, X, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onSave, isSaved }) {
  const [mobileNav, setMobileNav] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const navLinks = [
    { label: 'Plan', targetId: 'planner', route: '/planner' },
    { label: 'Discover', targetId: 'discover', route: '/destinations' },
    { label: 'Safety', targetId: 'safety', route: '/safety' },
    { label: 'My trip', targetId: 'control-center', route: '/saved' },
  ];

  const handleNavClick = (link) => {
    setMobileNav(false);
    if (isHome) {
      const el = document.getElementById(link.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="topbar">
      <Link to="/" className="brand" data-testid="brand-home">
        <span className="brand-mark">
          <Compass size={20} />
        </span>
        <span>
          EXPLOREX
          <small>AI TOURISM COMPANION</small>
        </span>
      </Link>

      <nav className={mobileNav ? 'nav-open' : ''}>
        {navLinks.map((link) => (
          isHome ? (
            <a
              key={link.targetId}
              href={`#${link.targetId}`}
              data-testid={`nav-${link.targetId}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link);
              }}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.targetId}
              to={link.route}
              data-testid={`nav-${link.targetId}`}
              onClick={() => setMobileNav(false)}
            >
              {link.label}
            </Link>
          )
        ))}
      </nav>

      <button
        className="icon-button menu-btn"
        onClick={() => setMobileNav(!mobileNav)}
        data-testid="mobile-menu-button"
        aria-label="Toggle navigation"
      >
        {mobileNav ? <X size={20} /> : <Menu size={20} />}
      </button>

      <button
        className="save-top"
        onClick={onSave}
        data-testid="save-trip-top"
        title={isSaved ? 'Trip Saved' : 'Save this trip'}
      >
        {isSaved ? <Check size={15} color="#b6ef75" /> : <Save size={15} />}
        {isSaved ? 'Saved' : 'Save trip'}
      </button>
    </header>
  );
}
