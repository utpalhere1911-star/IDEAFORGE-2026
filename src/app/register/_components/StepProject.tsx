import type { RegistrationData, StepErrors } from "../page";
import { problemStatements } from "@/data/problemStatements";

interface Props {
  data: RegistrationData;
  errors: StepErrors;
  onChange: <K extends keyof RegistrationData>(field: K, value: RegistrationData[K]) => void;
}

export default function StepProject({ data, errors, onChange }: Props) {

  const isOpenProject = data.problemStatementId === "OPEN_PROJECT";
  const selectedOfficial = problemStatements.find((ps) => ps.id === data.problemStatementId);

  return (
    <div className="reg-step">
      <div className="reg-step-header">
        <span className="reg-step-num">04</span>
        <div>
          <h2 className="reg-step-title">Project</h2>
          <p className="reg-step-desc">
            Select an official IDEAFORGE problem statement or submit your own open project.
          </p>
        </div>
      </div>

      <div className="reg-step-rule" aria-hidden="true" />

      <div className="reg-fields">
        <div className="reg-field">
          <label htmlFor="reg-problemStatementId" className="reg-label">
            Problem Statement{" "}
            <span className="reg-required" aria-label="required">*</span>
          </label>
          <select
            id="reg-problemStatementId"
            className={`reg-input reg-select ${errors.problemStatementId ? "reg-input--error" : ""}`}
            value={data.problemStatementId}
            onChange={(e) => onChange("problemStatementId", e.target.value)}
            aria-describedby={errors.problemStatementId ? "err-problemStatementId" : undefined}
            aria-invalid={!!errors.problemStatementId}
          >
            <option value="">Select a Problem Statement ▼</option>
            {problemStatements.map((ps) => (
              <option key={ps.id} value={ps.id}>
                {ps.title}
              </option>
            ))}
            <option value="OPEN_PROJECT">OPEN PROJECT</option>
          </select>
          {errors.problemStatementId && (
            <p className="reg-error" id="err-problemStatementId" role="alert">
              {errors.problemStatementId}
            </p>
          )}
        </div>

        {selectedOfficial && (
          <div className="reg-problem-notice" style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px' }}>
            <h3 style={{ color: '#10b981', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Selected Problem Statement:</h3>
            <p style={{ color: '#e2e8f0', margin: 0 }}>{selectedOfficial.title}</p>
          </div>
        )}

        {isOpenProject && (
          <>
            <div className="reg-field" style={{ marginTop: '1.5rem' }}>
              <label htmlFor="reg-projectTitle" className="reg-label">
                Project Title{" "}
                <span className="reg-required" aria-label="required">*</span>
              </label>
              <input
                id="reg-projectTitle"
                type="text"
                className={`reg-input ${errors.projectTitle ? "reg-input--error" : ""}`}
                value={data.projectTitle}
                onChange={(e) => onChange("projectTitle", e.target.value)}
                placeholder="Enter your project title"
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
                Describe Your Project{" "}
                <span className="reg-required" aria-label="required">*</span>
              </label>
              <textarea
                id="reg-shortDescription"
                className={`reg-input reg-textarea ${errors.shortDescription ? "reg-input--error" : ""}`}
                value={data.shortDescription}
                onChange={(e) => onChange("shortDescription", e.target.value)}
                placeholder="Briefly describe your idea and what it does..."
                rows={5}
                aria-describedby={errors.shortDescription ? "err-shortDescription" : undefined}
                aria-invalid={!!errors.shortDescription}
              />
              {errors.shortDescription && (
                <p className="reg-error" id="err-shortDescription" role="alert">
                  {errors.shortDescription}
                </p>
              )}
            </div>
          </>
        )}

        <div className="reg-step-rule" aria-hidden="true" style={{ margin: '2rem 0' }} />

        <div className="reg-field">
          <label htmlFor="reg-projectFile" className="reg-label">
            UPLOAD PPT, PPTX OR PDF <span className="reg-optional" style={{ color: '#94a3b8', fontSize: '0.9em', fontWeight: 'normal', marginLeft: '4px' }}>(OPTIONAL)</span>
          </label>
          <p className="reg-hint" id="hint-projectFile">
            Optional • Maximum 1 MB
          </p>
          <input
            id="reg-projectFile"
            type="file"
            accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.pdf,application/pdf"
            className={`reg-input ${errors.projectFile ? "reg-input--error" : ""}`}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file) {
                const validExtensions = ['.ppt', '.pptx', '.pdf'];
                const validTypes = [
                  'application/vnd.ms-powerpoint', 
                  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                  'application/pdf'
                ];
                
                const isExtensionValid = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
                const isTypeValid = validTypes.includes(file.type);
                
                if (!isExtensionValid && !isTypeValid) {
                  alert("Only PPT, PPTX, and PDF files are allowed.");
                  e.target.value = "";
                  onChange("projectFile", null);
                  return;
                }

                if (file.size > 1048576) {
                  alert("File size must be 1 MB or smaller.");
                  e.target.value = "";
                  onChange("projectFile", null);
                  return;
                }
              }
              onChange("projectFile", file);
            }}
            aria-describedby={`hint-projectFile${errors.projectFile ? " err-projectFile" : ""}`}
            aria-invalid={!!errors.projectFile}
          />
          {data.projectFile && (
            <p className="reg-hint" style={{ marginTop: '0.5rem', color: '#10b981' }}>
              Selected: {data.projectFile.name} ({(data.projectFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
          {errors.projectFile && (
            <p className="reg-error" id="err-projectFile" role="alert">
              {errors.projectFile}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
