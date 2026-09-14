interface UpdateItem {
  id: string;
  topic: string;
  detail: string;
  status: string;
}

const UPCOMING_UPDATES: UpdateItem[] = [
  {
    id: "01",
    topic: "Registration Window",
    detail: "Application launch, team registration forms and deadlines",
    status: "Upcoming",
  },
  {
    id: "02",
    topic: "Problem Statements & Tracks",
    detail: "Specific challenge themes and industry problem statements",
    status: "Upcoming",
  },
  {
    id: "03",
    topic: "Mentor & Jury Network",
    detail: "Eminent startup founders, tech leaders and academic mentors",
    status: "In Formation",
  },
  {
    id: "04",
    topic: "On-Stage Finale Schedule",
    detail: "Presentation slots, stage equipment and demo criteria",
    status: "Scheduling",
  },
];

export default function AnnouncementsSection() {
  return (
    <section
      className="announcements section-shell section-pad"
      id="updates"
      aria-labelledby="updates-title"
    >
      {/* Topline Metadata */}
      <div className="section-topline">
        <div className="section-index">
          07 <span>/</span> Updates
        </div>
        <div className="section-topline-meta">
          <span>COMPETITION DISPATCHES</span>
          <span className="meta-dot" aria-hidden="true">•</span>
          <span>04 BULLETINS</span>
        </div>
      </div>

      {/* Editorial Announcement Grid */}
      <div className="updates-editorial-grid">
        <div className="updates-hero-block">
          <span className="section-kicker">COMPETITION BULLETIN</span>
          <h2 id="updates-title" className="editorial-headline">
            <span className="headline-solid">MORE TO</span>
            <span className="headline-outline">COME.</span>
          </h2>
          <p className="editorial-header-desc">
            Details regarding prize breakdowns, the complete event schedule, challenge
            tracks, mentor networks, and judging protocols will be published here.
          </p>

          <div className="updates-callout-pill">
            <span className="updates-pulse-dot" />
            <span className="updates-callout-txt">
              Stay tuned. The forge is heating up.
            </span>
          </div>
        </div>

        <div className="updates-bulletin-list" role="list">
          {UPCOMING_UPDATES.map((item) => (
            <div
              className="update-bulletin-row"
              key={item.id}
              role="listitem"
              tabIndex={0}
              aria-label={`Update ${item.id}: ${item.topic}`}
            >
              <div className="ub-num-col">
                <span className="ub-num">{item.id}</span>
              </div>
              <div className="ub-content-col">
                <div className="ub-header">
                  <h3 className="ub-topic">{item.topic}</h3>
                  <span className="ub-status-badge">{item.status}</span>
                </div>
                <p className="ub-detail">{item.detail}</p>
              </div>
              <div className="ub-tracer-col" aria-hidden="true">
                <span className="ub-arrow">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
