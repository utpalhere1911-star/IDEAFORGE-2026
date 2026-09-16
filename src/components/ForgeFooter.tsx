import Image from "next/image";

const organizerContacts = {
  secretary: {
    name: "Anamika Jaiswal",
    phone: "+91 81350 09464",
  },
  jointSecretary: {
    name: "Sourav Barua",
    phone: "+91 70853 49788",
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

          {/* Support Panel */}
          <div className="footer-support-panel">
            <span className="footer-col-header">SUPPORT / CONTACT</span>
            <div className="footer-support-contacts">
              <div className="support-contact-item">
                <span className="support-label">01 / SECRETARY</span>
                <span className="support-name">{organizerContacts.secretary.name}</span>
                <a href={`tel:${organizerContacts.secretary.phone.replace(/\s+/g, '')}`} className="support-phone">
                  {organizerContacts.secretary.phone}
                </a>
              </div>
              <div className="support-contact-item">
                <span className="support-label">02 / JOINT SECRETARY</span>
                <span className="support-name">{organizerContacts.jointSecretary.name}</span>
                <a href={`tel:${organizerContacts.jointSecretary.phone.replace(/\s+/g, '')}`} className="support-phone">
                  {organizerContacts.jointSecretary.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Location & Metadata */}
          <div className="footer-meta-col">
            <span className="footer-col-header">VENUE & DETAILS</span>
            <address className="footer-address">
              Venue TBA<br />
              Guwahati, Assam
            </address>
            <div className="footer-date-tag">
              <span>EDITION 2026</span>
              <span className="meta-dot" aria-hidden="true">•</span>
              <span>22 SEP 2026</span>
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
