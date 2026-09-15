"use client";

import React from "react";

interface SharedBannerProps {
  id: string;
  title: React.ReactNode;
  copy: string;
  ctaText: string;
  onOpen: () => void;
}

export default function SharedBanner({ id, title, copy, ctaText, onOpen }: SharedBannerProps) {
  return (
    <section className="ps-banner-section section-shell" aria-labelledby={`${id}-title`}>
      <button
        type="button"
        className="ps-banner-card"
        onClick={onOpen}
        aria-expanded={false}
      >
        <div className="ps-banner-content">
          <div className="ps-banner-header">
            <h2 id={`${id}-title`}>{title}</h2>
          </div>
          <p className="ps-banner-copy">{copy}</p>
        </div>
        <div className="ps-banner-action">
          <span className="ps-banner-cta">{ctaText} <span aria-hidden="true">→</span></span>
        </div>
      </button>
    </section>
  );
}
