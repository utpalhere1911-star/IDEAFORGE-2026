interface ProcessStage {
  number: string;
  code: string;
  title: string;
  description: string;
  deliverable: string;
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    code: "PHASE / 01",
    title: "IDEATE",
    description: "Start with a problem worth exploring.",
    deliverable: "Problem Definition",
  },
  {
    number: "02",
    code: "PHASE / 02",
    title: "DEVELOP",
    description: "Give your concept a direction.",
    deliverable: "Solution Architecture",
  },
  {
    number: "03",
    code: "PHASE / 03",
    title: "PITCH",
    description: "Make the case for your idea.",
    deliverable: "Stage Presentation",
  },
  {
    number: "04",
    code: "PHASE / 04",
    title: "IMPACT",
    description: "Take the next step beyond the room.",
    deliverable: "Future Incubation",
  },
];

const ROUTE_STEPS = [
  { id: "01", label: "IDEA" },
  { id: "02", label: "TECHNOLOGY" },
  { id: "03", label: "IMPACT" },
];

export default function ForgeAbout() {
  return (
    <section
      className="forge-about section-shell section-pad"
      id="about"
      aria-labelledby="forge-about-title"
    >
      {/* Section Topline Metadata */}
      <div className="about-topline">
        <div className="section-index">
          01 <span>/</span> The starting point
        </div>
        <div className="about-topline-meta">
          <span className="about-meta-tag">INNOVATION SYSTEM</span>
          <span className="about-meta-divider" aria-hidden="true">•</span>
          <span className="about-meta-tag">04 PHASES</span>
        </div>
      </div>

      {/* Main Editorial Statement & Context */}
      <div className="about-hero-grid">
        <div className="about-hero-main">
          <span className="about-kicker">AN IDEA IS</span>
          <h2 id="forge-about-title" className="about-headline">
            <span className="about-headline-solid">JUST THE</span>
            <span className="about-headline-outline">BEGINNING.</span>
          </h2>
        </div>

        <div className="about-hero-context">
          <p className="about-lead-copy">
            IDEAFORGE is an innovation-driven ideathon where ideas meet technology,
            creativity and problem-solving. Bring your idea, identify meaningful
            problems, develop your concept and present your vision.
          </p>

          {/* IDEA → TECHNOLOGY → IMPACT Route System */}
          <div
            className="about-route-block"
            aria-label="Progression path: Idea to Technology to Impact"
          >
            <div className="route-track-header">
              <span className="route-track-label">THE PROGRESSION</span>
              <span className="route-track-code">01 — 03</span>
            </div>
            <div className="about-route-pipeline">
              {ROUTE_STEPS.map((step, idx) => (
                <div className="route-step" key={step.id}>
                  <div className="route-step-node">
                    <span className="route-step-num">{step.id}</span>
                    <span className="route-step-label">{step.label}</span>
                  </div>
                  {idx < ROUTE_STEPS.length - 1 && (
                    <div className="route-connector" aria-hidden="true">
                      <div className="route-line" />
                      <span className="route-arrow">→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Process Architecture: Continuous 4-Stage Editorial System */}
      <div
        className="about-process-system"
        aria-label="The 4-stage ideathon process"
      >
        <div className="process-system-header">
          <span className="process-header-title">PROCESS ARCHITECTURE</span>
          <span className="process-header-count">01 — 04 / CONTINUOUS SYSTEM</span>
        </div>

        <div className="about-process-grid">
          {PROCESS_STAGES.map((stage) => (
            <div
              className="about-process-row"
              key={stage.number}
              tabIndex={0}
              role="article"
              aria-label={`Stage ${stage.number}: ${stage.title}`}
            >
              <div className="process-row-lead">
                <span className="process-huge-number">{stage.number}</span>
                <span className="process-stage-phase">{stage.code}</span>
              </div>

              <div className="process-row-core">
                <h3 className="process-stage-name">{stage.title}</h3>
                <p className="process-stage-desc">{stage.description}</p>
              </div>

              <div className="process-row-meta">
                <span className="process-deliverable">{stage.deliverable}</span>
                <span className="process-tracer-arrow" aria-hidden="true">↗</span>
              </div>

              <div className="process-hover-line" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
