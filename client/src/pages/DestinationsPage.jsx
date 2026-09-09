import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ArrowUpRight, Search, ShieldCheck } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/defaultPlan';

export default function DestinationsPage({ setForm }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = POPULAR_DESTINATIONS.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.state.toLowerCase().includes(query.toLowerCase()) ||
    d.tag.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (dest) => {
    setForm((prev) => ({
      ...prev,
      destination: dest.name,
    }));
    navigate('/planner');
  };

  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '40px' }}>
      <div className="section-heading">
        <div>
          <span className="kicker">EXPLORE INDIA</span>
          <h2>Discover Destinations</h2>
          <p>Curated smart travel destinations with real-time crowd metrics and local hidden gems.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by destination, state, or mood..."
          style={{
            paddingLeft: '44px',
            background: 'rgba(5, 22, 27, 0.7)',
            fontSize: '15px',
          }}
        />
        <Search size={18} style={{ position: 'absolute', left: '16px', top: '22px', color: '#65877c' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map((dest) => (
          <div
            key={dest.id}
            className="glass-panel"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s',
            }}
          >
            <div>
              <div
                style={{
                  height: '160px',
                  backgroundImage: `url(${dest.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(11,24,32,0.8), transparent)' }}></div>
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'var(--lime)',
                    color: '#10211e',
                    padding: '4px 8px',
                    borderRadius: '3px',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}
                >
                  {dest.tag}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(4, 20, 23, 0.85)',
                    color: '#ff9f54',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Star size={12} fill="#ff9f54" /> {dest.rating}
                </span>
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8faea7', fontSize: '12px', marginBottom: '4px' }}>
                  <MapPin size={13} color="#b6ef75" /> {dest.state} • Best: {dest.bestTime}
                </div>
                <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '20px', margin: '6px 0 10px' }}>
                  {dest.name}
                </h3>
                <p style={{ color: '#9cb8b0', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                  {dest.description}
                </p>
              </div>
            </div>

            <div style={{ padding: '0 20px 20px' }}>
              <button
                className="button button-primary full"
                onClick={() => handleSelect(dest)}
                type="button"
              >
                Plan trip to {dest.name} <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
