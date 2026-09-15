import Link from "next/link";
import EventInfoStrip from "@/components/EventInfoStrip";

export default function HeroSection() {
  return (
    <section className="forge-hero section-shell" id="hero" aria-labelledby="hero-title">
      {/* Photographic Event Backdrop Layer */}
      <div className="hero-backdrop" aria-hidden="true">
        <picture>
          <source media="(max-width: 768px)" srcSet="/assets/pitch-event-mobile.jpg" />
          <img
            src="/assets/pitch-event-desktop.jpg"
            alt=""
            className="hero-backdrop-img"
            loading="eager"
          />
        </picture>
        <div className="hero-backdrop-overlay" />
        <div className="hero-backdrop-glow" />
      </div>

      <div className="forge-hero-content">
        <div className="forge-university-branding">
          <img 
            src="/assets/gcu-logo.png" 
            alt="Girijananda Chowdhury University Logo" 
            className="gcu-logo"
          />
          <div className="gcu-name">
            GIRIJANANDA CHOWDHURY<br className="mobile-break" /> UNIVERSITY
          </div>
          <div className="gcu-separator" aria-hidden="true">×</div>
          <div className="gcu-cell">INCUBATION CENTRE</div>
          <div className="gcu-presents">PRESENTS</div>
        </div>
        
        <div className="forge-hero-logo">
          <img 
            src="/assets/ideaforge-2026-logo.png" 
            alt="IDEAFORGE 2026" 
            className="ideaforge-logo"
          />
        </div>

        <p className="forge-tagline">
          Forge the<br />
          <em>Future.</em>
        </p>
        <p className="forge-hero-support">
          The first ideathon by the Incubation Centre.
        </p>
        
        <div className="forge-hero-actions">
          <Link className="lime-button hero-primary-btn" href="/register">
            Register now <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <hr className="hero-divider" />
      </div>

      {/* Event Information Specification Grid */}
      <EventInfoStrip />

      <div className="hero-bottom">
        <span>| SCROLL TO EXPLORE</span>
        <span>GCU / GUWAHATI / INDIA</span>
      </div>
    </section>
  );
}
