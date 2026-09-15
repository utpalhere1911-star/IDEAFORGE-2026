interface TimelineStage {
  step: string;
  tag: string;
  title: string;
  desc: string;
  status: string;
}

const TIMELINE_STAGES: TimelineStage[] = [
  {
    step: "01",
    tag: "STAGE / 01",
    title: "Registration",
    desc: "Online entry submission, team registration and concept overview.",
    status: "Upcoming",
  },
  {
    step: "02",
    tag: "STAGE / 02",
    title: "Shortlisting",
    desc: "Evaluation and screening of submissions by the review committee.",
    status: "TBA",
  },
  {
    step: "03",
    tag: "STAGE / 03",
    title: "Ideathon",
    desc: "Concept refinement, problem analysis and domain mentor check-ins.",
    status: "TBA",
  },
  {
    step: "04",
    tag: "STAGE / 04",
    title: "Final Pitch",
    desc: "Live stage presentations, demonstration and jury defense.",
    status: "TBA",
  },
  {
    step: "05",
    tag: "STAGE / 05",
    title: "Results",
    desc: "Awards, cash prizes and induction into GCU incubation pathways.",
    status: "TBA",
  },
];

export default function ProcessContent() {
  return (
    <div className="overlay-process-content">
      <div className="timeline-header-meta" style={{ marginBottom: "24px" }}>
        <p className="editorial-header-desc" style={{ color: "var(--paper)" }}>
          Five structured milestones guiding student innovators from initial concept
          submission to live jury presentations and institutional incubation.
        </p>
        <div className="timeline-notice-badge" style={{ marginTop: "16px" }}>
          <span className="notice-pulse-dot" />
          <span>DETAILED SCHEDULE COMING SOON</span>
        </div>
      </div>

      <div className="timeline-journey-grid" role="list">
        {TIMELINE_STAGES.map((stage, idx) => (
          <div
            className="timeline-stage-cell"
            key={stage.step}
            role="listitem"
            tabIndex={0}
            aria-label={`Stage ${stage.step}: ${stage.title}`}
          >
            <div className="stage-top-meta">
              <span className="stage-huge-num">{stage.step}</span>
              <span className="stage-status-tag">{stage.status}</span>
            </div>

            <div className="stage-body">
              <span className="stage-tag">{stage.tag}</span>
              <h3 className="stage-title">{stage.title}</h3>
              <p className="stage-desc">{stage.desc}</p>
            </div>

            <div className="stage-route-footer">
              <span className="stage-connector-arrow">
                {idx < TIMELINE_STAGES.length - 1 ? "STAGE NEXT →" : "FINALE ✳"}
              </span>
            </div>

            <div className="stage-hover-bar" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
