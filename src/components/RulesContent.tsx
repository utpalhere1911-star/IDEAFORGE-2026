"use client";

import { useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

const tabs = [
  "Overview",
  "Eligibility",
  "Teams",
  "Submission",
  "Judging",
  "Rules",
  "FAQ",
] as const;

type TabKey = (typeof tabs)[number];

export default function RulesContent() {
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");

  const handleTabKeyDown = (e: ReactKeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== index) {
      const nextTab = tabs[nextIndex];
      setActiveTab(nextTab);
      const tabElement = document.getElementById(`rules-tab-${nextTab.toLowerCase()}`);
      tabElement?.focus();
    }
  };

  return (
    <div className="guidelines-content">
      <div
        className="guidelines-tabs"
        role="tablist"
        aria-label="Guideline categories"
        aria-orientation="vertical"
      >
        {tabs.map((tab, idx) => {
          const isSelected = activeTab === tab;
          const tabId = `rules-tab-${tab.toLowerCase()}`;
          const panelId = "rules-panel";
          return (
            <button
              id={tabId}
              key={tab}
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              className={isSelected ? "is-active" : ""}
              type="button"
              onClick={() => setActiveTab(tab)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
            >
              <span>{tab}</span>
              <span aria-hidden="true">→</span>
            </button>
          );
        })}
      </div>
      <div
        id="rules-panel"
        role="tabpanel"
        aria-labelledby={`rules-tab-${activeTab.toLowerCase()}`}
        tabIndex={0}
        className="guidelines-copy"
      >
        <span className="guidelines-status">{activeTab} / To be announced</span>
        <h3>
          {activeTab === "Overview"
            ? "Details are being forged."
            : `${activeTab} details coming soon.`}
        </h3>
        <p>
          Official information for this section will be shared soon. Check back for
          the confirmed IDEAFORGE 2026 guidelines.
        </p>
        <span className="guidelines-stamp" aria-hidden="true">
          TO BE<br />ANNOUNCED
        </span>
      </div>
    </div>
  );
}
