import React from "react";

export default function EventInfoStrip() {
  return (
    <section className="event-info-strip section-shell" aria-label="Event information specification">
      <div className="event-info-grid">
        {/* Top Row: Date and Venue */}
        <div className="event-info-row-top">
          <div className="info-cell">
            <div className="info-cell-header">
              <span className="info-cell-label">DATE</span>
              <span className="info-cell-code">01</span>
            </div>
            <div className="info-cell-content">
              <strong className="info-cell-val">16–17</strong>
              <span className="info-cell-sub">Oct 2026</span>
            </div>
          </div>
          <div className="info-cell info-cell-venue-centered">
            <div className="info-cell-header">
              <span className="info-cell-label">VENUE</span>
              <span className="info-cell-code">02</span>
            </div>
            <div className="info-cell-content">
              <strong className="info-cell-val">GIMT Building</strong>
              <span className="info-cell-sub">Room 408</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Row: Time (Centered) */}
        <div className="event-info-row-bottom">
          <div className="info-cell info-cell-centered">
            <div className="info-cell-header">
              <span className="info-cell-label">TIME</span>
              <span className="info-cell-code">03</span>
            </div>
            <div className="info-cell-content">
              <strong className="info-cell-val">Coming soon</strong>
              <span className="info-cell-sub">Schedule TBA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
