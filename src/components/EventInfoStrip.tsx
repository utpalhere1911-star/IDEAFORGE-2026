interface EventInfoItem {
  code: string;
  label: string;
  primary: string;
  secondary?: string;
  isAccent?: boolean;
}

const eventDetails: EventInfoItem[] = [
  {
    code: "01",
    label: "DATE",
    primary: "16–17",
    secondary: "Oct 2026",
  },
  {
    code: "02",
    label: "VENUE",
    primary: "GIMT Building",
    secondary: "Room 408",
  },
  {
    code: "03",
    label: "PRIZES",
    primary: "₹10,000",
    secondary: "Total Pool",
    isAccent: true,
  },
  {
    code: "04",
    label: "TIMELINE",
    primary: "Coming soon",
    secondary: "Schedule TBA",
  },
];

export default function EventInfoStrip() {
  return (
    <section className="event-info-strip section-shell" aria-label="Event information specification">
      <div className="event-info-grid">
        {eventDetails.map((item) => (
          <div
            className={`info-cell ${item.isAccent ? "info-cell-accent" : ""}`}
            key={item.label}
          >
            <div className="info-cell-header">
              <span className="info-cell-label">{item.label}</span>
              <span className="info-cell-code">{item.code}</span>
            </div>
            <div className="info-cell-content">
              <strong className="info-cell-val">{item.primary}</strong>
              {item.secondary && (
                <span className="info-cell-sub">{item.secondary}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
