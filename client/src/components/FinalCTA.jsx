import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FinalCTA({ onPlanClick }) {
  return (
    <section className="final-cta">
      <div className="final-lines"></div>
      <span className="kicker">ONE PLATFORM. ONE BUDGET. ONE COMPLETE JOURNEY.</span>
      <h2>
        Explore beyond
        <br />
        <em>the expected.</em>
      </h2>
      <p>Plan smarter. Spend wisely. Discover more. Travel safely.</p>
      <a
        href="#planner"
        className="button button-primary"
        onClick={onPlanClick}
        data-testid="final-plan-button"
      >
        Plan my trip <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
