"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

const LINES = ["Turning", "Ideas into", "Impact"];

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function HeroPresentationScreen() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    if (isTypingComplete) {
      const resetTimeout = setTimeout(() => {
        setIsTypingComplete(false);
        setLineIndex(0);
        setCharIndex(0);
      }, 5500);
      return () => clearTimeout(resetTimeout);
    }

    const currentLineTarget = LINES[lineIndex];

    if (charIndex < currentLineTarget.length) {
      const charTimer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 75);
      return () => clearTimeout(charTimer);
    } else {
      if (lineIndex < LINES.length - 1) {
        const nextLineTimer = setTimeout(() => {
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
        }, 380);
        return () => clearTimeout(nextLineTimer);
      } else {
        const completeTimer = setTimeout(() => {
          setIsTypingComplete(true);
        }, 300);
        return () => clearTimeout(completeTimer);
      }
    }
  }, [lineIndex, charIndex, isTypingComplete, reducedMotion]);

  const bulbPhase = reducedMotion
    ? 3
    : isTypingComplete
    ? 3
    : lineIndex === 0
    ? 1
    : lineIndex === 1
    ? 2
    : 3;

  const displayedLine0 = reducedMotion
    ? LINES[0]
    : lineIndex > 0
    ? LINES[0]
    : LINES[0].slice(0, charIndex);

  const displayedLine1 = reducedMotion
    ? LINES[1]
    : lineIndex > 1
    ? LINES[1]
    : lineIndex === 1
    ? LINES[1].slice(0, charIndex)
    : "";

  const displayedLine2 = reducedMotion
    ? LINES[2]
    : lineIndex === 2
    ? LINES[2].slice(0, charIndex)
    : "";

  const isCursorActive = (idx: number) => {
    if (reducedMotion || isTypingComplete) return false;
    return lineIndex === idx;
  };

  return (
    <div
      className={`hero-screen-card bulb-phase-${bulbPhase} ${
        isTypingComplete ? "is-complete" : ""
      }`}
      aria-hidden="true"
    >
      <div className="screen-glow-accent" />
      <div className="screen-header">
        <span className="screen-status-dot" />
        <span className="screen-badge">LIVE DEMO STAGE</span>
      </div>

      <div className="screen-content">
        <div className="screen-typography">
          <div className="screen-text-line line-1">
            <span>{displayedLine0}</span>
            {isCursorActive(0) && <span className="screen-typing-cursor">|</span>}
          </div>
          <div className="screen-text-line line-2">
            <span>{displayedLine1}</span>
            {isCursorActive(1) && <span className="screen-typing-cursor">|</span>}
          </div>
          <div className="screen-text-line line-3 highlight-word">
            <span>{displayedLine2}</span>
            {isCursorActive(2) && <span className="screen-typing-cursor">|</span>}
          </div>
        </div>

        <div className="screen-bulb-container">
          <svg
            className="screen-bulb-svg"
            viewBox="0 0 100 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="screenBulbGlow" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#c9f04d" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#c9f04d" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#c9f04d" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Aura glow circle */}
            <circle
              className="bulb-glow-aura"
              cx="50"
              cy="45"
              r="36"
              fill="url(#screenBulbGlow)"
            />

            {/* Bulb Ray Highlights */}
            <g className="bulb-light-rays">
              <line x1="50" y1="4" x2="50" y2="12" stroke="#c9f04d" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="18" x2="23" y2="25" stroke="#c9f04d" strokeWidth="2" strokeLinecap="round" />
              <line x1="84" y1="18" x2="77" y2="25" stroke="#c9f04d" strokeWidth="2" strokeLinecap="round" />
              <line x1="6" y1="46" x2="14" y2="46" stroke="#c9f04d" strokeWidth="2" strokeLinecap="round" />
              <line x1="86" y1="46" x2="94" y2="46" stroke="#c9f04d" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Bulb Glass Body */}
            <path
              className="bulb-glass-contour"
              d="M 28 76 C 21 68 16 56 16 45 C 16 26 31 12 50 12 C 69 12 84 26 84 45 C 84 56 79 68 72 76 C 68 81 66 86 66 92 L 34 92 C 34 86 32 81 28 76 Z"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />

            {/* Filament Support Mount */}
            <path
              className="bulb-mount-wires"
              d="M 39 92 L 42 60 M 61 92 L 58 60"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Filament Coil / Loop */}
            <path
              className="bulb-filament-wire"
              d="M 42 60 C 42 44 46 38 50 38 C 54 38 58 44 58 60 C 58 50 50 46 50 54 C 50 46 42 50 42 60 Z"
              stroke="#c9f04d"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Metal Screw Base */}
            <path
              className="bulb-base-rings"
              d="M 35 98 L 65 98 M 37 105 L 63 105 M 39 112 L 61 112"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* Base Electrical Contact */}
            <path
              className="bulb-base-terminal"
              d="M 43 118 C 43 122 57 122 57 118 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
