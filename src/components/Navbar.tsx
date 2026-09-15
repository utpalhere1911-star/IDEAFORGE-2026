"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link href="/" className="nav-item-modern" style={{ justifySelf: 'flex-start' }}>
          HOME
        </Link>
        <Link href="/register" className="nav-item-modern nav-item-primary" style={{ justifySelf: 'center' }}>
          <span className="nav-indicator"></span>
          REGISTER
        </Link>
        <Link href="#timeline" className="nav-item-modern" style={{ justifySelf: 'flex-end' }}>
          TIMELINE
        </Link>
      </nav>
    </header>
  );
}
