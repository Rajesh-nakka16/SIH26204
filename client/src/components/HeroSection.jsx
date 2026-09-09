import React, { useState } from 'react';
import { ArrowUpRight, ChevronRight, MapPin, CloudOff, Utensils, ShieldCheck, Landmark, Home, Trees, Mountain } from 'lucide-react';
import { MOUNTAIN_IMAGE, FALLBACK_IMAGE } from '../data/defaultPlan';

export default function HeroSection({ onPlanClick }) {
  const [activePin, setActivePin] = useState(null);
  const [bgImage, setBgImage] = useState(MOUNTAIN_IMAGE);

  const pins = [
    { id: 'temple', x: '58%', y: '40%', label: 'Borra Caves & Temple', icon: Landmark, type: 'Attraction' },
    { id: 'homestay', x: '78%', y: '58%', label: 'Mountain Homestay', icon: Home, type: 'Stay' },
    { id: 'coffee', x: '73%', y: '75%', label: 'Coffee Plantations', icon: Trees, type: 'Local Taste' },
    { id: 'peak', x: '83%', y: '28%', label: 'Galikonda Viewpoint', icon: Mountain, type: 'Secret Gem' },
  ];

  return (
    <>
      <section className="hero">
        <div
          className="hero-image"
          style={{ backgroundImage: `url(${bgImage})` }}
          onError={() => setBgImage(FALLBACK_IMAGE)}
        >
          {/* Interactive floating map pins for rich immersion */}
          {pins.map((pin) => {
            const Icon = pin.icon;
            return (
              <div
                key={pin.id}
                style={{
                  position: 'absolute',
                  left: pin.x,
                  top: pin.y,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setActivePin(pin.id)}
                onMouseLeave={() => setActivePin(null)}
                onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(11, 24, 32, 0.85)',
                    border: '1.5px solid #b6ef75',
                    color: '#b6ef75',
                    display: 'grid',
                    placeItems: 'center',
                    boxShadow: '0 0 15px rgba(182, 239, 117, 0.4)',
                    transition: 'transform 0.2s',
                  }}
                  className="hover:scale-125"
                >
                  <Icon size={16} />
                </div>
                {activePin === pin.id && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '40px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(8, 23, 29, 0.95)',
                      border: '1px solid #b6ef75',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      whiteSpace: 'nowrap',
                      color: '#f4fbf6',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
                      pointerEvents: 'none',
                    }}
                  >
                    <span style={{ color: '#b6ef75', fontWeight: 600 }}>{pin.label}</span>
                    <span style={{ display: 'block', fontSize: '9px', color: '#8faea7' }}>{pin.type}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hero-shade"></div>

        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse-dot"></span> AI-POWERED SMART TOURISM
          </div>
          <h1>
            Explore beyond
            <br />
            <em>the expected.</em>
          </h1>
          <p>
            Your complete journey, planned around your budget, your curiosity and the places others miss.
          </p>
          <div className="hero-actions">
            <a
              href="#planner"
              className="button button-primary"
              data-testid="hero-plan-button"
              onClick={onPlanClick}
            >
              Plan my trip <ArrowUpRight size={16} />
            </a>
            <a
              href="#discover"
              className="button button-ghost"
              data-testid="hero-explore-button"
            >
              Explore destinations <ChevronRight size={16} />
            </a>
          </div>
        </div>

        <div className="hero-stats">
          <div>
            <strong>₹25,000</strong>
            <span>Trip budget</span>
          </div>
          <div>
            <strong className="green-text">72%</strong>
            <span>Budget remaining</span>
          </div>
          <div>
            <strong>LOW</strong>
            <span>Crowd nearby</span>
          </div>
          <div>
            <strong>03</strong>
            <span>Hidden gems</span>
          </div>
        </div>

        <div className="hero-tag">
          <MapPin size={14} />
          <span>Araku Valley, India • 17.3° N</span>
        </div>
      </section>

      {/* Signal strip ticker */}
      <div className="signal-strip">
        <div>
          <span className="signal-icon cyan">
            <CloudOff size={18} />
          </span>
          <div>
            <b>Offline mode ready</b>
            <small>Your trip stays with you</small>
          </div>
        </div>

        <div>
          <span className="signal-icon orange">
            <Utensils size={18} />
          </span>
          <div>
            <b>Local experiences</b>
            <small>Spend where it matters</small>
          </div>
        </div>

        <div>
          <span className="signal-icon green">
            <ShieldCheck size={18} />
          </span>
          <div>
            <b>Safety, always on</b>
            <small>Help when you need it</small>
          </div>
        </div>
      </div>
    </>
  );
}
