import db from "./index";
import { hashPassword } from "../auth";
import type {
  User,
  UserRole,
  CreateUserInput,
  UpdateUserInput,
  Profile,
  ProfileWithUser,
  ProfileInput,
  ProfileUpdateInput,
  FYPStudent,
  FYPStudentWithProfile,
  FYPStudentInput,
  FYPStudentUpdateInput,
  Paper,
  PaperWithAuthor,
  PaperInput,
  PaperUpdateInput,
  CommunityMember,
  CommunityMemberInput,
  CommunityMemberUpdateInput,
} from "@/app/types";

// ============================================================================
// User Management
// ============================================================================

export async function createUser(
  input: CreateUserInput,
): Promise<{ id: number }> {
  const hashedPassword = await hashPassword(input.password);
  const stmt = db.prepare(`
    INSERT INTO users (email, password, role)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(input.email, hashedPassword, input.role);
  return { id: Number(result.lastInsertRowid) };
}

export function getUserById(id: number): User | null {
  const stmt = db.prepare(`
    SELECT id, email, role, created_at, updated_at
    FROM users
    WHERE id = ?
  `);
  const user = stmt.get(id);
  return user ? (user as User) : null;
}

export function getUserByEmail(email: string): User | null {
  const stmt = db.prepare(`
    SELECT id, email, role, created_at, updated_at
    FROM users
    WHERE email = ?
  `);
  const user = stmt.get(email);
  return user ? (user as User) : null;
}

export function getAllUsers(): User[] {
  const stmt = db.prepare(`
    SELECT id, email, role, created_at, updated_at
    FROM users
    ORDER BY created_at DESC
  `);
  return stmt.all() as User[];
}

export function getUsersByRole(role: UserRole): User[] {
  const stmt = db.prepare(`
    SELECT id, email, role, created_at, updated_at
    FROM users
    WHERE role = ?
    ORDER BY created_at DESC
  `);
  return stmt.all(role) as User[];
}

export function deleteUser(id: number): void {
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  stmt.run(id);
}

export async function updateUserPassword(
  id: number,
  newPassword: string,
): Promise<void> {
  const hashedPassword = await hashPassword(newPassword);
  const stmt = db.prepare(`
    UPDATE users
    SET password = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  stmt.run(hashedPassword, id);
}

// ============================================================================
// Profile Management
// ============================================================================

export function createProfile(input: ProfileInput): { id: number } {
  const stmt = db.prepare(`
    INSERT INTO profiles (user_id, name, bio, profile_picture)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(
    input.userId,
    input.name,
    input.bio || null,
    input.profilePicture || null,
  );
  return { id: Number(result.lastInsertRowid) };
}

export function updateProfile(userId: number, input: ProfileUpdateInput): void {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (input.name !== undefined) {
    fields.push("name = ?");
    values.push(input.name);
  }
  if (input.bio !== undefined) {
    fields.push("bio = ?");
    values.push(input.bio || null);
  }
  if (input.profilePicture !== undefined) {
    fields.push("profile_picture = ?");
    values.push(input.profilePicture || null);
  }

  if (fields.length === 0) return;

  fields.push("updated_at = CURRENT_TIMESTAMP");
  values.push(userId);

  const stmt = db.prepare(`
    UPDATE profiles
    SET ${fields.join(", ")}
    WHERE user_id = ?
  `);
  stmt.run(...values);
}

export function getProfileByUserId(userId: number): ProfileWithUser | null {
  const stmt = db.prepare(`
    SELECT p.*, u.email, u.role
    FROM profiles p
    JOIN users u ON p.user_id = u.id
    WHERE p.user_id = ?
  `);
  const profile = stmt.get(userId);
  return profile ? (profile as ProfileWithUser) : null;
}

export function getAllProfiles(): ProfileWithUser[] {
  const stmt = db.prepare(`
    SELECT p.*, u.email, u.role
    FROM profiles p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `);
  return stmt.all() as ProfileWithUser[];
}

export function deleteProfile(userId: number): void {
  const stmt = db.prepare("DELETE FROM profiles WHERE user_id = ?");
  stmt.run(userId);
}

// ============================================================================
// FYP Students Management
// ============================================================================

export function createFYPStudent(input: FYPStudentInput): { id: number } {
  const stmt = db.prepare(`
    INSERT INTO fyp_students (user_id, idea_description, project_title, year, status)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    input.userId,
    input.ideaDescription || null,
    input.projectTitle || null,
    input.year || null,
    input.status || "ongoing",
  );
  return { id: Number(result.lastInsertRowid) };
}

export function updateFYPStudent(
  userId: number,
  input: FYPStudentUpdateInput,
): void {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (input.ideaDescription !== undefined) {
    fields.push("idea_description = ?");
    values.push(input.ideaDescription || null);
  }
  if (input.projectTitle !== undefined) {
    fields.push("project_title = ?");
    values.push(input.projectTitle || null);
  }
  if (input.year !== undefined) {
    fields.push("year = ?");
    values.push(input.year || null);
  }
  if (input.status !== undefined) {
    fields.push("status = ?");
    values.push(input.status);
  }

  if (fields.length === 0) return;

  fields.push("updated_at = CURRENT_TIMESTAMP");
  values.push(userId);

  const stmt = db.prepare(`
    UPDATE fyp_students
    SET ${fields.join(", ")}
    WHERE user_id = ?
  `);
  stmt.run(...values);
}

export function getFYPStudentByUserId(
  userId: number,
): FYPStudentWithProfile | null {
  const stmt = db.prepare(`
    SELECT f.*, p.name, p.bio, p.profile_picture, u.email
    FROM fyp_students f
    JOIN users u ON f.user_id = u.id
    LEFT JOIN profiles p ON f.user_id = p.user_id
    WHERE f.user_id = ?
  `);
  const student = stmt.get(userId);
  return student ? (student as FYPStudentWithProfile) : null;
}

export function getAllFYPStudents(): FYPStudentWithProfile[] {
  const stmt = db.prepare(`
    SELECT f.*, p.name, p.bio, p.profile_picture, u.email
    FROM fyp_students f
    JOIN users u ON f.user_id = u.id
    LEFT JOIN profiles p ON f.user_id = p.user_id
    ORDER BY f.created_at DESC
  `);
  return stmt.all() as FYPStudentWithProfile[];
}

export function deleteFYPStudent(userId: number): void {
  const stmt = db.prepare("DELETE FROM fyp_students WHERE user_id = ?");
  stmt.run(userId);
}

// ============================================================================
// Papers Management (for Research Assistants)
// ============================================================================

export function createPaper(input: PaperInput): { id: number } {
  const stmt = db.prepare(`
    INSERT INTO papers (user_id, title, url, description, published_date)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    input.userId,
    input.title,
    input.url,
    input.description || null,
    input.publishedDate || null,
  );
  return { id: Number(result.lastInsertRowid) };
}

export function updatePaper(id: number, input: PaperUpdateInput): void {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (input.title !== undefined) {
    fields.push("title = ?");
    values.push(input.title);
  }
  if (input.url !== undefined) {
    fields.push("url = ?");
    values.push(input.url);
  }
  if (input.description !== undefined) {
    fields.push("description = ?");
    values.push(input.description || null);
  }
  if (input.publishedDate !== undefined) {
    fields.push("published_date = ?");
    values.push(input.publishedDate || null);
  }

  if (fields.length === 0) return;

  fields.push("updated_at = CURRENT_TIMESTAMP");
  values.push(id);

  const stmt = db.prepare(`
    UPDATE papers
    SET ${fields.join(", ")}
    WHERE id = ?
  `);
  stmt.run(...values);
}

export function deletePaper(id: number): void {
  const stmt = db.prepare("DELETE FROM papers WHERE id = ?");
  stmt.run(id);
}

export function getPapersByUserId(userId: number): PaperWithAuthor[] {
  const stmt = db.prepare(`
    SELECT p.*, u.email, pr.name as author_name
    FROM papers p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN profiles pr ON p.user_id = pr.user_id
    WHERE p.user_id = ?
    ORDER BY p.created_at DESC
  `);
  return stmt.all(userId) as PaperWithAuthor[];
}

export function getAllPapers(): PaperWithAuthor[] {
  const stmt = db.prepare(`
    SELECT p.*, u.email, pr.name as author_name
    FROM papers p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN profiles pr ON p.user_id = pr.user_id
    ORDER BY p.created_at DESC
  `);
  return stmt.all() as PaperWithAuthor[];
}

export function getPaperById(id: number): PaperWithAuthor | null {
  const stmt = db.prepare(`
    SELECT p.*, u.email, pr.name as author_name
    FROM papers p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN profiles pr ON p.user_id = pr.user_id
    WHERE p.id = ?
  `);
  const paper = stmt.get(id);
  return paper ? (paper as PaperWithAuthor) : null;
}

// ============================================================================
// Research Assistants
// ============================================================================

export function getAllResearchAssistants(): ProfileWithUser[] {
  const stmt = db.prepare(`
    SELECT p.*, u.email, u.id as user_id, u.role
    FROM profiles p
    JOIN users u ON p.user_id = u.id
    WHERE u.role = 'research_assistant'
    ORDER BY p.created_at DESC
  `);
  return stmt.all() as ProfileWithUser[];
}

// ============================================================================
// Community Members Management (Supervisor only)
// ============================================================================

export function createCommunityMember(input: CommunityMemberInput): {
  id: number;
} {
  const stmt = db.prepare(`
    INSERT INTO community_members (
      name, email, role_in_community, bio, profile_picture,
      linkedin_url, github_url, website_url, joined_date, is_active
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    input.name,
    input.email,
    input.roleInCommunity || null,
    input.bio || null,
    input.profilePicture || null,
    input.linkedinUrl || null,
    input.githubUrl || null,
    input.websiteUrl || null,
    input.joinedDate || new Date().toISOString().split("T")[0],
    input.isActive !== undefined ? (input.isActive ? 1 : 0) : 1,
  );
  return { id: Number(result.lastInsertRowid) };
}

export function updateCommunityMember(
  id: number,
  input: CommunityMemberUpdateInput,
): void {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (input.name !== undefined) {
    fields.push("name = ?");
    values.push(input.name);
  }
  if (input.email !== undefined) {
    fields.push("email = ?");
    values.push(input.email);
  }
  if (input.roleInCommunity !== undefined) {
    fields.push("role_in_community = ?");
    values.push(input.roleInCommunity || null);
  }
  if (input.bio !== undefined) {
    fields.push("bio = ?");
    values.push(input.bio || null);
  }
  if (input.profilePicture !== undefined) {
    fields.push("profile_picture = ?");
    values.push(input.profilePicture || null);
  }
  if (input.linkedinUrl !== undefined) {
    fields.push("linkedin_url = ?");
    values.push(input.linkedinUrl || null);
  }
  if (input.githubUrl !== undefined) {
    fields.push("github_url = ?");
    values.push(input.githubUrl || null);
  }
  if (input.websiteUrl !== undefined) {
    fields.push("website_url = ?");
    values.push(input.websiteUrl || null);
  }
  if (input.joinedDate !== undefined) {
    fields.push("joined_date = ?");
    values.push(input.joinedDate || null);
  }
  if (input.isActive !== undefined) {
    fields.push("is_active = ?");
    values.push(input.isActive ? 1 : 0);
  }

  if (fields.length === 0) return;

  fields.push("updated_at = CURRENT_TIMESTAMP");
  values.push(id);

  const stmt = db.prepare(`
    UPDATE community_members
    SET ${fields.join(", ")}
    WHERE id = ?
  `);
  stmt.run(...values);
}

export function deleteCommunityMember(id: number): void {
  const stmt = db.prepare("DELETE FROM community_members WHERE id = ?");
  stmt.run(id);
}

export function getCommunityMemberById(id: number): CommunityMember | null {
  const stmt = db.prepare("SELECT * FROM community_members WHERE id = ?");
  const member = stmt.get(id);
  return member ? (member as CommunityMember) : null;
}

export function getAllCommunityMembers(
  activeOnly: boolean = false,
): CommunityMember[] {
  const query = activeOnly
    ? "SELECT * FROM community_members WHERE is_active = 1 ORDER BY joined_date DESC"
    : "SELECT * FROM community_members ORDER BY joined_date DESC";
  const stmt = db.prepare(query);
  return stmt.all() as CommunityMember[];
}
