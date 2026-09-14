import type { RegistrationData, StepErrors } from "../page";

interface Props {
  data: RegistrationData;
  errors: StepErrors;
  onChange: (field: keyof RegistrationData, value: string) => void;
}

const YEAR_OPTIONS = [
  "",
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
  "Postgraduate — 1st Year",
  "Postgraduate — 2nd Year",
  "PhD",
  "Other",
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
          <label htmlFor="reg-institution" className="reg-label">
            University / Institution{" "}
            <span className="reg-required" aria-label="required">*</span>
          </label>
          <input
            id="reg-institution"
            type="text"
            className={`reg-input ${errors.institution ? "reg-input--error" : ""}`}
            value={data.institution}
            onChange={(e) => onChange("institution", e.target.value)}
            placeholder="e.g. Girijananda Chowdhury University"
            autoComplete="organization"
            aria-describedby={errors.institution ? "err-institution" : undefined}
            aria-invalid={!!errors.institution}
          />
          {errors.institution && (
            <p className="reg-error" id="err-institution" role="alert">
              {errors.institution}
            </p>
          )}
        </div>

        <div className="reg-field-row">
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

          <div className="reg-field">
            <label htmlFor="reg-department" className="reg-label">
              Department{" "}
              <span className="reg-required" aria-label="required">*</span>
            </label>
            <input
              id="reg-department"
              type="text"
              className={`reg-input ${errors.department ? "reg-input--error" : ""}`}
              value={data.department}
              onChange={(e) => onChange("department", e.target.value)}
              placeholder="e.g. Computer Science & Engineering"
              aria-describedby={errors.department ? "err-department" : undefined}
              aria-invalid={!!errors.department}
            />
            {errors.department && (
              <p className="reg-error" id="err-department" role="alert">
                {errors.department}
              </p>
            )}
          </div>
        </div>

        <div className="reg-field" style={{ maxWidth: 320 }}>
          <label htmlFor="reg-year" className="reg-label">
            Year / Semester{" "}
            <span className="reg-required" aria-label="required">*</span>
          </label>
          <div className="reg-select-wrap">
            <select
              id="reg-year"
              className={`reg-input reg-select ${errors.year ? "reg-input--error" : ""}`}
              value={data.year}
              onChange={(e) => onChange("year", e.target.value)}
              aria-describedby={errors.year ? "err-year" : undefined}
              aria-invalid={!!errors.year}
            >
              {YEAR_OPTIONS.map((opt) => (
                <option key={opt} value={opt} disabled={opt === ""}>
                  {opt || "Select year / semester"}
                </option>
              ))}
            </select>
            <span className="reg-select-chevron" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="3 4.5 6 7.5 9 4.5" />
              </svg>
            </span>
          </div>
          {errors.year && (
            <p className="reg-error" id="err-year" role="alert">
              {errors.year}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
