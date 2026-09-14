"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { RegistrationData } from "./page";

export interface RegisterResult {
  success: boolean;
  registrationId?: string | null;
  teamId?: string | null;
  error?: string;
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Server-side validator for registration data.
 * Returns an error string if invalid, or null if valid.
 */
function validateRegistrationData(data: RegistrationData): string | null {
  if (!data) return "Invalid submission data.";

  /* 01 — Personal */
  if (!data.fullName || typeof data.fullName !== "string" || !data.fullName.trim()) {
    return "Full name is required.";
  }
  if (!data.email || typeof data.email !== "string" || !data.email.trim()) {
    return "Email address is required.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    return "Please provide a valid email address.";
  }
  if (!data.phone || typeof data.phone !== "string" || !data.phone.trim()) {
    return "Phone number is required.";
  }
  const phoneRegex = /^[+\d][\d\s\-()]{7,}$/;
  if (!phoneRegex.test(data.phone.trim())) {
    return "Please provide a valid phone number.";
  }

  /* 02 — Academic */
  if (!data.institution || !data.institution.trim()) {
    return "University / Institution is required.";
  }
  if (!data.course || !data.course.trim()) {
    return "Course / Program is required.";
  }
  if (!data.department || !data.department.trim()) {
    return "Department is required.";
  }
  if (!data.year || !data.year.trim()) {
    return "Year / Semester is required.";
  }

  /* 03 — Team */
  if (!data.teamName || !data.teamName.trim()) {
    return "Team name is required.";
  }
  if (!Array.isArray(data.members) || data.members.length === 0) {
    return "At least one team member (Team Lead) is required.";
  }
  for (let i = 0; i < data.members.length; i++) {
    const member = data.members[i];
    if (!member || !member.name || !member.name.trim()) {
      return `Name is required for member ${i + 1}.`;
    }
  }

  /* 04 — Project */
  if (!data.projectTitle || !data.projectTitle.trim()) {
    return "Project title is required.";
  }
  if (!data.shortDescription || !data.shortDescription.trim()) {
    return "Short description is required.";
  }
  if (!data.problemAddressed || !data.problemAddressed.trim()) {
    return "Problem addressed is required.";
  }
  if (!data.proposedSolution || !data.proposedSolution.trim()) {
    return "Proposed solution is required.";
  }

  return null;
}

/**
 * Server Action to register a team and project in Supabase.
 * Executes transactional multi-table creation with rollback cleanup on failure.
 */
export async function submitRegistration(
  rawData: RegistrationData
): Promise<RegisterResult> {
  // 1. Server-side validation
  const validationError = validateRegistrationData(rawData);
  if (validationError) {
    return { success: false, error: validationError };
  }

  // 2. Normalize and sanitize data
  const data: RegistrationData = {
    fullName: rawData.fullName.trim(),
    email: rawData.email.trim().toLowerCase(),
    phone: rawData.phone.trim(),
    institution: rawData.institution.trim(),
    course: rawData.course.trim(),
    department: rawData.department.trim(),
    year: rawData.year.trim(),
    teamName: rawData.teamName.trim(),
    members: rawData.members.map((m, idx) => ({
      name: m.name.trim(),
      role: m.role ? m.role.trim() : idx === 0 ? "Team Lead" : "Member",
    })),
    projectTitle: rawData.projectTitle.trim(),
    shortDescription: rawData.shortDescription.trim(),
    problemAddressed: rawData.problemAddressed.trim(),
    proposedSolution: rawData.proposedSolution.trim(),
    problemStatement: rawData.problemStatement ? rawData.problemStatement.trim() : "",
  };

  console.log("[Supabase Server Config]", {
    urlPresent: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    publishableKeyPresent: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ),
    serviceRoleKeyPresent: Boolean(
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ),
  });

  let supabase;
  try {
    supabase = getSupabaseServerClient();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database client initialization failed";
    console.error("[Registration Server Action] Config Error:", msg);
    return {
      success: false,
      error: `Service configuration error: ${msg}`,
    };
  }

  // Track created resources for rollback on failure
  let createdTeamId: string | null = null;

