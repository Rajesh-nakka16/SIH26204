import React from 'react';
import { Save, Check, Wallet, ShieldCheck, CloudOff, Navigation, HeartPulse } from 'lucide-react';
import { money } from '../data/defaultPlan';

export default function TripControlCenter({ plan, crowdChoice, onSave, isSaved }) {
  if (!plan) return null;

  const remaining = Math.max(0, (plan.budget || 0) - (plan.total || 0));
  const progressPercent = Math.min(100, Math.round(((plan.total || 0) / (plan.budget || 1)) * 100));

  return (
    <section className="section control-section" id="control-center">
      <div className="section-heading">
        <div>
          <span className="kicker">02 / YOUR JOURNEY</span>
          <h2>Trip control center</h2>
          <p>
            {plan.start} <span className="text-gray-500">→</span> {plan.destination} • {plan.travellers} travellers • {plan.days} days
          </p>
        </div>
        <button
          className="save-top"
          style={{ border: '1px solid var(--line)', padding: '10px 16px', borderRadius: '4px' }}
          onClick={onSave}
          data-testid="save-trip-control"
        >
          {isSaved ? <Check size={15} color="#b6ef75" /> : <Save size={15} />}
          {isSaved ? 'Saved this trip' : 'Save this trip'}
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Card 1: Total & Spent */}
        <div className="glass-panel total-card">
          <span className="total-label">
            TRIP TOTAL <span className="live-badge">• LIVE PLAN</span>
          </span>
          <strong>{money(plan.total)}</strong>

          <div className="total-meta">
            <span>
              Budget <b>{money(plan.budget)}</b>
            </span>
            <span>
              <b>{money(remaining)}</b> remaining
            </span>
          </div>

          <div className="progress">
            <span style={{ width: `${progressPercent}%` }}></span>
          </div>

          <div className="total-footer">
            <span>
              <Wallet size={14} /> {money(plan.spent)} spent
            </span>
            <span>
              <ShieldCheck size={14} /> Emergency ready
            </span>
          </div>
        </div>

        {/* Card 2: Status indicators */}
        <div className="glass-panel status-card">
          <div className="status-row">
            <span className="status-icon green">
              <CloudOff size={16} />
            </span>
            <div>
              <small>OFFLINE MAP</small>
              <b>Downloaded</b>
            </div>
            <Check className="check" size={16} />
          </div>

          <div className="status-row">
            <span className="status-icon orange">
              <Navigation size={16} />
            </span>
            <div>
              <small>CROWD STATUS</small>
              <b>{crowdChoice ? 'Low · Alternative' : 'Moderate · Watch'}</b>
            </div>
            <span className="tiny-pill">
              {crowdChoice ? '18%' : '34%'}
            </span>
          </div>

          <div className="status-row">
            <span className="status-icon cyan">
              <HeartPulse size={16} />
            </span>
            <div>
              <small>SAFETY</small>
              <b>Ready to assist</b>
            </div>
            <span className="tiny-pill green-pill">ON</span>
          </div>
        </div>

        {/* Card 3: Budget Signal Chart */}
        <div className="glass-panel budget-card">
          <div className="card-title">
            <span>Budget signal</span>
            <b>100%</b>
          </div>

          <div className="budget-bars">
            {plan.budget_breakdown?.map((x) => {
              const barHeight = Math.max(14, Math.min(100, Math.round((x.amount / (plan.budget || 1)) * 480)));
              return (
                <div key={x.label} className="bar-item">
                  <span
                    className={`bar bar-${x.color}`}
                    style={{ height: `${barHeight}%` }}
                    title={`${x.label}: ${money(x.amount)}`}
                  ></span>
                  <small>{x.label}</small>
                  <b>{money(x.amount)}</b>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
