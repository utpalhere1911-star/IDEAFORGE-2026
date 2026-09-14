"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";

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

interface GuidelinesOverlayProps {
  label?: string;
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export default function GuidelinesOverlay({
  label = "View guidelines",
  className = "guidelines-trigger",
  onOpenChange,
}: GuidelinesOverlayProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Only render portal on the client
  const isBrowser = typeof document !== "undefined";

  const handleOpen = useCallback(() => {
    setOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onOpenChange?.(false);
    triggerRef.current?.focus();
  }, [onOpenChange]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          handleClose();
          return;
        }

        if (e.key === "Tab" && modalRef.current) {
          const focusables = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open, handleClose]);

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
      const tabElement = document.getElementById(`guidelines-tab-${nextTab.toLowerCase()}`);
      tabElement?.focus();
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        className={className}
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
      >
        {label} <span aria-hidden="true">↗</span>
      </button>
      {open && isBrowser && createPortal(
        <div
          className="guidelines-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="guidelines-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <div className="guidelines-panel" ref={modalRef}>
            <div className="guidelines-topline">
              <span>IDEAFORGE / 2026</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label="Close guidelines modal"
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="guidelines-heading">
              <span className="section-kicker">Before you begin</span>
              <h2 id="guidelines-title">
                Know the rules.<br />
                <em>Build with purpose.</em>
              </h2>
            </div>
            <div className="guidelines-content">
              <div
                className="guidelines-tabs"
                role="tablist"
                aria-label="Guideline categories"
                aria-orientation="vertical"
              >
                {tabs.map((tab, idx) => {
                  const isSelected = activeTab === tab;
                  const tabId = `guidelines-tab-${tab.toLowerCase()}`;
                  const panelId = "guidelines-panel";
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
                id="guidelines-panel"
                role="tabpanel"
                aria-labelledby={`guidelines-tab-${activeTab.toLowerCase()}`}
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
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
