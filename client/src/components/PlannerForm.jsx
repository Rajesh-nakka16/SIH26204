import React from 'react';
import { Sparkles, ArrowUpRight, Zap, MapPin } from 'lucide-react';

export default function PlannerForm({ form, setForm, onGenerate, isGenerating }) {
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <section className="section" id="planner">
      <div className="section-heading">
        <div>
          <span className="kicker">01 / START HERE</span>
          <h2>Plan your complete trip</h2>
          <p>One budget. Every decision. A journey designed around you.</p>
        </div>
        <div className="step-pill">
          STEP 01 <i></i> 04
        </div>
      </div>

      <div className="planner-grid">
        {/* Left Form Card */}
        <div className="glass-panel form-panel">
          <div className="panel-top">
            <span className="panel-number">01</span>
            <span className="panel-status">
              <span className="green-dot"></span> Ready to plan
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field-grid">
              <div>
                <label htmlFor="start-point">Starting point</label>
                <input
                  id="start-point"
                  type="text"
                  value={form.start}
                  onChange={(e) => handleChange('start', e.target.value)}
                  placeholder="e.g. Hyderabad"
                  data-testid="input-start-point"
                  required
                />
              </div>

              <div>
                <label htmlFor="destination-point">Destination</label>
                <input
                  id="destination-point"
                  type="text"
                  value={form.destination}
                  onChange={(e) => handleChange('destination', e.target.value)}
                  placeholder="e.g. Araku Valley"
                  data-testid="input-destination"
                  required
                />
              </div>
            </div>

            <div className="field-grid" style={{ marginTop: '18px' }}>
              <div className="input-with-suffix">
                <label htmlFor="travellers-count">Travellers</label>
                <input
                  id="travellers-count"
                  type="number"
                  min="1"
                  max="20"
                  value={form.travellers}
                  onChange={(e) => handleChange('travellers', parseInt(e.target.value, 10) || 1)}
                  data-testid="input-travellers"
                  required
                />
                <span>people</span>
              </div>

              <div className="input-with-suffix">
                <label htmlFor="duration-days">Duration</label>
                <input
                  id="duration-days"
                  type="number"
                  min="1"
                  max="14"
                  value={form.days}
                  onChange={(e) => handleChange('days', parseInt(e.target.value, 10) || 1)}
                  data-testid="input-duration"
                  required
                />
                <span>days</span>
              </div>
            </div>

            <div className="budget-field">
              <label htmlFor="budget-amount">Total budget</label>
              <div className="budget-input">
                <span>₹</span>
                <input
                  id="budget-amount"
                  type="number"
                  step="500"
                  min="5000"
                  value={form.budget}
                  onChange={(e) => handleChange('budget', parseInt(e.target.value, 10) || 0)}
                  data-testid="input-budget"
                  required
                />
                <span>INR</span>
              </div>
            </div>

            <div>
              <label htmlFor="travel-mood">Travel mood</label>
              <select
                id="travel-mood"
                value={form.preferences}
                onChange={(e) => handleChange('preferences', e.target.value)}
                data-testid="select-travel-mood"
              >
                <option value="Nature + Local Food + Relaxation">Nature + Local Food + Relaxation</option>
                <option value="Heritage & Ancient Temples">Heritage & Ancient Temples</option>
                <option value="Adventure & Forest Trekking">Adventure & Forest Trekking</option>
                <option value="Slow Travel & Tribal Culture">Slow Travel & Tribal Culture</option>
                <option value="Budget Explorer">Budget Explorer</option>
              </select>
            </div>

            <button
              type="submit"
              className="button button-primary full"
              style={{ marginTop: '22px' }}
              disabled={isGenerating}
              data-testid="generate-trip-button"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin inline-block mr-2">⚙</span> Designing journey...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Generate my trip <ArrowUpRight size={16} />
                </>
              )}
            </button>

            <div className="form-note">
              <Zap size={13} /> Demo intelligence is ready. Live assistant available below.
            </div>
          </form>
        </div>

        {/* Right Route Visualizer Aside */}
        <div className="planner-aside">
          <div className="aside-map">
            <div className="map-grid"></div>
            <div className="route-line"></div>

            <div className="map-pin pin-a">
              <MapPin size={22} />
            </div>
            <span className="map-label label-a">HYD</span>

            <div className="map-pin pin-b">
              <MapPin size={24} />
            </div>
            <span className="map-label label-b">ARAKU</span>

            <div className="map-card">
              <span className="green-dot"></span>
              <span>Route ready</span>
              <b>612 km</b>
            </div>
          </div>

          <div className="aside-callout">
            <div className="orange-line"></div>
            <div>
              <b>Travel differently.</b>
              <p>We look beyond the obvious to find the right fit for your time, money and mood.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
