interface ReasonPillar {
  number: string;
  code: string;
  title: string;
  description: string;
}

const PILLARS: ReasonPillar[] = [
  {
    number: "01",
    code: "PHASE 01",
    title: "IDEATE",
    description: "Turn real problems into viable technological possibilities.",
  },
  {
    number: "02",
    code: "PHASE 02",
    title: "INNOVATE",
    description: "Develop structured solutions with measurable real-world value.",
  },
  {
    number: "03",
    code: "PHASE 03",
    title: "CONNECT",
    description: "Collaborate with fellow builders, founders and domain mentors.",
  },
  {
    number: "04",
    code: "PHASE 04",
    title: "PITCH",
    description: "Present your innovation with precision, confidence and impact.",
  },
  {
    number: "05",
    code: "PHASE 05",
    title: "EXPLORE",
    description: "Propel your concept beyond the room into incubation and growth.",
  },
];

export default function WhySection() {
  return (
    <section
      className="why-section section-shell section-pad"
      id="why"
      aria-labelledby="why-title"
    >
      {/* Topline Metadata */}
      <div className="section-topline">
        <div className="section-index">
          03 <span>/</span> Why IDEAFORGE
        </div>
        <div className="section-topline-meta">
          <span>MOMENTUM SYSTEM</span>
          <span className="meta-dot" aria-hidden="true">•</span>
          <span>05 PILLARS</span>
        </div>
      </div>

      {/* Editorial Header */}
      <div className="editorial-section-header">
        <div className="editorial-title-col">
          <span className="section-kicker">THE COMPETITION ADVANTAGE</span>
          <h2 id="why-title" className="editorial-headline">
            <span className="headline-solid">WHY</span>
            <span className="headline-outline">IDEAFORGE?</span>
          </h2>
        </div>
        <p className="editorial-header-desc">
          A platform built for creators, problem solvers and student entrepreneurs
          ready to transition from conceptual thinking to tangible execution.
        </p>
      </div>

      {/* Momentum Progression Grid */}
      <div className="why-progression-grid" role="list">
        {PILLARS.map((pillar, idx) => (
          <div
            className="why-pillar-item"
            key={pillar.number}
            role="listitem"
            tabIndex={0}
            aria-label={`Pillar ${pillar.number}: ${pillar.title}`}
          >
            <div className="pillar-header">
              <span className="pillar-number">{pillar.number}</span>
              <span className="pillar-code">{pillar.code}</span>
            </div>

            <div className="pillar-body">
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>
            </div>

            <div className="pillar-footer">
              <span className="pillar-step-marker">
                {idx < PILLARS.length - 1 ? "NEXT →" : "OUTCOME ✳"}
              </span>
            </div>

            <div className="pillar-hover-line" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
