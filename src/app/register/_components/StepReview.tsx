import type { RegistrationData } from "../page";
import { problemStatements } from "@/data/problemStatements";

interface Props {
  data: RegistrationData;
  goToStep: (step: number) => void;
  submitError?: string | null;
}

function ReviewSection({
  num,
  title,
  onEdit,
  children,
}: {
  num: string;
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="review-section">
      <div className="review-section-header">
        <div className="review-section-id">
          <span className="review-section-num">{num}</span>
          <h3 className="review-section-title">{title}</h3>
        </div>
        <button
          type="button"
          className="review-edit-btn"
          onClick={onEdit}
          aria-label={`Edit ${title}`}
        >
          Edit
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8.5 1.5l2 2L4 10H2V8z" />
          </svg>
        </button>
      </div>
      <div className="review-section-body">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="review-row">
      <dt className="review-key">{label}</dt>
      <dd className="review-val">{value || <span className="review-empty">—</span>}</dd>
    </div>
  );
}

export default function StepReview({ data, goToStep, submitError }: Props) {
  const selectedOfficial = problemStatements.find((ps) => ps.id === data.problemStatementId);

  return (
    <div className="reg-step">
      <div className="reg-step-header">
        <span className="reg-step-num">06</span>
        <div>
          <h2 className="reg-step-title">Review &amp; Submit</h2>
          <p className="reg-step-desc">
            Review all your information before submitting. Use the Edit button
            on each section to make corrections.
          </p>
        </div>
      </div>

      <div className="reg-step-rule" aria-hidden="true" />

      {submitError && (
        <div className="reg-submit-error" role="alert">
          <div className="reg-submit-error-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>{submitError}</div>
        </div>
      )}

      <div className="review-sections">
        <ReviewSection num="01" title="Personal" onEdit={() => goToStep(1)}>
          <dl className="review-grid">
            <ReviewRow label="Full Name" value={data.fullName} />
            <ReviewRow label="Email" value={data.email} />
            <ReviewRow label="Phone" value={data.phone} />
          </dl>
        </ReviewSection>

        <ReviewSection num="02" title="Academic" onEdit={() => goToStep(2)}>
          <dl className="review-grid">
            <ReviewRow label="Course" value={data.course} />
            <ReviewRow label="Semester" value={data.semester} />
          </dl>
        </ReviewSection>

        <ReviewSection num="03" title="Team" onEdit={() => goToStep(3)}>
          <dl className="review-grid">
            <ReviewRow label="Team Name" value={data.teamName} />
          </dl>
          <div className="review-members">
            <span className="review-members-label">Members</span>
            {data.members.map((m, i) => (
              <div key={i} className="review-member-row">
                <span className="review-member-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="review-member-name">{m.name || "—"}</span>
                {m.role && (
                  <span className="review-member-role">{m.role}</span>
                )}
              </div>
            ))}
          </div>
        </ReviewSection>

        <ReviewSection num="04" title="Project" onEdit={() => goToStep(4)}>
          <dl className="review-grid">
            <div className="review-row" style={{ gridColumn: "1 / -1" }}>
              <dt className="review-key">Problem Statement</dt>
              <dd className="review-val">
                {selectedOfficial ? (
                  <div>
                    <strong>{selectedOfficial.id.replace("IF26-", "0")} — {selectedOfficial.title}</strong>
                    <p style={{ marginTop: 4, color: "var(--dim)", fontSize: "13px", whiteSpace: "pre-wrap" }}>{selectedOfficial.description}</p>
                  </div>
                ) : (
                  <span className="review-empty">Not selected</span>
                )}
              </dd>
            </div>
            <ReviewRow label="File Attached" value={data.projectFile ? data.projectFile.name : "None"} />
          </dl>
        </ReviewSection>
      </div>
    </div>
  );
}
