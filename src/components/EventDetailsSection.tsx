const details = [["Event", "IDEATHON 2026"], ["Hosted by", "Girijananda Chowdhury University"], ["Registration", "10 September 2026"], ["Participation", "Individual & Teams"]];

export default function EventDetailsSection() {
  return <section className="details section-shell section-pad" aria-labelledby="details-title"><div className="section-index">03 <span>/</span> The important stuff</div><div className="details-layout"><div><h2 id="details-title">The<br /><em>important</em><br />stuff.</h2><p className="details-intro">Everything you need<br />to know for now.</p></div><div className="details-board">{details.map(([label, value], index) => <div className="detail-row" key={label}><span className="detail-label">{label}</span><strong className={index === 1 ? "detail-university" : ""}>{value}</strong><span className="detail-index">0{index + 1}</span></div>)}</div></div></section>;
}
