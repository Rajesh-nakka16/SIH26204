import React from 'react';
import UtilitySuite from '../components/UtilitySuite';
import { ShieldCheck, PhoneCall, AlertTriangle, MapPin, Radio } from 'lucide-react';

export default function SafetyPage({
  assistant,
  setAssistant,
  lang,
  setLang,
  chat,
  setChat,
  handleDownloadPack,
}) {
  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '40px' }}>
      <div className="section-heading">
        <div>
          <span className="kicker">OFFLINE SECURITY</span>
          <h2>Safety & Companion Hub</h2>
          <p>Real-time emergency beacons, local helpline directories, and multilingual travel advice.</p>
        </div>
      </div>

      <UtilitySuite
        assistant={assistant}
        setAssistant={setAssistant}
        lang={lang}
        setLang={setLang}
        chat={chat}
        setChat={setChat}
        onDownloadPack={handleDownloadPack}
      />

      <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#b6ef75', marginBottom: '12px' }}>
            <Radio size={20} />
            <h3 style={{ margin: 0, fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px' }}>
              Offline Mesh Relay
            </h3>
          </div>
          <p style={{ color: '#8faea7', fontSize: '13px', lineHeight: '1.6' }}>
            Even without cellular towers in deep valleys or caves, your location packets and itinerary notes are stored securely on your local device.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff9f54', marginBottom: '12px' }}>
            <PhoneCall size={20} />
            <h3 style={{ margin: 0, fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px' }}>
              Immediate Helplines
            </h3>
          </div>
          <p style={{ color: '#8faea7', fontSize: '13px', lineHeight: '1.6' }}>
            Police (100) • Medical Ambulance (108) • Disaster Helpline (1077) • Andhra Pradesh Tourism Helpline (1800-425-45454).
          </p>
        </div>
      </div>
    </div>
  );
}
