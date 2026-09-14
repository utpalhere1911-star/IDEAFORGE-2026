export default function PrizesSection() {
  return (
    <section
      className="prizes dark-section section-shell section-pad"
      id="prizes"
      aria-labelledby="prizes-title"
    >
      {/* Topline Metadata */}
      <div className="section-topline">
        <div className="section-index">
          04 <span>/</span> Prizes
        </div>
        <div className="section-topline-meta">
          <span>COMPETITION REWARDS</span>
          <span className="meta-dot" aria-hidden="true">•</span>
          <span>CONFIRMED POOL</span>
        </div>
      </div>

      <div className="prize-editorial-layout">
        <div className="prize-copy-col">
          <span className="section-kicker">REWARDS & INCENTIVES</span>
          <h2 id="prizes-title" className="editorial-headline">
            <span className="headline-solid">BIG IDEAS.</span>
            <span className="headline-outline">BIGGER REWARDS.</span>
          </h2>
          <p className="editorial-header-desc">
            Rewarding outstanding problem solving, visionary execution, and
            high-potential innovations with direct capital and incubation support.
          </p>

          <div className="prize-meta-strip">
            <div className="prize-meta-pill">
              <span className="pill-dot" />
              <span>CASH REWARDS + INCUBATION PATHWAYS</span>
            </div>
          </div>
        </div>

        <div className="prize-reveal-card" role="region" aria-label="Prize Pool Details">
          <div className="prize-card-header">
            <span className="prize-badge-label">TOTAL PRIZE POOL</span>
            <span className="prize-badge-year">2026 EDITION</span>
          </div>

          <div className="prize-display-wrap">
            <div className="prize-amount-primary">₹10,000</div>
            <div className="prize-amount-sub">CASH PRIZE POOL</div>
          </div>

          <div className="prize-card-footer">
            <div className="prize-footer-item">
              <span className="pfi-label">CATEGORY</span>
              <strong className="pfi-val">All Domains</strong>
            </div>
            <div className="prize-footer-item">
              <span className="pfi-label">INCUBATION</span>
              <strong className="pfi-val">GCU Incubation Centre</strong>
            </div>
          </div>

          <div className="prize-glow-accent" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
