import type { ProblemStatement } from "@/data/problemStatements";

export default function ProblemStatementsList({
  problemStatements,
  onSelect,
}: {
  problemStatements: ProblemStatement[];
  onSelect: (ps: ProblemStatement) => void;
}) {
  return (
    <div className="ps-list-container" role="list" aria-label="Problem Statements List">
      {problemStatements.map((ps) => {
        const displayId = ps.id.replace("IF26-", "0");

        return (
          <div className="ps-item-flat" key={ps.id} role="listitem">
            <div className="ps-item-flat-header">
              <div className="ps-item-id-badge">
                <span className="ps-item-id-label">PS /</span>
                <span className="ps-item-id-number">{displayId}</span>
              </div>
              <div className="ps-item-title-group">
                <h3 className="ps-item-title">{ps.title}</h3>
                <span className="ps-item-category">{ps.description}</span>
              </div>
            </div>
            <button
              type="button"
              className="ps-item-cta"
              onClick={() => onSelect(ps)}
            >
              VIEW DETAILS <span aria-hidden="true">→</span>
            </button>
            <hr className="ps-item-divider" />
          </div>
        );
      })}
    </div>
  );
}
