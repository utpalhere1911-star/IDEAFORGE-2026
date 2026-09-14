import type { RegistrationData } from "../page";

interface Props {
  data: RegistrationData;
  onChange: (field: keyof RegistrationData, value: string) => void;
}

export default function StepProblem({ data, onChange }: Props) {
  return (
    <div className="reg-step">
      <div className="reg-step-header">
        <span className="reg-step-num">05</span>
        <div>
          <h2 className="reg-step-title">Problem Statement</h2>
          <p className="reg-step-desc">
            Select an official problem statement for your submission, or proceed
            with your own idea under Open Innovation.
          </p>
        </div>
      </div>

      <div className="reg-step-rule" aria-hidden="true" />

      <div className="reg-fields">
        {/* Placeholder for future official problem statements */}
        <div className="reg-problem-notice">
          <div className="reg-problem-notice-icon" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div className="reg-problem-notice-content">
            <h3 className="reg-problem-notice-title">Coming Soon</h3>
            <p className="reg-problem-notice-text">
              Official problem statements will be announced soon. You may
              proceed with your registration — you can update your problem
              statement selection later.
            </p>
          </div>
        </div>

        <div className="reg-field" style={{ marginTop: 32 }}>
          <label htmlFor="reg-problemStatement" className="reg-label">
            Additional Notes <span className="reg-optional">(optional)</span>
          </label>
          <p className="reg-hint" id="hint-problemStatement">
            If you have a preferred problem domain or any notes for the
            organisers, mention them here.
          </p>
          <textarea
            id="reg-problemStatement"
            className="reg-input reg-textarea"
            value={data.problemStatement}
            onChange={(e) => onChange("problemStatement", e.target.value)}
            placeholder="Any additional notes..."
            rows={3}
            aria-describedby="hint-problemStatement"
          />
        </div>
      </div>
    </div>
  );
}
