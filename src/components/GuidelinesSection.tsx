import GuidelinesOverlay from "@/components/GuidelinesOverlay";

interface GuidelineCategory {
  id: string;
  title: string;
  scope: string;
  status: string;
}

const CATEGORIES: GuidelineCategory[] = [
  {
    id: "01",
    title: "Eligibility",
    scope: "Open to all enrolled undergraduate & postgraduate students",
    status: "To be announced",
  },
  {
    id: "02",
    title: "Team Requirements",
    scope: "Individual builders or cross-functional student teams",
    status: "To be announced",
  },
  {
    id: "03",
    title: "Submission Requirements",
    scope: "Problem definition, solution pitch deck & presentation",
    status: "To be announced",
  },
  {
    id: "04",
    title: "Judging Criteria",
    scope: "Innovation, viability, clarity of pitch & market potential",
    status: "To be announced",
  },
  {
    id: "05",
    title: "Code of Conduct",
    scope: "Originality, academic integrity & professional conduct",
    status: "To be announced",
  },
];

export default function GuidelinesSection() {
  return (
    <section
      className="guidelines-section dark-section section-shell section-pad"
      id="guidelines"
      aria-labelledby="guidelines-section-title"
    >
      {/* Topline Metadata */}
      <div className="section-topline">
        <div className="section-index">
          06 <span>/</span> Guidelines
        </div>
        <div className="section-topline-meta">
          <span>COMPETITION FRAMEWORK</span>
          <span className="meta-dot" aria-hidden="true">•</span>
          <span>05 AREAS</span>
        </div>
      </div>

      {/* Editorial Header */}
      <div className="editorial-section-header">
        <div className="editorial-title-col">
          <span className="section-kicker">RULES & EVALUATION CRITERIA</span>
          <h2 id="guidelines-section-title" className="editorial-headline">
            <span className="headline-solid">KNOW THE RULES.</span>
            <span className="headline-outline">BUILD WITH PURPOSE.</span>
          </h2>
        </div>
        <div className="guidelines-header-action">
          <p className="editorial-header-desc">
            Official details are being finalized. Review the core framework areas
            below and inspect the preview modal for upcoming updates.
          </p>
          <GuidelinesOverlay label="Inspect full guidelines" />
        </div>
      </div>

      {/* Editorial Guidelines Index List */}
      <div className="guidelines-editorial-index" role="list">
        {CATEGORIES.map((cat) => (
          <div
            className="guideline-index-row"
            key={cat.id}
            role="listitem"
            tabIndex={0}
            aria-label={`Guideline ${cat.id}: ${cat.title}`}
          >
            <div className="gir-lead">
              <span className="gir-num">{cat.id}</span>
              <h3 className="gir-title">{cat.title}</h3>
            </div>
            <div className="gir-scope">
              <p>{cat.scope}</p>
            </div>
            <div className="gir-meta">
              <span className="gir-status-pill">{cat.status}</span>
              <span className="gir-arrow" aria-hidden="true">↗</span>
            </div>
            <div className="gir-hover-line" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
