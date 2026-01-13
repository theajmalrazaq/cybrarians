// User and Authentication Types
export type UserRole = "supervisor" | "research_assistant" | "fyp_student";

export interface User {
  id: number;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface SessionPayload {
  userId: number;
  email: string;
  role: UserRole;
  expiresAt: Date;
}

// Profile Types
export interface Profile {
  id: number;
  user_id: number;
  name: string;
  bio: string | null;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileWithUser extends Profile {
  email: string;
  role: UserRole;
}

export interface ProfileInput {
  userId: number;
  name: string;
  bio?: string;
  profilePicture?: string;
}

export interface ProfileUpdateInput {
  name?: string;
  bio?: string;
  profilePicture?: string;
}

// FYP Student Types
export type FYPStatus = "ongoing" | "completed" | "on_hold";

export interface FYPStudent {
  id: number;
  user_id: number;
  idea_description: string | null;
  project_title: string | null;
  year: string | null;
  status: FYPStatus;
  created_at: string;
  updated_at: string;
}

export interface FYPStudentWithProfile extends FYPStudent {
  name: string | null;
  bio: string | null;
  profile_picture: string | null;
  email: string;
}

export interface FYPStudentInput {
  userId: number;
  ideaDescription?: string;
  projectTitle?: string;
  year?: string;
  status?: FYPStatus;
}

export interface FYPStudentUpdateInput {
  ideaDescription?: string;
  projectTitle?: string;
  year?: string;
  status?: FYPStatus;
}

// Paper Types
export interface Paper {
  id: number;
  user_id: number;
  title: string;
  url: string;
  description: string | null;
  published_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaperWithAuthor extends Paper {
  email: string;
  author_name: string | null;
}

export interface PaperInput {
  userId: number;
  title: string;
  url: string;
  description?: string;
  publishedDate?: string;
}

export interface PaperUpdateInput {
  title?: string;
  url?: string;
  description?: string;
  publishedDate?: string;
}

// Community Member Types
export interface CommunityMember {
  id: number;
  name: string;
  email: string;
  role_in_community: string | null;
  bio: string | null;
  profile_picture: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  website_url: string | null;
  joined_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommunityMemberInput {
  name: string;
  email: string;
  roleInCommunity?: string;
  bio?: string;
  profilePicture?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  joinedDate?: string;
  isActive?: boolean;
}

export interface CommunityMemberUpdateInput {
  name?: string;
  email?: string;
  roleInCommunity?: string;
  bio?: string;
  profilePicture?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  joinedDate?: string;
  isActive?: boolean;
}

// API Response Types
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data?: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// Database Service Types
export interface CreateUserInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserInput {
  email?: string;
  password?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number;
  totalFYP: number;
  totalRA: number;
  totalCommunity: number;
  recentUsers: User[];
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface ProfileFormData {
  name: string;
  bio: string;
  profilePicture: string;
}

export interface FYPFormData extends ProfileFormData {
  projectTitle: string;
  ideaDescription: string;
  year: string;
  status: FYPStatus;
}

export interface PaperFormData {
  title: string;
  url: string;
  description: string;
  publishedDate: string;
}

export interface CommunityMemberFormData {
  name: string;
  email: string;
  roleInCommunity: string;
  bio: string;
  profilePicture: string;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  joinedDate: string;
  isActive: boolean;
}
