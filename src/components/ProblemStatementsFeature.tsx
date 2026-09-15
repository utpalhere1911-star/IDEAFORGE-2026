"use client";

import React from "react";
import SharedBanner from "@/components/SharedBanner";

interface ProblemStatementsFeatureProps {
  onOpen: () => void;
}

export default function ProblemStatementsFeature({
  onOpen,
}: ProblemStatementsFeatureProps) {
  return (
    <SharedBanner
      id="ps-banner"
      title={<>PROBLEM<br />STATEMENT</>}
      copy="Explore the challenges you can build for."
      ctaText="VIEW ALL"
      onOpen={onOpen}
    />
  );
}
