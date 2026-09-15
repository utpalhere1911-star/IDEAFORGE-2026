"use client";

import SharedBanner from "@/components/SharedBanner";

interface ProcessSectionProps {
  onOpen: () => void;
}

export default function ProcessSection({ onOpen }: ProcessSectionProps) {
  return (
    <SharedBanner
      id="process-banner"
      title="PROCESS"
      copy="See how the journey unfolds."
      ctaText="VIEW ALL"
      onOpen={onOpen}
    />
  );
}
