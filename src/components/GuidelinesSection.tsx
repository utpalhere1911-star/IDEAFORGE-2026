"use client";

import SharedBanner from "@/components/SharedBanner";

interface GuidelinesSectionProps {
  onOpen: () => void;
}

export default function GuidelinesSection({ onOpen }: GuidelinesSectionProps) {
  return (
    <SharedBanner
      id="rules-banner"
      title="RULES"
      copy="Know the rules before you forge."
      ctaText="VIEW"
      onOpen={onOpen}
    />
  );
}
