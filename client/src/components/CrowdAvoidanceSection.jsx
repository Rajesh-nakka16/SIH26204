import React from 'react';
import { Flame, Navigation, Zap, ChevronRight } from 'lucide-react';

export default function CrowdAvoidanceSection({
  plan,
  crowdChoice,
  setCrowdChoice,
}) {
  if (!plan || !plan.crowd) return null;

  const currentPercent = crowdChoice ? 18 : 92;
  const currentStatus = crowdChoice ? 'LOW' : 'OVERCROWDED';
  const currentMessage = crowdChoice
    ? `Good choice. ${crowdChoice} keeps you away from the rush.`
    : 'Borra Caves is at peak capacity. Instead of waiting in the crowd, discover something new nearby.';

  return (
    <section className="section crowd-section">
      <div className="section-heading">
        <div>
          <span className="kicker">07 / GO ANOTHER WAY</span>
          <h2>Avoid the crowd</h2>
          <p>When the obvious gets busy, EXPLOREX opens another door.</p>
        </div>

        <span className="crowd-alert">
          <Flame size={15} /> LIVE CROWD WATCH
        </span>
      </div>

      <div className="crowd-grid">
        {/* Main Alert Card */}
        <div className="crowd-main">
          <div className="crowd-top">
            <div>
              <small>POPULAR ATTRACTION</small>
              <h3>{plan.crowd.name}</h3>
            </div>

            <div className="crowd-percent">
              <strong>{currentPercent}%</strong>
              <span>{currentStatus}</span>
            </div>
          </div>

          <div className="crowd-meter">
            <span style={{ width: `${currentPercent}%` }}></span>
          </div>

          <p className="crowd-message">{currentMessage}</p>

          <div className="crowd-features">
            <span>
              <Navigation size={14} /> Best alternative nearby
            </span>
            <span>
              <Zap size={14} /> Saves up to ₹600
            </span>
          </div>
        </div>

        {/* Alternative List */}
        <div className="alternative-list">
          {plan.crowd.alternatives?.map((a) => {
            const isChosen = crowdChoice === a.name;
            return (
              <button
                key={a.name}
                className={`alt-row ${isChosen ? 'chosen' : ''}`}
                onClick={() => setCrowdChoice(isChosen ? null : a.name)}
                data-testid={`crowd-alternative-${a.name.toLowerCase().replaceAll(' ', '-')}`}
                type="button"
              >
                <span className="alt-level">{a.level}</span>

                <div>
                  <b>{a.name}</b>
                  <small>{a.distance}</small>
                </div>

                <span className="saving">{a.saving}</span>
                <ChevronRight size={14} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
