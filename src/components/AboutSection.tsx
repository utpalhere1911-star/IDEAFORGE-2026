export default function AboutSection() {
  return (
    <section className="about section-shell section-pad" id="about" aria-labelledby="about-title">
      <div className="section-index">01 <span>/</span> The beginning</div>
      <div className="about-grid"><h2 id="about-title">Every big idea<br />begins with<br /><em>something small.</em></h2><div className="about-story"><p className="lead-copy">An observation.<br />A problem.<br />A question.</p><p>IDEATHON gives those small moments a place to grow. It is a creative space where students explore challenges, think differently and transform ideas into possibilities.</p><span className="side-note">No perfect answers.<br />Just better questions.</span></div></div>
      <div className="stages" aria-label="The three stages of an idea"><div className="stage stage-featured"><span className="stage-number">01</span><h3>Notice<span>.</span></h3><p>See something<br />that could be better.</p><span className="stage-mark">◌</span></div><div className="stage"><span className="stage-number">02</span><h3>Question<span>.</span></h3><p>Ask why it has<br />to stay that way.</p><span className="stage-mark">?</span></div><div className="stage"><span className="stage-number">03</span><h3>Imagine<span>.</span></h3><p>Think about what<br />could happen next.</p><span className="stage-mark">✳</span></div></div>
    </section>
  );
}
