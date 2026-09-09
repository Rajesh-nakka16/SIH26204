import React from 'react';
import { Compass } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <a href="#top" className="brand">
        <span className="brand-mark">
          <Compass size={16} />
        </span>
        <span>
          EXPLOREX
          <small>AI-POWERED SMART TOURISM</small>
        </span>
      </a>

      <div className="footer-nav">
        <span onClick={() => scrollTo('planner')}>PLAN</span>
        <span>•</span>
        <span onClick={() => scrollTo('discover')}>DISCOVER</span>
        <span>•</span>
        <span onClick={() => scrollTo('control-center')}>SAVE</span>
        <span>•</span>
        <span onClick={() => scrollTo('top')}>EXPLORE</span>
        <span>•</span>
        <span onClick={() => scrollTo('safety')}>STAY SAFE</span>
        <span>•</span>
        <span onClick={() => scrollTo('discover')}>SUPPORT LOCAL</span>
      </div>

      <div>© 2025 Explorex</div>
    </footer>
  );
}
