"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import GuidelinesOverlay from "@/components/GuidelinesOverlay";

const links = [
  ["About", "about"],
  ["Themes", "themes"],
  ["Timeline", "timeline"],
  ["FAQ", "faq"],
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeMenu();
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
  }, [menuOpen, closeMenu]);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="IDEAFORGE 2026 home">
          <Image
            src="/assets/ideaforge-2026-logo.png"
            alt="IDEAFORGE 2026 — Forge the Future"
            width={160}
            height={39}
            priority
            className="brand-logo"
          />
        </a>
        <div className="desktop-nav">
          {links.map(([label, id]) => (
            <a href={`#${id}`} key={id}>{label}</a>
          ))}
          <GuidelinesOverlay />
        </div>
        <div className="desktop-actions">
          <span className="university-mark">GCU</span>
          <Link className="dark-button nav-register" href="/register">
            Register now <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </nav>
      <div
        className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-nav-top">
          <span>Explore the event</span>
          <span>16–17 / 10 / 26</span>
        </div>
        <div className="mobile-nav-links">
          <a href="#top" onClick={closeMenu}>
            Home <span>01</span>
          </a>
          {links.map(([label, id], index) => (
            <a href={`#${id}`} key={id} onClick={closeMenu}>
              {label} <span>0{index + 2}</span>
            </a>
          ))}
          <div className="mobile-guidelines-wrap">
            <GuidelinesOverlay onOpenChange={(open) => { if (open) closeMenu(); }} />
          </div>
          <Link className="mobile-register" href="/register" onClick={closeMenu}>
            Register now <span>↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
