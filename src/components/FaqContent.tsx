"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "01",
    question: "What is IDEAFORGE?",
    answer:
      "IDEAFORGE is an innovation-driven ideathon organized by the Incubation Centre at Girijananda Chowdhury University, Guwahati. It provides a platform for student builders and thinkers to identify meaningful problems, build viable concepts, and present their vision to leaders and mentors.",
  },
  {
    id: "02",
    question: "Who is eligible to participate in IDEAFORGE 2026?",
    answer:
      "The ideathon is open to all enrolled undergraduate and postgraduate students from recognized colleges and universities. Participants can apply individually or form interdisciplinary teams.",
  },
  {
    id: "03",
    question: "What is the total prize pool and recognition?",
    answer:
      "IDEAFORGE 2026 features a confirmed total prize pool of ₹10,000, along with direct incubation pathways, mentorship support, and investor visibility via the GCU Incubation Centre.",
  },
  {
    id: "04",
    question: "When will the detailed timeline and guidelines be published?",
    answer:
      "Detailed event timelines, submission formats, and evaluation rubrics are currently being finalized by the organizing committee and will be released on this official portal soon.",
  },
  {
    id: "05",
    question: "Do concepts need to strictly fit the eight themes?",
    answer:
      "No. The eight innovation tracks serve as inspiration and focal areas. Original, high-impact solutions addressing challenges in any domain are welcome under the Open Innovation track.",
  },
];

interface FaqContentProps {
  onClose: () => void;
}

export default function FaqContent({ onClose }: FaqContentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="ps-detail-view faq-overlay-content">
      <div className="faq-accordion-col" role="region" aria-label="Frequently Asked Questions">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-btn-${faq.id}`;
          const panelId = `faq-panel-${faq.id}`;

          return (
            <div
              className={`editorial-faq-item ${isOpen ? "is-open" : ""}`}
              key={faq.id}
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleQuestion(index)}
                className="faq-question-btn"
              >
                <span className="faq-q-num">{faq.id}</span>
                <span className="faq-q-text">{faq.question}</span>
                <span className="faq-q-toggle" aria-hidden="true">
                  +
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="faq-answer-panel"
              >
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ps-detail-footer" style={{ marginTop: "40px" }}>
        <button
          type="button"
          className="ps-back-btn"
          onClick={onClose}
        >
          <span aria-hidden="true">←</span> CLOSE
        </button>
      </div>
    </div>
  );
}
