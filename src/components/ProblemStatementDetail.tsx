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
        <span className="ps-detail-number">PROBLEM STATEMENT {displayId}</span>
        <h3 className="ps-detail-title">{problemStatement.title}</h3>
        <span className="ps-detail-category">{problemStatement.category}</span>
      </div>
      
      <div className="ps-detail-content">
        <div className="ps-detail-section">
          <h4>PROBLEM</h4>
          {problemStatement.problem.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        
        <div className="ps-detail-section">
          <h4>CHALLENGE</h4>
          {problemStatement.challenge.split('\n\n').map((p, i) => (
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
