import React, { useState, useRef } from 'react';
import {
  CloudOff,
  Download,
  Check,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
  HeartPulse,
  MapPin,
  Navigation,
  X,
  PhoneCall,
  AlertTriangle,
} from 'lucide-react';
import { askAssistant } from '../services/api';

export default function UtilitySuite({
  assistant,
  setAssistant,
  lang,
  setLang,
  chat,
  setChat,
  onDownloadPack,
}) {
  const [packDownloaded, setPackDownloaded] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosHolding, setSosHolding] = useState(false);
  const [sosProgress, setSosProgress] = useState(0);

  const holdIntervalRef = useRef(null);

  const languages = [
    { label: 'English', code: 'English' },
    { label: 'తెలుగు', code: 'Telugu' },
    { label: 'हिन्दी', code: 'Hindi' },
  ];

  const handleAsk = async () => {
    if (!chat.trim() || isAsking) return;
    const userMsg = chat;
    setChat('');
    setIsAsking(true);

    try {
      const reply = await askAssistant(userMsg, lang);
      setAssistant(reply);
    } catch (err) {
      setAssistant('I am ready to help you explore Araku Valley! Ask me about food, routes, or local culture.');
    } finally {
      setIsAsking(false);
    }
  };

  const handleDownloadTripPack = () => {
    setPackDownloaded(true);
    onDownloadPack();
    setTimeout(() => setPackDownloaded(false), 4000);
  };

  // Hold to send SOS logic
  const startSosHold = () => {
    setSosHolding(true);
    let progress = 0;
    holdIntervalRef.current = setInterval(() => {
      progress += 10;
      setSosProgress(progress);
      if (progress >= 100) {
        clearInterval(holdIntervalRef.current);
        setSosHolding(false);
        setSosProgress(0);
        setSosModalOpen(true);
      }
    }, 150);
  };

  const cancelSosHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    setSosHolding(false);
    setSosProgress(0);
  };

  return (
    <section className="section" id="safety">
      <div className="utility-grid">
        {/* Card 1: 09 / NO SIGNAL, NO PROBLEM */}
        <div className="utility-card offline-card">
          <div className="utility-icon">
            <CloudOff size={19} />
          </div>

          <span className="kicker">09 / NO SIGNAL, NO PROBLEM</span>
          <h2>
            Explore without
            <br />
            <em>internet.</em>
          </h2>

          <p>
            Your maps, routes, food spots, safety points and hidden gems are downloaded and ready when the signal isn't.
          </p>

          <div className="offline-status">
            <span className="green-dot"></span>
            <span>OFFLINE MODE ACTIVE</span>
            <span>GPS available</span>
          </div>

          <button
            className="button button-light full"
            onClick={handleDownloadTripPack}
            data-testid="download-trip-pack-button"
            type="button"
          >
            {packDownloaded ? (
              <>
                <Check size={16} /> Trip pack stored locally
              </>
            ) : (
              <>
                <Download size={16} /> Download trip pack
              </>
            )}
          </button>
        </div>

        {/* Card 2: AI ASSISTANT */}
        <div className="utility-card assistant-card">
          <div className="assistant-top">
            <div className="utility-icon cyan-bg">
              <MessageCircle size={19} />
            </div>
            <div className="online-label">
              <span className="green-dot"></span> AI ASSISTANT
            </div>
          </div>

          <h2>
            Your travel
            <br />
            <em>companion.</em>
          </h2>

          <p>
            Ask anything about your journey, in the language that feels like home.
          </p>

          <div className="language-tabs">
            {languages.map((l) => (
              <button
                key={l.code}
                className={lang === l.code ? 'active' : ''}
                onClick={() => setLang(l.code)}
                data-testid={`language-${l.label}`}
                type="button"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Ask about your trip…"
              data-testid="assistant-input"
            />
            <button
              onClick={handleAsk}
              disabled={isAsking}
              data-testid="assistant-send-button"
              type="button"
              title="Send question"
            >
              <ArrowUpRight size={16} />
            </button>
          </div>

          {assistant && (
            <div className="assistant-reply" data-testid="assistant-reply">
              <Sparkles size={14} />
              <span>{assistant}</span>
            </div>
          )}
        </div>

        {/* Card 3: 10 / TRAVEL SAFELY */}
        <div className="utility-card sos-card">
          <div className="utility-icon red-bg">
            <HeartPulse size={19} />
          </div>

          <span className="kicker">10 / TRAVEL SAFELY</span>
          <h2>
            Help is
            <br />
            <em>always close.</em>
          </h2>

          <p>
            Location, emergency points and contacts stay accessible offline. Messages sync when a network returns.
          </p>

          <button
            className="sos-button"
            onMouseDown={startSosHold}
            onMouseUp={cancelSosHold}
            onMouseLeave={cancelSosHold}
            onTouchStart={startSosHold}
            onTouchEnd={cancelSosHold}
            onClick={() => setSosModalOpen(true)}
            data-testid="sos-button"
            type="button"
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {sosHolding && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${sosProgress}%`,
                  background: 'rgba(255, 75, 75, 0.4)',
                  transition: 'width 0.15s ease',
                  pointerEvents: 'none',
                }}
              />
            )}
            <HeartPulse size={18} />
            <span>{sosHolding ? `HOLDING (${sosProgress}%)` : 'Hold to send SOS'}</span>
          </button>

          <div className="sos-meta">
            <span>
              <MapPin size={13} /> GPS available
            </span>
            <span>
              <Navigation size={13} /> Safe route ready
            </span>
          </div>
        </div>
      </div>

      {/* SOS Emergency Dispatch Modal */}
      {sosModalOpen && (
        <div className="modal-overlay" onClick={() => setSosModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff8a70' }}>
                <AlertTriangle size={20} />
                <h3 style={{ margin: 0, fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px' }}>
                  Emergency Assistance — Offline Ready
                </h3>
              </div>
              <button
                onClick={() => setSosModalOpen(false)}
                style={{ background: 'none', border: 0, color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Current Coordinates: <b>18.3273° N, 82.8775° E (Araku Valley, AP)</b>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              <div style={{ background: 'rgba(5, 22, 27, 0.7)', padding: '12px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <b style={{ display: 'block', fontSize: '13px' }}>Araku Local Police Station</b>
                  <small style={{ color: '#88a69e' }}>Direct Emergency Desk</small>
                </div>
                <a href="tel:100" style={{ color: '#b6ef75', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <PhoneCall size={14} /> 100
                </a>
              </div>

              <div style={{ background: 'rgba(5, 22, 27, 0.7)', padding: '12px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <b style={{ display: 'block', fontSize: '13px' }}>Area Hospital & Medical Response</b>
                  <small style={{ color: '#88a69e' }}>Ambulance Support</small>
                </div>
                <a href="tel:108" style={{ color: '#b6ef75', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <PhoneCall size={14} /> 108
                </a>
              </div>

              <div style={{ background: 'rgba(5, 22, 27, 0.7)', padding: '12px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <b style={{ display: 'block', fontSize: '13px' }}>Forest & Wildlife Ranger Station</b>
                  <small style={{ color: '#88a69e' }}>Trekker Emergency Line</small>
                </div>
                <a href="tel:112" style={{ color: '#b6ef75', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <PhoneCall size={14} /> 112
                </a>
              </div>
            </div>

            <button
              onClick={() => {
                setSosModalOpen(false);
                setAssistant("Emergency SOS beacon simulated: Your location and emergency alert details were prepared for local dispatch.");
              }}
              style={{
                width: '100%',
                marginTop: '18px',
                padding: '12px',
                background: '#ff6a4b',
                color: '#fff',
                border: 0,
                borderRadius: '4px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Broadcast Offline Distress Beacon
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
