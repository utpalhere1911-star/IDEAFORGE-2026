"use client";

import { useState } from "react";

const questions = [["Who can participate?", "IDEATHON is for students ready to explore a question, a challenge or a possibility."], ["Can I participate individually?", "Yes. Individual participation is welcome."], ["Can I participate as a team?", "Yes. You can participate as a team."], ["When does registration begin?", "Registration opens on 10 September 2026."], ["How will registration work?", "Registration information will be shared when registration opens on 10 September 2026."], ["Will participants receive certificates?", "More information about certificates will be shared soon."]];

export default function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  return <section className="faq section-shell section-pad" id="faq" aria-labelledby="faq-title"><div className="section-index">05 <span>/</span> Things you may wonder</div><div className="faq-layout"><div className="faq-heading"><h2 id="faq-title">Questions?<br /><em>Perfect.</em></h2><span className="faq-aside">Good questions<br />belong here.</span></div><div className="accordion">{questions.map(([question, answer], index) => { const isOpen = openQuestion === index; return <div className={`accordion-item ${isOpen ? "is-open" : ""}`} key={question}><button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenQuestion(isOpen ? null : index)}><span className="accordion-number">0{index + 1}</span><span>{question}</span><strong aria-hidden="true">+</strong></button><div className="accordion-answer" id={`faq-answer-${index}`} aria-hidden={!isOpen}><p>{answer}</p></div></div>; })}</div></div></section>;
}
