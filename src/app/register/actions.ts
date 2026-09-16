"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { RegistrationData } from "./page";
import { problemStatements } from "@/data/problemStatements";

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
  if (!data.course || !data.course.trim()) {
    return "Course / Program is required.";
  }
  if (!data.semester || !data.semester.trim()) {
    return "Semester is required.";
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
  if (!data.problemStatementId) {
    return "Please select a problem statement.";
  }
  
  if (data.uploadedFileName) {
    const validExtensions = ['.ppt', '.pptx', '.pdf'];
    const isExtensionValid = validExtensions.some(ext => data.uploadedFileName!.toLowerCase().endsWith(ext));
    if (!isExtensionValid) {
      return "Only PPT, PPTX, and PDF files are allowed.";
    }
  }

  return null;
}

/**
 * Server Action to register a team and project in Supabase.
 * Executes transactional multi-table creation with rollback cleanup on failure.
 */
export async function submitRegistration(
  formData: FormData
): Promise<RegisterResult> {
  const rawDataString = formData.get("data") as string;
  if (!rawDataString) return { success: false, error: "Missing data payload." };
  
  let rawData: RegistrationData & { uploadedFilePath?: string; uploadedFileName?: string };
  try {
    rawData = JSON.parse(rawDataString);
  } catch {
    return { success: false, error: "Invalid data payload format." };
  }

  // 1. Server-side validation
  const validationError = validateRegistrationData(rawData);
  if (validationError) {
    return { success: false, error: validationError };
  }

  // 2. Normalize and sanitize data
  const data: RegistrationData & { uploadedFilePath?: string; uploadedFileName?: string } = {
    fullName: rawData.fullName.trim(),
    email: rawData.email.trim().toLowerCase(),
    phone: rawData.phone.trim(),
    course: rawData.course.trim(),
    semester: rawData.semester.trim(),
    teamName: rawData.teamName.trim(),
    members: rawData.members.map((m, idx) => ({
      name: m.name.trim(),
      role: m.role ? m.role.trim() : idx === 0 ? "Team Lead" : "Member",
    })),
    problemStatementId: rawData.problemStatementId,
    projectFile: rawData.projectFile,
    uploadedFilePath: rawData.uploadedFilePath,
    uploadedFileName: rawData.uploadedFileName,
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
  let createdRegistrationId: string | null = null;
  let createdProjectId: string | null = null;
  let createdMemberIds: string[] = [];

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

    // 4. Create Team record in `teams` table
    const teamResult = await supabase
      .from("teams")
      .insert({
        team_name: data.teamName,
        status: "submitted",
      })
      .select("id, team_name")
      .single();

    if (teamResult.error || !teamResult.data) {
      console.error("[REGISTRATION][TEAM]", {
        message: teamResult.error?.message,
        code: teamResult.error?.code,
        details: teamResult.error?.details,
        hint: teamResult.error?.hint,
      });
      if (teamResult.error?.code === "42501") {
        throw new Error("RLS_ERROR: Database Row-Level Security policy prevented creating team record.");
      }
      throw new Error(teamResult.error?.message || "Failed to create team record.");
    }
    
    createdTeamId = teamResult.data.id;
    console.log("[Trace] Team created:", createdTeamId);

    // 5. Create Members records in `members` table
    const membersPayload = data.members.map((member, index) => ({
      team_id: createdTeamId,
      full_name: member.name,
      email: index === 0 ? data.email : null,
      phone: index === 0 ? data.phone : null,
      course: data.course,
      semester: data.semester,
      is_team_leader: index === 0,
    }));

    const membersResult = await supabase
      .from("members")
      .insert(membersPayload)
      .select("id, full_name");

    if (membersResult.error) {
      console.error("[REGISTRATION][MEMBERS]", {
        message: membersResult.error?.message,
        code: membersResult.error?.code,
        details: membersResult.error?.details,
        hint: membersResult.error?.hint,
      });
      if (membersResult.error?.code === "42501") {
        throw new Error("RLS_ERROR: Database Row-Level Security policy prevented creating member records.");
      }
      throw new Error(membersResult.error?.message || "Failed to create team members.");
    }
    
    createdMemberIds = membersResult.data.map(m => m.id);
    console.log("[Trace] Members created for team:", createdTeamId, "Member IDs:", createdMemberIds);

    // 6. Create Project record in `projects` table
    let dbProblemStatementId: string | null = null;
    if (data.problemStatementId && data.problemStatementId !== "IF26-12") {
      const selectedPs = problemStatements.find(ps => ps.id === data.problemStatementId);
      if (!selectedPs) {
        throw new Error("DB_ERROR: Invalid problem statement selected.");
      }
      
      const { data: dbPs, error: psError } = await supabase
        .from("problem_statements")
        .select("id")
        .eq("title", selectedPs.title)
        .single();
        
      if (psError || !dbPs) {
        console.error("[REGISTRATION][PROJECT] Problem statement lookup error:", {
          message: psError?.message,
          code: psError?.code,
          details: psError?.details,
          hint: psError?.hint,
        });
        throw new Error("DB_ERROR: Selected problem statement not found in the database.");
      }
      dbProblemStatementId = dbPs.id;
    }

    const projectPayload = {
      team_id: createdTeamId,
      problem_statement_id: dbProblemStatementId,
    };

    const projectResult = await supabase
      .from("projects")
      .insert(projectPayload)
      .select("id")
      .single();

    if (projectResult.error || !projectResult.data) {
      console.error("[REGISTRATION][PROJECT]", {
        message: projectResult.error?.message,
        code: projectResult.error?.code,
        details: projectResult.error?.details,
        hint: projectResult.error?.hint,
      });
      if (projectResult.error?.code === "42501") {
        throw new Error("RLS_ERROR: Database Row-Level Security policy prevented creating project record.");
      }
      throw new Error(projectResult.error?.message || "Failed to create project record.");
    }
    
    createdProjectId = projectResult.data.id;
    console.log("[Trace] Project created:", createdProjectId);

    // 7. Create Registration record in `registrations` table
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
      console.error("[REGISTRATION][REGISTRATION]", {
        message: registrationResult.error?.message,
        code: registrationResult.error?.code,
        details: registrationResult.error?.details,
        hint: registrationResult.error?.hint,
      });
      if (registrationResult.error?.code === "42501") {
        throw new Error("RLS_ERROR: Database Row-Level Security policy prevented creating registration record.");
      }
      // Check for double submission / unique constraint
      if (registrationResult.error?.code === "23505") {
        throw new Error("DB_ERROR_23505: Registration for this team already exists.");
      }
      throw new Error(registrationResult.error?.message || "Failed to create registration record.");
    }

    createdRegistrationId = registrationResult.data.id;
    console.log("[Trace] Registration created:", createdRegistrationId);

    // 8. Store file metadata in database if a file was uploaded
    const uploadedFilePath = data.uploadedFilePath;
    const uploadedFileName = data.uploadedFileName;
    
    if (uploadedFilePath && uploadedFileName) {
      const fileRecordPayload = {
        registration_id: createdRegistrationId,
        team_id: createdTeamId,
        file_name: uploadedFileName,
        storage_path: uploadedFilePath,
      };
      
      console.log("[Trace] Inserting registration_files:", fileRecordPayload);

      // Verify null/undefined explicitly before insert
      if (!createdRegistrationId || !createdTeamId) {
        throw new Error(`DB_ERROR: Missing essential IDs. registrationId=${createdRegistrationId}, teamId=${createdTeamId}`);
      }
      if (!uploadedFileName || !uploadedFilePath) {
        throw new Error(`DB_ERROR: Missing file details. file_name=${uploadedFileName}, storage_path=${uploadedFilePath}`);
      }

      const fileRecordResult = await supabase
        .from("registration_files")
        .insert(fileRecordPayload);

      if (fileRecordResult.error) {
        console.error("[REGISTRATION][FILE_METADATA]", {
          message: fileRecordResult.error.message,
          code: fileRecordResult.error.code,
          details: fileRecordResult.error.details,
          hint: fileRecordResult.error.hint
        });
        
        if (fileRecordResult.error.code === "23503") {
          throw new Error(`DB_ERROR_23503: Foreign key violation in registration_files. Details: ${fileRecordResult.error.details || fileRecordResult.error.message}`);
        }
        
        throw new Error(`DB_ERROR: Failed to save file metadata: ${fileRecordResult.error.message} (Code: ${fileRecordResult.error.code})`);
      }
      console.log("[Trace] registration_files insert SUCCESS.");
    }

    return {
      success: true,
      registrationId: createdRegistrationId,
      teamId: createdTeamId,
    };
  } catch (error: unknown) {
    console.error("[Registration Submission Error]:", error);

    // Rollback cleanup in reverse foreign key dependency order
    try {
      console.warn(`[Registration Rollback] Cleaning up orphaned records and files`);
      // Clean up uploaded file if it exists
      if (data.uploadedFilePath) {
        const { error: storageError } = await supabase.storage.from("ideaforge-submissions").remove([data.uploadedFilePath]);
        if (storageError) {
          console.error("[REGISTRATION][STORAGE]", {
            message: storageError.message,
            code: storageError.code,
          });
        }
      }
      
      if (createdTeamId) {
        const _ = await supabase.from("registration_files").delete().eq("team_id", createdTeamId);
        await supabase.from("registrations").delete().eq("team_id", createdTeamId);
        await supabase.from("projects").delete().eq("team_id", createdTeamId);
        await supabase.from("members").delete().eq("team_id", createdTeamId);
        await supabase.from("teams").delete().eq("id", createdTeamId);
      }
    } catch (cleanupErr) {
      console.error("[REGISTRATION][ROLLBACK]", cleanupErr);
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
    
    // Explicitly do NOT hide DB errors that start with DB_ERROR
    if (errorMsg.startsWith("DB_ERROR")) {
      return {
        success: false,
        error: errorMsg,
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

export async function getUploadUrl(
  filename: string,
  filesize: number
): Promise<{ success: boolean; token?: string; path?: string; error?: string; signedUrl?: string }> {
  try {
    if (filesize > 1048576) {
      return { success: false, error: "File size must be 1 MB or smaller." };
    }
    const validExtensions = ['.ppt', '.pptx', '.pdf'];
    const isExtensionValid = validExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    if (!isExtensionValid) {
      return { success: false, error: "Only PPT, PPTX, and PDF files are allowed." };
    }

    const supabase = getSupabaseServerClient();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filePath = `uploads/${Date.now()}_${Math.random().toString(36).substring(7)}_${sanitizedFilename}`;

    const { data, error } = await supabase.storage
      .from("ideaforge-submissions")
      .createSignedUploadUrl(filePath);

    if (error) {
      console.error("[getUploadUrl] Error:", error);
      return { success: false, error: "Could not generate upload URL." };
    }

    return {
      success: true,
      token: data.token,
      path: data.path,
      signedUrl: data.signedUrl,
    };
  } catch (err) {
    console.error("[getUploadUrl] Server Exception:", err);
    return { success: false, error: "Internal server error during URL generation." };
  }
}
