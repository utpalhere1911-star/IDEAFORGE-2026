import type { RegistrationData, StepErrors } from "../page";

interface Props {
  data: RegistrationData;
  errors: StepErrors;
  onChange: (field: keyof RegistrationData, value: string) => void;
}

const SEMESTER_OPTIONS = [
  "",
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
];

export default function StepAcademic({ data, errors, onChange }: Props) {
  return (
    <div className="reg-step">
      <div className="reg-step-header">
        <span className="reg-step-num">02</span>
        <div>
          <h2 className="reg-step-title">Academic Details</h2>
          <p className="reg-step-desc">
            Your academic background helps us understand our participants and
            tailor the event experience.
          </p>
        </div>
      </div>

      <div className="reg-step-rule" aria-hidden="true" />

      <div className="reg-fields">
        <div className="reg-field">
          <label htmlFor="reg-course" className="reg-label">
            Course / Program{" "}
            <span className="reg-required" aria-label="required">*</span>
          </label>
          <input
            id="reg-course"
            type="text"
            className={`reg-input ${errors.course ? "reg-input--error" : ""}`}
            value={data.course}
            onChange={(e) => onChange("course", e.target.value)}
            placeholder="e.g. B.Tech Computer Science"
            aria-describedby={errors.course ? "err-course" : undefined}
            aria-invalid={!!errors.course}
          />
          {errors.course && (
            <p className="reg-error" id="err-course" role="alert">
              {errors.course}
            </p>
          )}
        </div>

        <div className="reg-field" style={{ maxWidth: 320 }}>
          <label htmlFor="reg-semester" className="reg-label">
            Semester{" "}
            <span className="reg-required" aria-label="required">*</span>
          </label>
          <div className="reg-select-wrap">
            <select
              id="reg-semester"
              className={`reg-input reg-select ${errors.semester ? "reg-input--error" : ""}`}
              value={data.semester}
              onChange={(e) => onChange("semester", e.target.value)}
              aria-describedby={errors.semester ? "err-semester" : undefined}
              aria-invalid={!!errors.semester}
            >
              {SEMESTER_OPTIONS.map((opt) => (
                <option key={opt} value={opt} disabled={opt === ""}>
                  {opt || "Select semester"}
                </option>
              ))}
            </select>
            <span className="reg-select-chevron" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="3 4.5 6 7.5 9 4.5" />
              </svg>
            </span>
          </div>
          {errors.semester && (
            <p className="reg-error" id="err-semester" role="alert">
              {errors.semester}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
