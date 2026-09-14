import Link from "next/link";
import GuidelinesOverlay from "@/components/GuidelinesOverlay";
import HeroPresentationScreen from "@/components/HeroPresentationScreen";
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

      <div className="forge-hero-grid">
        <div className="forge-hero-copy">
          <div className="forge-eyebrow">
            <span className="status-dot" /> INCUBATION CENTRE PRESENTS
          </div>
          <h1 id="hero-title">
            <span className="hero-idea">IDEAFORGE</span>
            <span className="hero-year">2026</span>
          </h1>
          <p className="forge-tagline">
            Forge the<br />
            <em>Future.</em>
          </p>
          <p className="forge-hero-support">
            The first ideathon by the Incubation Centre.
          </p>
          <div className="forge-meta">
            <div className="forge-meta-item">
              <svg
                className="meta-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <div>
                <b>16–17</b>
                <span>October 2026</span>
              </div>
            </div>
            <div className="forge-meta-item">
              <svg
                className="meta-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <b>GIMT Building</b>
                <span className="meta-sub">Room 408</span>
              </div>
            </div>
          </div>
          <div className="forge-hero-actions desktop-hero-actions">
            <Link className="lime-button hero-primary-btn" href="/register">
              Register now <span aria-hidden="true">↗</span>
            </Link>
            <GuidelinesOverlay className="dark-button hero-secondary-btn" label="View guidelines" />
          </div>
        </div>

        <div className="forge-hero-art" aria-label="Live event stage presentation display" role="region">
          <div className="art-coordinates">26°08&apos;N / 91°44&apos;E</div>
          <div className="art-annotation annotation-one">IDEA / 001</div>
          <div className="art-annotation annotation-three">CURIOSITY <span>→</span></div>

          {/* Interactive Live Presentation Screen with typing animation and glowing bulb */}
          <HeroPresentationScreen />

          <div className="art-stage-accent" aria-hidden="true">
            <div className="stage-accent-line" />
            <span className="stage-accent-label">PITCH STAGE DEMO</span>
          </div>

          <span className="art-side-label">01 / POSSIBILITY</span>
        </div>
      </div>

      {/* Event Information Specification Grid */}
      <EventInfoStrip />

      {/* Mobile Primary Hero Action */}
      <div className="mobile-hero-actions">
        <Link className="lime-button mobile-primary-btn" href="/register">
          Register now <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="hero-bottom">
        <span>| SCROLL TO EXPLORE</span>
        <span>GCU / GUWAHATI / INDIA</span>
      </div>
    </section>
  );
}
