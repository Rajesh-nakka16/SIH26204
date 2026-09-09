import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, Wallet, Trash2, ArrowRight, Compass } from 'lucide-react';
import { getSavedTrips } from '../services/api';
import { money } from '../data/defaultPlan';

export default function SavedTripsPage({ onLoadTrip }) {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSavedTrips().then((data) => setTrips(data || []));
  }, []);

  const handleDelete = (index, e) => {
    e.stopPropagation();
    const updated = trips.filter((_, idx) => idx !== index);
    setTrips(updated);
    try {
      localStorage.setItem('explorex_saved_trips', JSON.stringify(updated));
    } catch (err) {}
  };

  const handleSelect = (t) => {
    onLoadTrip(t);
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('control-center');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '40px' }}>
      <div className="section-heading">
        <div>
          <span className="kicker">MY ADVENTURES</span>
          <h2>Saved Trips</h2>
          <p>Access your offline trip itineraries, budget snapshots, and custom notes.</p>
        </div>
        <Link to="/planner" className="button button-primary">
          Plan New Trip +
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Compass size={40} color="#b6ef75" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '20px' }}>
            No saved journeys yet
          </h3>
          <p style={{ color: '#8faea7', maxWidth: '400px', margin: '8px auto 20px', fontSize: '13px' }}>
            Start planning your dream trip to Araku Valley or any Indian destination!
          </p>
          <Link to="/planner" className="button button-primary">
            Plan your first trip
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {trips.map((t, idx) => (
            <div
              key={t.id || idx}
              className="glass-panel"
              style={{
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onClick={() => handleSelect(t)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="kicker" style={{ fontSize: '10px' }}>SAVED ITINERARY</span>
                  <button
                    onClick={(e) => handleDelete(idx, e)}
                    style={{ background: 'none', border: 0, color: '#ff8a70', cursor: 'pointer' }}
                    title="Delete trip"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '22px', margin: '10px 0 16px' }}>
                  {t.start} → {t.destination}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#c0d4ce' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={15} color="#b6ef75" />
                    <span>Duration: <b>{t.days} Days</b></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={15} color="#b6ef75" />
                    <span>Travellers: <b>{t.travellers} People</b></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Wallet size={15} color="#b6ef75" />
                    <span>Budget: <b>{money(t.budget)}</b></span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--mint)', fontSize: '12px' }}>Open trip view</span>
                <ArrowRight size={16} color="#b6ef75" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
