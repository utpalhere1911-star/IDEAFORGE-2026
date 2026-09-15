"use client";

import SharedBanner from "@/components/SharedBanner";

interface FaqFeatureProps {
  onOpen: () => void;
}

export default function FaqFeature({ onOpen }: FaqFeatureProps) {
  return (
    <SharedBanner
      id="faq-banner"
      title="FAQs"
      copy="Still curious? Find answers to common questions."
      ctaText="VIEW ALL"
      onOpen={onOpen}
    />
  );
}
