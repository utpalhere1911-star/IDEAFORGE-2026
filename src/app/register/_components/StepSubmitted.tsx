import Link from "next/link";
import Image from "next/image";
import type { RegistrationData } from "../page";

interface Props {
  data: RegistrationData;
  registrationId?: string | null;
}

import { problemStatements } from "@/data/problemStatements";

export default function StepSubmitted({ data, registrationId }: Props) {
  const selectedOfficial = problemStatements.find((ps) => ps.id === data.problemStatementId);
  return (
    <div className="reg-submitted">
      <div className="reg-submitted-inner">
        <div className="reg-submitted-badge" aria-hidden="true">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="24" cy="24" r="22" opacity="0.2" />
            <polyline points="15 24 21 30 33 18" />
          </svg>
        </div>

        <div className="reg-submitted-brand">
          <Image
            src="/assets/ideaforge-2026-logo.png"
            alt="IDEAFORGE 2026"
            width={140}
            height={34}
            className="reg-submitted-logo"
          />
        </div>

        <h2 className="reg-submitted-title">Registration Submitted</h2>

        <p className="reg-submitted-copy">
          Thank you, <strong>{data.fullName}</strong>. Your team registration
          for IDEAFORGE 2026 has been successfully submitted and recorded.
        </p>

        <div className="reg-submitted-details">
          {registrationId && (
            <div className="reg-submitted-detail-row">
              <span className="reg-submitted-detail-key">Registration ID</span>
              <span className="reg-submitted-detail-val reg-submitted-id-val">
                {registrationId}
              </span>
            </div>
          )}
          <div className="reg-submitted-detail-row">
            <span className="reg-submitted-detail-key">Team</span>
            <span className="reg-submitted-detail-val">{data.teamName}</span>
          </div>
          <div className="reg-submitted-detail-row">
            <span className="reg-submitted-detail-key">Lead</span>
            <span className="reg-submitted-detail-val">{data.fullName}</span>
          </div>
          <div className="reg-submitted-detail-row">
            <span className="reg-submitted-detail-key">Domain</span>
            <span className="reg-submitted-detail-val">{selectedOfficial?.title || "Unknown"}</span>
          </div>
          <div className="reg-submitted-detail-row">
            <span className="reg-submitted-detail-key">Event Dates</span>
            <span className="reg-submitted-detail-val">22 September 2026</span>
          </div>
          <div className="reg-submitted-detail-row">
            <span className="reg-submitted-detail-key">Venue</span>
            <span className="reg-submitted-detail-val">Venue TBA</span>
          </div>
        </div>

        <div className="reg-submitted-actions">
          <Link href="/" className="lime-button reg-submitted-home">
            Back to IDEAFORGE <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
