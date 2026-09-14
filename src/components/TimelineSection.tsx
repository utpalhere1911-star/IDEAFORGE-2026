const milestones = [["01", "Registration", "10 September 2026"], ["02", "Idea submission", "Coming soon"], ["03", "Ideathon day", "Coming soon"], ["04", "Results", "Coming soon"]];

export default function TimelineSection() {
  return <section className="timeline section-shell section-pad" id="timeline" aria-labelledby="timeline-title"><div className="section-index">04 <span>/</span> The next step</div><div className="timeline-heading"><h2 id="timeline-title">The journey<br /><em>starts here.</em></h2><div className="date-highlight"><span>Registration opens</span><strong>10 September<br />2026</strong></div></div><div className="milestones">{milestones.map(([number, title, date]) => <div className="milestone" key={number}><div className="milestone-marker"><span>{number}</span></div><div><h3>{title}</h3><p>{date}</p></div></div>)}</div></section>;
}
