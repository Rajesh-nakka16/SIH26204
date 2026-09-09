import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';

export default function ItinerarySection({ plan, onDownloadOffline }) {
  const [downloaded, setDownloaded] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  if (!plan || !plan.itinerary) return null;

  const handleDownload = () => {
    setDownloaded(true);
    onDownloadOffline();
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section className="section" id="itinerary">
      <div className="section-heading">
        <div>
          <span className="kicker">08 / THE FLOW</span>
          <h2>Your AI itinerary</h2>
          <p>A day-by-day rhythm that leaves room for wonder.</p>
        </div>

        <button
          className="button button-outline"
          onClick={handleDownload}
          data-testid="download-itinerary-button"
          type="button"
        >
          {downloaded ? <Check size={15} color="#b6ef75" /> : <Download size={15} />}
          {downloaded ? 'Downloaded offline' : 'Download offline'}
        </button>
      </div>

      <div className="timeline">
        {plan.itinerary.map((d, i) => (
          <div
            key={d.day}
            className={`day-card ${i === activeDayIndex ? 'active-day' : ''}`}
            onClick={() => setActiveDayIndex(i)}
            style={{ cursor: 'pointer' }}
          >
            <div className="day-num">
              DAY <strong>{d.day}</strong>
            </div>

            <div className="day-content">
              <div className="day-header">
                <h3>{d.title}</h3>
                <span>Est. {d.cost}</span>
              </div>

              {d.items?.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <time>{item[0]}</time>
                  <span></span>
                  <b>{item[1]}</b>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
