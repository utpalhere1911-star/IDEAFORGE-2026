"use client";

import { useReducer, useCallback, useRef, useEffect } from "react";
import RegisterHeader from "./_components/RegisterHeader";
import StepNav from "./_components/StepNav";
import StepPersonal from "./_components/StepPersonal";
import StepAcademic from "./_components/StepAcademic";
import StepTeam from "./_components/StepTeam";
import StepProject from "./_components/StepProject";

import StepReview from "./_components/StepReview";
import StepSubmitted from "./_components/StepSubmitted";
import { submitRegistration, getUploadUrl } from "./actions";
import { supabase } from "@/lib/supabase/client";

/* ─── Types ─── */

export interface TeamMember {
  name: string;
  role: string;
}

export interface RegistrationData {
  // Step 1: Personal
  fullName: string;
  email: string;
  phone: string;

  // Step 2: Academic
  institution: string;
  course: string;
  department: string;
  year: string;

  // Step 3: Team
  teamName: string;
  members: TeamMember[];

  // Step 4: Project
  problemStatementId: string;
  projectTitle: string;
  shortDescription: string;
  problemAddressed: string;
  proposedSolution: string;
  projectFile: File | null;

  // Step 5: (Removed or renamed, preserving legacy fields if still used in state transitions)
  problemStatement: string;
}

export interface StepErrors {
  [key: string]: string;
}

type Action =
  | { type: "UPDATE_FIELD"; field: keyof RegistrationData; value: RegistrationData[keyof RegistrationData] }
  | { type: "UPDATE_MEMBERS"; members: TeamMember[] }
  | { type: "SET_STEP"; step: number }
  | { type: "SET_ERRORS"; errors: StepErrors }
  | { type: "CLEAR_ERRORS" }
  | { type: "MARK_COMPLETED"; step: number }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; registrationId: string }
  | { type: "SUBMIT_ERROR"; error: string };

interface State {
  data: RegistrationData;
  currentStep: number;
  completedSteps: Set<number>;
  errors: StepErrors;
  isSubmitting: boolean;
  submitError: string | null;
  registrationId: string | null;
  submitted: boolean;
}

const initialData: RegistrationData = {
  fullName: "",
  email: "",
  phone: "",
  institution: "",
  course: "",
  department: "",
  year: "",
  teamName: "",
  members: [
    { name: "", role: "Team Leader" },
    { name: "", role: "Member" },
    { name: "", role: "Member" },
    { name: "", role: "Member" },
  ],
  problemStatementId: "",
  projectTitle: "",
  shortDescription: "",
  problemAddressed: "",
  proposedSolution: "",
  projectFile: null,
  problemStatement: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
      };
    case "UPDATE_MEMBERS":
      return {
        ...state,
        data: { ...state.data, members: action.members },
      };
    case "SET_STEP":
      return { ...state, currentStep: action.step, errors: {}, submitError: null };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "CLEAR_ERRORS":
      return { ...state, errors: {} };
    case "MARK_COMPLETED": {
      const next = new Set(state.completedSteps);
      next.add(action.step);
      return { ...state, completedSteps: next };
    }
    case "SUBMIT_START":
      return { ...state, isSubmitting: true, submitError: null };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        submitted: true,
        currentStep: 6,
        registrationId: action.registrationId,
      };
    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmitting: false,
        submitError: action.error,
      };
    default:
      return state;
  }
}

/* ─── Step definitions ─── */

export const STEPS = [
  { num: 1, id: "personal", label: "Personal" },
  { num: 2, id: "academic", label: "Academic" },
  { num: 3, id: "team", label: "Team" },
  { num: 4, id: "project", label: "Project" },
  { num: 5, id: "review", label: "Review" },
] as const;

/* ─── Validators ─── */

function validatePersonal(data: RegistrationData): StepErrors {
  const e: StepErrors = {};
  if (!data.fullName.trim()) e.fullName = "Full name is required.";
  if (!data.email.trim()) {
    e.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    e.email = "Enter a valid email address.";
  }
  if (!data.phone.trim()) {
    e.phone = "Phone number is required.";
  } else if (!/^[+\d][\d\s\-()]{7,}$/.test(data.phone.trim())) {
    e.phone = "Enter a valid phone number.";
  }
  return e;
}

function validateAcademic(data: RegistrationData): StepErrors {
  const e: StepErrors = {};
  if (!data.institution.trim()) e.institution = "Institution is required.";
  if (!data.course.trim()) e.course = "Course / Program is required.";
  if (!data.department.trim()) e.department = "Department is required.";
  if (!data.year) e.year = "Year / Semester is required.";
  return e;
}

function validateTeam(data: RegistrationData): StepErrors {
  const e: StepErrors = {};
  if (!data.teamName.trim()) e.teamName = "Team name is required.";
  data.members.forEach((m, i) => {
    if (!m.name.trim()) e[`member_${i}_name`] = "Member name is required.";
  });
  return e;
}

