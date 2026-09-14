import Image from "next/image";

export default function ForgeFooter() {
  return (
    <footer className="forge-footer-root" role="contentinfo">
      <div className="section-shell">
        <div className="footer-top-rule" />

        <div className="footer-editorial-grid">
          {/* Brand & Mission Column */}
          <div className="footer-brand-col">
            <a href="#top" className="footer-brand-link" aria-label="IDEAFORGE 2026 Home">
              <Image
                src="/assets/ideaforge-2026-logo.png"
                alt="IDEAFORGE 2026 — Forge the Future"
                width={170}
                height={40}
                className="footer-brand-logo"
              />
            </a>
            <p className="footer-tagline">
              An innovation-driven student ideathon fostering next-generation technology,
              problem-solving and startup ventures.
            </p>
            <div className="footer-org-badge">
              <span>ORGANIZED BY</span>
              <strong>Incubation Centre, GCU</strong>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="footer-nav-col">
            <span className="footer-col-header">EXPLORE</span>
            <nav className="footer-nav-list" aria-label="Footer Navigation">
              <a href="#about">01 / The Starting Point</a>
              <a href="#themes">02 / Themes</a>
              <a href="#why">03 / Why IDEAFORGE</a>
              <a href="#prizes">04 / Prizes</a>
              <a href="#timeline">05 / Timeline</a>
            </nav>
          </div>

          {/* Guidelines & Support */}
          <div className="footer-nav-col">
            <span className="footer-col-header">INFORMATION</span>
            <nav className="footer-nav-list" aria-label="Information Links">
              <a href="#guidelines">06 / Guidelines</a>
              <a href="#updates">07 / Updates</a>
              <a href="#faq">08 / FAQ</a>
              <a href="#cta">09 / Register</a>
              <a href="mailto:incubation@gcu.ac.in">Contact Organizers ↗</a>
            </nav>
          </div>

          {/* Location & Metadata */}
          <div className="footer-meta-col">
            <span className="footer-col-header">VENUE & DETAILS</span>
            <address className="footer-address">
              Girijananda Chowdhury University<br />
              NH-37, Hatkhowapara, Azara<br />
              Guwahati, Assam 781017
            </address>
            <div className="footer-date-tag">
              <span>EDITION 2026</span>
              <span className="meta-dot" aria-hidden="true">•</span>
              <span>16–17 OCT 2026</span>
            </div>
          </div>
        </div>

        {/* Bottom Baseline */}
        <div className="footer-baseline">
          <div className="footer-copyright">
            © 2026 IDEAFORGE • All rights reserved.
          </div>
          <div className="footer-motto">
            <span>FORGE THE FUTURE.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
