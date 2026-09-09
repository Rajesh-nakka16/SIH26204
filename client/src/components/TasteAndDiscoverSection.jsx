import React from 'react';
import { Plus, MapPin } from 'lucide-react';
import { money } from '../data/defaultPlan';

export default function TasteAndDiscoverSection({
  plan,
  onAddFood,
  onAddGem,
  addedFoods = [],
  addedGems = [],
}) {
  if (!plan) return null;

  return (
    <section className="section">
      <div className="two-column">
        {/* Left: 05 / TASTE LOCAL */}
        <div>
          <div className="sub-heading">
            <span className="kicker">05 / TASTE LOCAL</span>
            <h2>Taste the destination</h2>
            <p>Not just restaurants. The flavours that make Araku, Araku.</p>
          </div>

          <div className="food-list">
            {plan.food_spots?.map((f, i) => {
              const isAdded = addedFoods.includes(f.name);
              return (
                <div key={f.name} className="food-row">
                  <div className={`food-index food-${i}`}>
                    0{i + 1}
                  </div>

                  <div className="food-info">
                    <small>{f.kind}</small>
                    <h3>{f.name}</h3>
                    <p>{f.detail}</p>
                  </div>

                  <div className="food-detail">
                    <b>
                      {money(f.cost)}
                      <small>/person</small>
                    </b>
                    <span>
                      {f.distance} · {f.time}
                    </span>
                  </div>

                  <button
                    className="round-action"
                    onClick={() => onAddFood(f)}
                    data-testid={`add-food-${i}`}
                    title="Add to trip"
                    type="button"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: 06 / STAY CURIOUS */}
        <div id="discover">
          <div className="sub-heading">
            <span className="kicker">06 / STAY CURIOUS</span>
            <h2>Discover places others miss</h2>
            <p>Low crowds. Real connection. A better story to take home.</p>
          </div>

          <div className="gem-grid">
            {plan.hidden_gems?.map((g, i) => {
              const isAdded = addedGems.includes(g.name);
              return (
                <div key={g.name} className="gem-card">
                  <div className={`gem-art gem-art-${i}`}>
                    <span>{g.crowd} crowd</span>
                    <MapPin size={21} />
                  </div>

                  <small>{g.category}</small>
                  <h3>{g.name}</h3>

                  <div>
                    <span>{g.detail}</span>
                    <span>{g.best_time}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddGem(g)}
                    data-testid={`add-gem-${i}`}
                  >
                    <span>{isAdded ? 'Added to trip ✓' : 'Add to trip +'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
