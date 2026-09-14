interface ThemeTrack {
  id: string;
  name: string;
  category: string;
}

const THEME_TRACKS: ThemeTrack[] = [
  {
    id: "01",
    name: "AI & Emerging Technology",
    category: "Frontier Computing",
  },
  {
    id: "02",
    name: "Healthcare & Pharma",
    category: "Biotech & Care",
  },
  {
    id: "03",
    name: "Fintech",
    category: "Financial Systems",
  },
  {
    id: "04",
    name: "Sustainability",
    category: "Clean Energy & Climate",
  },
  {
    id: "05",
    name: "Agritech",
    category: "Smart Agriculture",
  },
  {
    id: "06",
    name: "Social Innovation",
    category: "Public Impact",
  },
  {
    id: "07",
    name: "Smart Solutions",
    category: "Intelligent Systems & IoT",
  },
  {
    id: "08",
    name: "Open Innovation",
    category: "Cross-Disciplinary Ideas",
  },
];

export default function ThemesSection() {
  return (
    <section
      className="themes dark-section section-shell section-pad"
      id="themes"
      aria-labelledby="themes-title"
    >
      {/* Topline Metadata */}
      <div className="section-topline">
        <div className="section-index">
          02 <span>/</span> Themes
        </div>
        <div className="section-topline-meta">
          <span>INNOVATION TRACKS</span>
          <span className="meta-dot" aria-hidden="true">•</span>
          <span>08 DOMAINS</span>
        </div>
      </div>

      {/* Header Lockup */}
      <div className="editorial-section-header">
        <div className="editorial-title-col">
          <span className="section-kicker">AREAS OF EXPLORATION</span>
          <h2 id="themes-title" className="editorial-headline">
            <span className="headline-solid">THINK BEYOND</span>
            <span className="headline-outline">THE ORDINARY.</span>
          </h2>
        </div>
        <p className="editorial-header-desc">
          Explore problems worth solving across technology, industry and society.
          These tracks represent starting points, not rigid boundaries.
        </p>
      </div>

      {/* Editorial Themes Catalog Grid */}
      <div className="themes-catalog-grid" role="list">
        {THEME_TRACKS.map((theme) => (
          <div
            className="theme-catalog-row"
            key={theme.id}
            role="listitem"
            tabIndex={0}
            aria-label={`Theme ${theme.id}: ${theme.name}`}
          >
            <div className="theme-row-id">
              <span className="theme-num">{theme.id}</span>
              <span className="theme-cat">{theme.category}</span>
            </div>
            <div className="theme-row-content">
              <h3 className="theme-name">{theme.name}</h3>
            </div>
            <div className="theme-row-action" aria-hidden="true">
              <span className="theme-arrow">↗</span>
            </div>
            <div className="theme-hover-bar" aria-hidden="true" />
          </div>
        ))}
      </div>

      {/* Editorial Open Innovation Callout */}
      <div className="theme-wildcard-card">
        <div className="wildcard-lead">
          <span className="wildcard-pill">OPEN CALL</span>
          <span className="wildcard-text">Have an idea outside these 8 domains?</span>
        </div>
        <div className="wildcard-action">
          <strong className="wildcard-highlight">Bring it anyway.</strong>
          <span className="wildcard-sub">Bold ideas forge their own tracks.</span>
        </div>
      </div>
    </section>
  );
}
