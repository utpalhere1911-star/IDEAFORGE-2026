import type { ProblemStatement } from "@/data/problemStatements";

interface ProblemStatementDetailProps {
  problemStatement: ProblemStatement;
  onBack: () => void;
}

export default function ProblemStatementDetail({
  problemStatement,
  onBack,
}: ProblemStatementDetailProps) {
  const displayId = problemStatement.id.replace("IF26-", "0");

  return (
    <div className="ps-detail-view">
      <div className="ps-detail-header">
        <div className="ps-detail-id-badge">
          <span className="ps-detail-id-label">PS /</span>
          <span className="ps-detail-id-number">{displayId}</span>
        </div>
        <div className="ps-detail-title-group">
          <h3 className="ps-detail-title">{problemStatement.title}</h3>
        </div>
      </div>
      
      <div className="ps-detail-content">
        <div className="ps-detail-section">
          {problemStatement.description.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="ps-detail-footer">
        <button
          type="button"
          className="ps-back-btn"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span> BACK TO PROBLEM STATEMENTS
        </button>
      </div>
    </div>
  );
}
