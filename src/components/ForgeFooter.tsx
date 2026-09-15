import Image from "next/image";

const organizerContacts = {
  secretary: {
    name: "Secretary Name",
    phone: "+91 99999 99999",
  },
  jointSecretary: {
    name: "Joint Secretary Name",
    phone: "+91 88888 88888",
  },
};

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

          {/* Secretary Contact */}
          <div className="footer-nav-col">
            <span className="footer-col-header">SECRETARY</span>
            <div className="footer-nav-list">
              <span style={{ color: 'var(--paper)', fontWeight: 500 }}>{organizerContacts.secretary.name}</span>
              <a href={`tel:${organizerContacts.secretary.phone.replace(/\s+/g, '')}`} style={{ color: 'var(--muted)' }}>
                {organizerContacts.secretary.phone}
              </a>
            </div>
          </div>

          {/* Joint Secretary Contact */}
          <div className="footer-nav-col">
            <span className="footer-col-header">JOINT SECRETARY</span>
            <div className="footer-nav-list">
              <span style={{ color: 'var(--paper)', fontWeight: 500 }}>{organizerContacts.jointSecretary.name}</span>
              <a href={`tel:${organizerContacts.jointSecretary.phone.replace(/\s+/g, '')}`} style={{ color: 'var(--muted)' }}>
                {organizerContacts.jointSecretary.phone}
              </a>
            </div>
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
