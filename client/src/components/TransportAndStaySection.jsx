import React from 'react';
import {
  TramFront,
  Navigation,
  Check,
  Plus,
  Sparkles,
} from 'lucide-react';
import { money, MOUNTAIN_IMAGE, FALLBACK_IMAGE } from '../data/defaultPlan';

export default function TransportAndStaySection({
  plan,
  selectedTransport,
  setSelectedTransport,
  onAddStay,
  addedStays = [],
}) {
  if (!plan) return null;

  const getTransportIcon = (name) => {
    if (name === 'Train') return <TramFront size={18} />;
    return <Navigation size={18} />;
  };

  return (
    <section className="section">
      <div className="two-column">
        {/* Left: 03 / MOVE SMART */}
        <div>
          <div className="sub-heading">
            <span className="kicker">03 / MOVE SMART</span>
            <h2>How should you travel?</h2>
            <p>The best route isn't always the fastest. It's the one that fits.</p>
          </div>

          <div className="transport-list">
            {plan.transport_options?.map((t) => {
              const isSelected = selectedTransport === t.name;
              return (
                <button
                  key={t.name}
                  className={`transport-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedTransport(t.name)}
                  data-testid={`transport-${t.name.toLowerCase()}`}
                  type="button"
                >
                  <span className="transport-icon">{getTransportIcon(t.name)}</span>

                  <span className="transport-name">
                    <b>{t.name}</b>
                    {t.recommended && <small>EXPLOREX PICK</small>}
                  </span>

                  <span>
                    <small>COST</small>
                    <b>{money(t.cost)}</b>
                  </span>

                  <span>
                    <small>TIME</small>
                    <b>{t.time}</b>
                  </span>

                  <span>
                    <small>COMFORT</small>
                    <b>{t.comfort}</b>
                  </span>

                  <span className="select-mark">
                    {isSelected ? <Check size={15} /> : <Plus size={15} />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ai-note">
            <Sparkles size={16} />
            <div>
              <b>Best option for your family</b> — Train has the lowest cost-to-comfort ratio for {plan.travellers} travellers.
            </div>
          </div>
        </div>

        {/* Right: 04 / REST WELL */}
        <div>
          <div className="sub-heading">
            <span className="kicker">04 / REST WELL</span>
            <h2>Where should you stay?</h2>
            <p>Places with a story, not just a room.</p>
          </div>

          <div className="stay-cards">
            {plan.stay_options?.map((s) => {
              const isAdded = addedStays.includes(s.name);
              return (
                <div key={s.name} className="stay-card">
                  <div
                    className="stay-visual"
                    style={{ backgroundImage: `url(${s.image || MOUNTAIN_IMAGE})` }}
                  >
                    <span>{s.tag}</span>
                  </div>

                  <div className="stay-body">
                    <small>
                      {s.type} · {s.distance}
                    </small>
                    <h3>{s.name}</h3>

                    <div className="stay-meta">
                      <b>
                        {money(s.nightly)}
                        <small>/night</small>
                      </b>
                      <span>★ {s.rating}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddStay(s)}
                      data-testid={`add-stay-${s.name.toLowerCase().replaceAll(' ', '-')}`}
                    >
                      <span>{isAdded ? 'Added to trip ✓' : 'Add to trip +'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
