import React, { useEffect, useState } from 'react';
import { X, Calendar, MapPin, Users, Wallet, Trash2, ArrowRight } from 'lucide-react';
import { getSavedTrips } from '../services/api';
import { money } from '../data/defaultPlan';

export default function SavedTripsModal({ isOpen, onClose, onLoadTrip }) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getSavedTrips().then((data) => setTrips(data || []));
    }
  }, [isOpen]);

  const handleDelete = (index, e) => {
    e.stopPropagation();
    try {
      const updated = trips.filter((_, idx) => idx !== index);
      setTrips(updated);
      localStorage.setItem('explorex_saved_trips', JSON.stringify(updated));
    } catch (err) {}
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ margin: 0, fontFamily: '"Space Grotesk", sans-serif', fontSize: '20px' }}>
              My Saved Trips
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#8faea7' }}>
              Stored offline & synced when connected
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 0, color: '#94a3b8', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {trips.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 0', color: '#8faea7', fontSize: '13px' }}>
            No saved trips yet. Plan an adventure and click "Save trip"!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '380px', overflowY: 'auto' }}>
            {trips.map((t, idx) => (
              <div
                key={t.id || idx}
                onClick={() => {
                  onLoadTrip(t);
                  onClose();
                }}
                style={{
                  background: 'rgba(5, 22, 27, 0.75)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                className="hover:border-lime"
              >
                <div>
                  <h4 style={{ margin: '0 0 6px', fontFamily: '"Space Grotesk", sans-serif', fontSize: '15px' }}>
                    {t.start} → {t.destination}
                  </h4>
                  <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: '#8faea7' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {t.days} days
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={12} /> {t.travellers} people
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Wallet size={12} /> ₹{Number(t.budget || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={(e) => handleDelete(idx, e)}
                    style={{ background: 'none', border: 0, color: '#ff8a70', cursor: 'pointer', padding: '6px' }}
                    title="Remove trip"
                  >
                    <Trash2 size={15} />
                  </button>
                  <ArrowRight size={16} color="#b6ef75" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
