import { STEPS } from "../page";

interface StepNavProps {
  currentStep: number;
  completedSteps: Set<number>;
  variant?: "vertical" | "horizontal";
}

export default function StepNav({
  currentStep,
  completedSteps,
  variant = "vertical",
}: StepNavProps) {
  return (
    <ol
      className={`step-nav ${variant === "horizontal" ? "step-nav--hz" : "step-nav--vt"}`}
      aria-label="Registration steps"
    >
      {STEPS.map((step) => {
        const isActive = currentStep === step.num;
        const isCompleted = completedSteps.has(step.num);
        let status = "upcoming";
        if (isActive) status = "active";
        else if (isCompleted) status = "completed";

        return (
          <li
            key={step.id}
            className={`step-nav-item step-nav-item--${status}`}
            aria-current={isActive ? "step" : undefined}
          >
            <span className="step-nav-num" aria-hidden="true">
              {isCompleted && !isActive ? (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="2.5 6 5 8.5 9.5 3.5" />
                </svg>
              ) : (
                `0${step.num}`
              )}
            </span>
            <span className="step-nav-label">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
