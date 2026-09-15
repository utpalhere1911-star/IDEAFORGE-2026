import Link from "next/link";

export default function ForgeCTA() {
  return (
    <section
      className="forge-cta section-shell"
      id="cta"
      aria-labelledby="forge-cta-title"
    >
      {/* Topline Metadata */}
      <div className="section-topline">
        <div className="section-index">
          09 <span>/</span> Final call
        </div>
        <div className="section-topline-meta">
          <span>THE NEXT STEP</span>
          <span className="meta-dot" aria-hidden="true">•</span>
          <span>16–17 OCT 2026</span>
        </div>
      </div>

      <div className="cta-editorial-poster">
        <div className="cta-content-wrap">
          <span className="section-kicker">TURN INSPIRATION INTO ACTION</span>
          <h2 id="forge-cta-title" className="cta-main-headline">
            <span className="cta-hl-solid">HAVE AN IDEA?</span>
            <span className="cta-hl-accent">FORGE <em>IT.</em></span>
          </h2>

          <p className="cta-body-copy">
            Bring your concept to the stage, connect with fellow student innovators,
            and compete for awards and direct incubation support
            at Girijananda Chowdhury University, Guwahati.
          </p>

          <div className="cta-actions-row">
            <Link className="lime-button cta-primary-btn" href="/register">
              Register now <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="cta-editorial-footer">
          <div className="cef-col">
            <span className="cef-tag">EVENT</span>
            <strong className="cef-val">IDEAFORGE 2026</strong>
          </div>
          <div className="cef-col">
            <span className="cef-tag">LOCATION</span>
            <strong className="cef-val">GCU Campus, Guwahati</strong>
          </div>
          <div className="cef-col">
            <span className="cef-tag">ORGANIZER</span>
            <strong className="cef-val">GCU Incubation Centre</strong>
          </div>
        </div>

        <div className="cta-grid-glow" aria-hidden="true" />
      </div>
    </section>
  );
}
