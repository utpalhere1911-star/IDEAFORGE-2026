import type { RegistrationData, StepErrors } from "../page";

interface Props {
  data: RegistrationData;
  errors: StepErrors;
  onChange: (field: keyof RegistrationData, value: string) => void;
}

export default function StepProject({ data, errors, onChange }: Props) {
  return (
    <div className="reg-step">
      <div className="reg-step-header">
        <span className="reg-step-num">04</span>
        <div>
          <h2 className="reg-step-title">Your Project</h2>
          <p className="reg-step-desc">
            Describe your innovation. This is the core of your IDEAFORGE
            submission — tell us what you&apos;re building and why it matters.
          </p>
        </div>
      </div>

      <div className="reg-step-rule" aria-hidden="true" />

      <div className="reg-fields">
        <div className="reg-field">
          <label htmlFor="reg-projectTitle" className="reg-label">
            Project / Idea Title{" "}
            <span className="reg-required" aria-label="required">*</span>
          </label>
          <input
            id="reg-projectTitle"
            type="text"
            className={`reg-input ${errors.projectTitle ? "reg-input--error" : ""}`}
            value={data.projectTitle}
            onChange={(e) => onChange("projectTitle", e.target.value)}
            placeholder="What is your idea called?"
            aria-describedby={errors.projectTitle ? "err-projectTitle" : undefined}
            aria-invalid={!!errors.projectTitle}
          />
          {errors.projectTitle && (
            <p className="reg-error" id="err-projectTitle" role="alert">
              {errors.projectTitle}
            </p>
          )}
        </div>

        <div className="reg-field">
          <label htmlFor="reg-shortDescription" className="reg-label">
            Short Description{" "}
            <span className="reg-required" aria-label="required">*</span>
          </label>
          <p className="reg-hint" id="hint-shortDescription">
            A concise overview of your project in 2–3 sentences.
          </p>
          <textarea
            id="reg-shortDescription"
            className={`reg-input reg-textarea ${errors.shortDescription ? "reg-input--error" : ""}`}
            value={data.shortDescription}
            onChange={(e) => onChange("shortDescription", e.target.value)}
            placeholder="Briefly describe your idea and what it does..."
            rows={3}
            aria-describedby={`hint-shortDescription${errors.shortDescription ? " err-shortDescription" : ""}`}
            aria-invalid={!!errors.shortDescription}
          />
          {errors.shortDescription && (
            <p className="reg-error" id="err-shortDescription" role="alert">
              {errors.shortDescription}
            </p>
          )}
        </div>

        <div className="reg-field">
          <label htmlFor="reg-problemAddressed" className="reg-label">
            Problem Being Addressed{" "}
            <span className="reg-required" aria-label="required">*</span>
          </label>
          <p className="reg-hint" id="hint-problemAddressed">
            What real-world problem does your idea aim to solve?
          </p>
          <textarea
            id="reg-problemAddressed"
            className={`reg-input reg-textarea ${errors.problemAddressed ? "reg-input--error" : ""}`}
            value={data.problemAddressed}
            onChange={(e) => onChange("problemAddressed", e.target.value)}
            placeholder="Describe the problem your idea addresses..."
            rows={4}
            aria-describedby={`hint-problemAddressed${errors.problemAddressed ? " err-problemAddressed" : ""}`}
            aria-invalid={!!errors.problemAddressed}
          />
          {errors.problemAddressed && (
            <p className="reg-error" id="err-problemAddressed" role="alert">
              {errors.problemAddressed}
            </p>
          )}
        </div>

        <div className="reg-field">
          <label htmlFor="reg-proposedSolution" className="reg-label">
            Proposed Solution{" "}
            <span className="reg-required" aria-label="required">*</span>
          </label>
          <p className="reg-hint" id="hint-proposedSolution">
            How does your project solve the problem? What makes your approach unique?
          </p>
          <textarea
            id="reg-proposedSolution"
            className={`reg-input reg-textarea ${errors.proposedSolution ? "reg-input--error" : ""}`}
            value={data.proposedSolution}
            onChange={(e) => onChange("proposedSolution", e.target.value)}
            placeholder="Explain your solution and its unique approach..."
            rows={4}
            aria-describedby={`hint-proposedSolution${errors.proposedSolution ? " err-proposedSolution" : ""}`}
            aria-invalid={!!errors.proposedSolution}
          />
          {errors.proposedSolution && (
            <p className="reg-error" id="err-proposedSolution" role="alert">
              {errors.proposedSolution}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
