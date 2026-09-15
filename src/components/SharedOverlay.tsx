"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface SharedOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
}

export default function SharedOverlay({
  isOpen,
  onClose,
  title,
  children,
}: SharedOverlayProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isBrowser = typeof document !== "undefined";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen || !isBrowser) return null;

  return createPortal(
    <div
      className="guidelines-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="overlay-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="guidelines-panel" ref={modalRef}>
        <div className="guidelines-topline">
          <span>IDEAFORGE / 2026</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="guidelines-heading">
          <h2 id="overlay-title">
            {title}
          </h2>
        </div>
        <div className="overlay-scroll-content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
