import Link from "next/link";
import Image from "next/image";

export default function RegisterHeader() {
  return (
    <header className="reg-header">
      <nav className="reg-header-inner" aria-label="Registration navigation">
        <Link href="/" className="reg-header-brand" aria-label="Back to IDEAFORGE 2026 homepage">
          <Image
            src="/assets/ideaforge-2026-logo.png"
            alt="IDEAFORGE 2026"
            width={130}
            height={32}
            priority
            className="reg-header-logo"
          />
        </Link>
        <div className="reg-header-center">
          <span className="reg-header-divider" aria-hidden="true">/</span>
          <span className="reg-header-title">Registration</span>
        </div>
        <Link href="/" className="reg-header-close" aria-label="Return to homepage">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <line x1="4" y1="4" x2="14" y2="14" />
            <line x1="14" y1="4" x2="4" y2="14" />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
