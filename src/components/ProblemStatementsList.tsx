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
              <span className="ps-item-id">{displayId}</span>
              <h3 className="ps-item-title">{ps.title}</h3>
              <span className="ps-item-category">{ps.category}</span>
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
