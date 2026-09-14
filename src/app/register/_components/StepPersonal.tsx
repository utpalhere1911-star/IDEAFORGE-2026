import type { RegistrationData, StepErrors } from "../page";

interface Props {
  data: RegistrationData;
  errors: StepErrors;
  onChange: (field: keyof RegistrationData, value: string) => void;
}

export default function StepPersonal({ data, errors, onChange }: Props) {
  return (
    <div className="reg-step">
      <div className="reg-step-header">
        <span className="reg-step-num">01</span>
        <div>
          <h2 className="reg-step-title">Personal Information</h2>
          <p className="reg-step-desc">
            Tell us about yourself. This information will be used for event
            communication and identification.
          </p>
        </div>
      </div>

      <div className="reg-step-rule" aria-hidden="true" />

      <div className="reg-fields">
        <div className="reg-field">
          <label htmlFor="reg-fullName" className="reg-label">
            Full Name <span className="reg-required" aria-label="required">*</span>
          </label>
          <input
            id="reg-fullName"
            type="text"
            className={`reg-input ${errors.fullName ? "reg-input--error" : ""}`}
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            aria-describedby={errors.fullName ? "err-fullName" : undefined}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p className="reg-error" id="err-fullName" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="reg-field">
          <label htmlFor="reg-email" className="reg-label">
            Email Address <span className="reg-required" aria-label="required">*</span>
          </label>
          <input
            id="reg-email"
            type="email"
            className={`reg-input ${errors.email ? "reg-input--error" : ""}`}
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            aria-describedby={errors.email ? "err-email" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="reg-error" id="err-email" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="reg-field">
          <label htmlFor="reg-phone" className="reg-label">
            Phone Number <span className="reg-required" aria-label="required">*</span>
          </label>
          <input
            id="reg-phone"
            type="tel"
            className={`reg-input ${errors.phone ? "reg-input--error" : ""}`}
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            autoComplete="tel"
            aria-describedby={errors.phone ? "err-phone" : undefined}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="reg-error" id="err-phone" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