  try {
    // 3. Prevent duplicate submissions: check if team name already exists
    const { data: existingTeams, error: checkError } = await supabase
      .from("teams")
      .select("id, team_name")
      .ilike("team_name", data.teamName)
      .limit(1);

    if (!checkError && existingTeams && existingTeams.length > 0) {
      return {
        success: false,
        error: `A team named "${data.teamName}" is already registered. Please choose a different team name.`,
      };
    }

    // 4. Create Team record in `teams` table (CHECK status IN ('draft', 'submitted'))
    const teamResult = await supabase
      .from("teams")
      .insert({
        team_name: data.teamName,
        status: "submitted",
      })
      .select("id, team_name")
      .single();

    if (teamResult.error || !teamResult.data) {
      console.error("[Registration] Team creation error:", teamResult.error);
      if (teamResult.error?.code === "42501") {
        throw new Error("RLS_ERROR: Database Row-Level Security policy prevented creating team record.");
      }
      throw new Error(teamResult.error?.message || "Failed to create team record.");
    }

    createdTeamId = teamResult.data.id;

    // 5. Create Members records in `members` table (with is_team_leader: index === 0)
    const membersPayload = data.members.map((member, index) => ({
      team_id: createdTeamId,
      full_name: member.name,
      email: index === 0 ? data.email : null,
      phone: index === 0 ? data.phone : null,
      university: data.institution,
      course: data.course,
      department: data.department,
      year: data.year,
      is_team_leader: index === 0,
    }));

    const membersResult = await supabase
      .from("members")
      .insert(membersPayload)
      .select("id, full_name");

    if (membersResult.error) {
      console.error("[Registration] Members creation error:", membersResult.error);
      if (membersResult.error?.code === "42501") {
        throw new Error("RLS_ERROR: Database Row-Level Security policy prevented creating member records.");
      }
      throw new Error(membersResult.error?.message || "Failed to create team members.");
    }

    // 6. Create Project record in `projects` table
    const problemStatementId = UUID_REGEX.test(data.problemStatement)
      ? data.problemStatement
      : null;

    const projectPayload = {
      team_id: createdTeamId,
      title: data.projectTitle,
      description: data.shortDescription,
      problem: data.problemAddressed,
      solution: data.proposedSolution,
      problem_statement_id: problemStatementId,
    };

    const projectResult = await supabase
      .from("projects")
      .insert(projectPayload)
      .select("id, title")
      .single();

    if (projectResult.error || !projectResult.data) {
      console.error("[Registration] Project creation error:", projectResult.error);
      if (projectResult.error?.code === "42501") {
        throw new Error("RLS_ERROR: Database Row-Level Security policy prevented creating project record.");
      }
      throw new Error(projectResult.error?.message || "Failed to create project record.");
    }

    // 7. Create Registration record in `registrations` table (CHECK status IN ('submitted', 'under_review', 'shortlisted', 'rejected'))
    const registrationResult = await supabase
      .from("registrations")
      .insert({
        team_id: createdTeamId,
        status: "submitted",
        submitted_at: new Date().toISOString(),
      })
      .select("id, status")
      .single();

    if (registrationResult.error || !registrationResult.data) {
      console.error("[Registration] Registration record creation error:", registrationResult.error);
      if (registrationResult.error?.code === "42501") {
        throw new Error("RLS_ERROR: Database Row-Level Security policy prevented creating registration record.");
      }
      throw new Error(registrationResult.error?.message || "Failed to create registration record.");
    }

    const registrationId = registrationResult.data.id;

    return {
      success: true,
      registrationId,
      teamId: createdTeamId,
    };
  } catch (error: unknown) {
    console.error("[Registration Submission Error]:", error);

    // Rollback cleanup in reverse foreign key dependency order
    if (createdTeamId) {
      try {
        console.warn(`[Registration Rollback] Cleaning up orphaned team ${createdTeamId}`);
        await supabase.from("registrations").delete().eq("team_id", createdTeamId);
        await supabase.from("projects").delete().eq("team_id", createdTeamId);
        await supabase.from("members").delete().eq("team_id", createdTeamId);
        await supabase.from("teams").delete().eq("id", createdTeamId);
      } catch (cleanupErr) {
        console.error("[Registration Rollback Error]:", cleanupErr);
      }
    }

    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[Registration Detailed Error]:", errorMsg);

    if (errorMsg.startsWith("RLS_ERROR")) {
      return {
        success: false,
        error:
          "Database permission error: Table access is restricted by Row Level Security. Please verify Supabase INSERT policies or configure SUPABASE_SERVICE_ROLE_KEY.",
      };
    }

    return {
      success: false,
      error: errorMsg.includes("duplicate key") || errorMsg.includes("already registered")
        ? "A team or registration with these details already exists."
        : "Something went wrong while submitting your registration. Please check your connection and try again.",
    };
  }
}