function validateProject(data: RegistrationData): StepErrors {
  const e: StepErrors = {};
  if (!data.problemStatementId) {
    e.problemStatementId = "Please select a problem statement or choose Open Project.";
  }
  if (data.projectFile) {
    const validExtensions = ['.ppt', '.pptx'];
    const validTypes = [
      'application/vnd.ms-powerpoint', 
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    
    const isExtensionValid = validExtensions.some(ext => data.projectFile!.name.toLowerCase().endsWith(ext));
    const isTypeValid = validTypes.includes(data.projectFile!.type);
    
    if (!isExtensionValid && !isTypeValid) {
      e.projectFile = "Only PPT and PPTX files are allowed.";
    } else if (data.projectFile.size > 1048576) {
      e.projectFile = "File size must be 1 MB or smaller.";
    }
  }
  return e;
}

const validators: Record<number, (d: RegistrationData) => StepErrors> = {
  1: validatePersonal,
  2: validateAcademic,
  3: validateTeam,
  4: validateProject,
};

/* ─── Page Component ─── */

export default function RegisterPage() {
  const [state, dispatch] = useReducer(reducer, {
    data: initialData,
    currentStep: 1,
    completedSteps: new Set<number>(),
    errors: {},
    isSubmitting: false,
    submitError: null,
    registrationId: null,
    submitted: false,
  });

  const formAreaRef = useRef<HTMLDivElement>(null);

  /* Scroll form area to top on step change */
  useEffect(() => {
    if (!formAreaRef.current) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [state.currentStep]);

  /* Scroll to top when submitError appears */
  useEffect(() => {
    if (state.submitError && formAreaRef.current) {
      formAreaRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state.submitError]);

  const updateField = useCallback(
    <K extends keyof RegistrationData>(field: K, value: RegistrationData[K]) => {
      dispatch({ type: "UPDATE_FIELD", field, value });
    },
    []
  );

  const updateMembers = useCallback((members: TeamMember[]) => {
    dispatch({ type: "UPDATE_MEMBERS", members });
  }, []);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: "SET_STEP", step });
  }, []);

  const handleNext = useCallback(() => {
    const validator = validators[state.currentStep];
    if (validator) {
      const errors = validator(state.data);
      if (Object.keys(errors).length > 0) {
        dispatch({ type: "SET_ERRORS", errors });
        return;
      }
    }
    dispatch({ type: "MARK_COMPLETED", step: state.currentStep });
    dispatch({ type: "CLEAR_ERRORS" });
    dispatch({ type: "SET_STEP", step: state.currentStep + 1 });
  }, [state.currentStep, state.data]);

  const handlePrev = useCallback(() => {
    if (state.currentStep > 1 && !state.isSubmitting) {
      dispatch({ type: "SET_STEP", step: state.currentStep - 1 });
    }
  }, [state.currentStep, state.isSubmitting]);

  const handleSubmit = useCallback(async () => {
    if (state.isSubmitting) return;

    // Validate all steps before submitting
    const allErrors: StepErrors = {
      ...validatePersonal(state.data),
      ...validateAcademic(state.data),
      ...validateTeam(state.data),
      ...validateProject(state.data),
    };

    if (Object.keys(allErrors).length > 0) {
      dispatch({
        type: "SUBMIT_ERROR",
        error: "Please complete all required fields before submitting.",
      });
      return;
    }

    dispatch({ type: "SUBMIT_START" });

    let uploadedFilePath = "";
    try {
      
      if (state.data.projectFile) {
        // 1. Get signed url
        const uploadUrlRes = await getUploadUrl(state.data.projectFile.name, state.data.projectFile.size);
        if (!uploadUrlRes.success || !uploadUrlRes.token || !uploadUrlRes.path) {
           throw new Error(uploadUrlRes.error || "Failed to get upload URL");
        }
        
        // 2. Upload the file directly to Supabase storage
        if (supabase) {
           const { error: uploadError } = await supabase.storage
             .from("ideaforge-submissions")
             .uploadToSignedUrl(uploadUrlRes.path, uploadUrlRes.token, state.data.projectFile);
             
           if (uploadError) throw new Error(uploadError.message);
        } else {
           // Fallback to fetch PUT if supabase client is not available
           const res = await fetch(uploadUrlRes.signedUrl!, { method: 'PUT', body: state.data.projectFile });
           if (!res.ok) throw new Error("File upload failed.");
        }
        uploadedFilePath = uploadUrlRes.path;
      }

      const formData = new FormData();
      const { projectFile, ...restData } = state.data;
      
      const payload = {
        ...restData,
        uploadedFilePath,
        uploadedFileName: projectFile ? projectFile.name : "",
      };
      
      formData.append("data", JSON.stringify(payload));

      const result = await submitRegistration(formData);

      if (result.success && result.registrationId) {
        for (let i = 1; i <= 5; i++) {
          dispatch({ type: "MARK_COMPLETED", step: i });
        }
        dispatch({
          type: "SUBMIT_SUCCESS",
          registrationId: result.registrationId,
        });
      } else {
        // If registration fails but we uploaded a file, try to clean it up
        if (uploadedFilePath && supabase) {
          try {
            await supabase.storage.from("ideaforge-submissions").remove([uploadedFilePath]);
          } catch (e) {
            console.error("Failed to clean up orphaned file", e);
          }
        }
        dispatch({
          type: "SUBMIT_ERROR",
          error:
            result.error ||
            "Unable to submit registration. Please try again.",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Clean up orphaned file on unexpected errors
      if (uploadedFilePath && supabase) {
        try {
          await supabase.storage.from("ideaforge-submissions").remove([uploadedFilePath]);
        } catch (e) {
          console.error("Failed to clean up orphaned file", e);
        }
      }
      dispatch({
        type: "SUBMIT_ERROR",
        error:
          "A network error occurred while submitting your registration. Please try again.",
      });
    }
  }, [state.isSubmitting, state.data]);

  /* ─── Render active step ─── */
  function renderStep() {
    switch (state.currentStep) {
      case 1:
        return (
          <StepPersonal
            data={state.data}
            errors={state.errors}
            onChange={updateField}
          />
        );
      case 2:
        return (
          <StepAcademic
            data={state.data}
            errors={state.errors}
            onChange={updateField}
          />
        );
      case 3:
        return (
          <StepTeam
            data={state.data}
            errors={state.errors}
            onChange={updateField}
            onMembersChange={updateMembers}
          />
        );
      case 4:
        return (
          <StepProject
            data={state.data}
            errors={state.errors}
            onChange={updateField}
          />
        );
      case 5:
        return (
          <StepReview
            data={state.data}
            goToStep={goToStep}
            submitError={state.submitError}
          />
        );
      default:
        return null;
    }
  }

  if (state.submitted && state.currentStep === 6) {
    return (
      <div className="reg-page">
        <RegisterHeader />
        <main className="reg-main">
          <StepSubmitted
            data={state.data}
            registrationId={state.registrationId}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="reg-page">
      <RegisterHeader />
      <main className="reg-main">
        <div className="reg-layout">
          {/* ─── Sidebar ─── */}
          <aside className="reg-sidebar" aria-label="Registration progress">
            <div className="reg-sidebar-brand">
              <span className="reg-sidebar-event">IDEAFORGE</span>
              <span className="reg-sidebar-year">2026</span>
            </div>
            <div className="reg-sidebar-label">Registration</div>
            <StepNav
              currentStep={state.currentStep}
              completedSteps={state.completedSteps}
            />
            <div className="reg-sidebar-meta">
              <div className="reg-meta-row">
                <span className="reg-meta-key">Date</span>
                <span className="reg-meta-val">16–17 October 2026</span>
              </div>
              <div className="reg-meta-row">
                <span className="reg-meta-key">Venue</span>
                <span className="reg-meta-val">GIMT Building, Room 408</span>
              </div>
              <div className="reg-meta-row">
                <span className="reg-meta-key">Prize</span>
                <span className="reg-meta-val">To Be Announced Soon</span>
              </div>
            </div>
          </aside>

          {/* ─── Form Area ─── */}
          <div className="reg-form-area" ref={formAreaRef}>
            {/* Mobile-only step indicator */}
            <div className="reg-mobile-steps">
              <StepNav
                currentStep={state.currentStep}
                completedSteps={state.completedSteps}
                variant="horizontal"
              />
            </div>

            <div className="reg-content-pane">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="reg-step-content">
                  {renderStep()}
                </div>
              </form>
            </div>

            {/* ─── Navigation ─── */}
            <div className="reg-nav-bar">
              <div className="reg-nav-left">
                {state.currentStep > 1 && (
                  <button
                    type="button"
                    className="reg-btn-prev"
                    onClick={handlePrev}
                    disabled={state.isSubmitting}
                  >
                    <span aria-hidden="true">←</span> Previous
                  </button>
                )}
              </div>
              <div className="reg-nav-right">
                {state.currentStep < 5 && (
                  <button
                    type="button"
                    className="lime-button reg-btn-next"
                    onClick={handleNext}
                  >
                    Continue <span aria-hidden="true">→</span>
                  </button>
                )}
                {state.currentStep === 5 && (
                  <button
                    type="submit"
                    className="lime-button reg-btn-next"
                    onClick={handleSubmit}
                    disabled={state.isSubmitting}
                    aria-busy={state.isSubmitting}
                  >
                    {state.isSubmitting ? (
                      <>
                        <span className="reg-btn-spinner" aria-hidden="true" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        SUBMIT <span aria-hidden="true">↗</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
