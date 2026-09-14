import type { RegistrationData, StepErrors, TeamMember } from "../page";

interface Props {
  data: RegistrationData;
  errors: StepErrors;
  onChange: (field: keyof RegistrationData, value: string) => void;
  onMembersChange: (members: TeamMember[]) => void;
}

export default function StepTeam({
  data,
  errors,
  onChange,
  onMembersChange,
}: Props) {
  function updateMember(index: number, field: keyof TeamMember, value: string) {
    const next = data.members.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    );
    onMembersChange(next);
  }

  function addMember() {
    onMembersChange([...data.members, { name: "", role: "" }]);
  }

  function removeMember(index: number) {
    if (data.members.length <= 1) return;
    onMembersChange(data.members.filter((_, i) => i !== index));
  }

  return (
    <div className="reg-step">
      <div className="reg-step-header">
        <span className="reg-step-num">03</span>
        <div>
          <h2 className="reg-step-title">Team Details</h2>
          <p className="reg-step-desc">
            IDEAFORGE is a team-based competition. Set up your team identity and
            add your team members.
          </p>
        </div>
      </div>

      <div className="reg-step-rule" aria-hidden="true" />

      <div className="reg-fields">
        <div className="reg-field">
          <label htmlFor="reg-teamName" className="reg-label">
            Team Name{" "}
            <span className="reg-required" aria-label="required">*</span>
          </label>
          <input
            id="reg-teamName"
            type="text"
            className={`reg-input ${errors.teamName ? "reg-input--error" : ""}`}
            value={data.teamName}
            onChange={(e) => onChange("teamName", e.target.value)}
            placeholder="Give your team a name"
            aria-describedby={errors.teamName ? "err-teamName" : undefined}
            aria-invalid={!!errors.teamName}
          />
          {errors.teamName && (
            <p className="reg-error" id="err-teamName" role="alert">
              {errors.teamName}
            </p>
          )}
        </div>

        <div className="reg-team-section">
          <div className="reg-team-section-header">
            <span className="reg-label" style={{ marginBottom: 0 }}>
              Team Members <span className="reg-required" aria-label="required">*</span>
            </span>
            <span className="reg-team-count">
              {data.members.length} {data.members.length === 1 ? "member" : "members"}
            </span>
          </div>

          <div className="reg-team-list">
            {data.members.map((member, idx) => (
              <fieldset key={idx} className="reg-team-member">
                <legend className="reg-team-member-legend">
                  Member {idx + 1}
                  {idx === 0 && (
                    <span className="reg-team-lead-badge">You</span>
                  )}
                </legend>
                <div className="reg-team-member-fields">
                  <div className="reg-field">
                    <label
                      htmlFor={`reg-member-${idx}-name`}
                      className="reg-label"
                    >
                      Name{" "}
                      <span className="reg-required" aria-label="required">*</span>
                    </label>
                    <input
                      id={`reg-member-${idx}-name`}
                      type="text"
                      className={`reg-input ${errors[`member_${idx}_name`] ? "reg-input--error" : ""}`}
                      value={member.name}
                      onChange={(e) =>
                        updateMember(idx, "name", e.target.value)
                      }
                      placeholder="Member's full name"
                      aria-describedby={
                        errors[`member_${idx}_name`]
                          ? `err-member-${idx}-name`
                          : undefined
                      }
                      aria-invalid={!!errors[`member_${idx}_name`]}
                    />
                    {errors[`member_${idx}_name`] && (
                      <p
                        className="reg-error"
                        id={`err-member-${idx}-name`}
                        role="alert"
                      >
                        {errors[`member_${idx}_name`]}
                      </p>
                    )}
                  </div>
                  <div className="reg-field">
                    <label
                      htmlFor={`reg-member-${idx}-role`}
                      className="reg-label"
                    >
                      Role
                    </label>
                    <input
                      id={`reg-member-${idx}-role`}
                      type="text"
                      className="reg-input"
                      value={member.role}
                      onChange={(e) =>
                        updateMember(idx, "role", e.target.value)
                      }
                      placeholder={idx === 0 ? "Team Lead" : "e.g. Developer, Designer, Researcher"}
                    />
                  </div>
                </div>
                {idx > 0 && (
                  <button
                    type="button"
                    className="reg-team-remove"
                    onClick={() => removeMember(idx)}
                    aria-label={`Remove member ${idx + 1}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                      <line x1="3" y1="7" x2="11" y2="7" />
                    </svg>
                    Remove
                  </button>
                )}
              </fieldset>
            ))}
          </div>

          <button
            type="button"
            className="reg-team-add"
            onClick={addMember}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <line x1="7" y1="3" x2="7" y2="11" />
              <line x1="3" y1="7" x2="11" y2="7" />
            </svg>
            Add team member
          </button>
        </div>
      </div>
    </div>
  );
}
