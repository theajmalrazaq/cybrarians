/**
 * Admin Panel Constants
 * Centralized configuration for the admin panel
 */

// ============================================================================
// Routes
// ============================================================================

export const ROUTES = {
  // Public
  HOME: "/",

  // Admin
  ADMIN_LOGIN: "/x9z2k8w5q",
  ADMIN_DASHBOARD: "/x9z2k8w5q/dashboard",
  ADMIN_PROFILE: "/x9z2k8w5q/dashboard/profile",
  ADMIN_PAPERS: "/x9z2k8w5q/dashboard/papers",
  ADMIN_USERS: "/x9z2k8w5q/dashboard/users",
  ADMIN_FYP_STUDENTS: "/x9z2k8w5q/dashboard/fyp-students",
  ADMIN_RESEARCH_ASSISTANTS: "/x9z2k8w5q/dashboard/research-assistants",
  ADMIN_COMMUNITY: "/x9z2k8w5q/dashboard/community",
} as const;

export const API_ROUTES = {
  LOGIN: "/x9z2k8w5q/api/login",
  LOGOUT: "/x9z2k8w5q/api/logout",
  PROFILE: "/x9z2k8w5q/api/profile",
  PAPERS: "/x9z2k8w5q/api/papers",
  USERS: "/x9z2k8w5q/api/users",
  COMMUNITY: "/x9z2k8w5q/api/community",
} as const;

// ============================================================================
// User Roles
// ============================================================================

export const USER_ROLES = {
  SUPERVISOR: "supervisor",
  RESEARCH_ASSISTANT: "research_assistant",
  FYP_STUDENT: "fyp_student",
} as const;

export const ROLE_LABELS = {
  [USER_ROLES.SUPERVISOR]: "Supervisor",
  [USER_ROLES.RESEARCH_ASSISTANT]: "Research Assistant",
  [USER_ROLES.FYP_STUDENT]: "FYP Student",
} as const;

export const ROLE_COLORS = {
  [USER_ROLES.SUPERVISOR]: "bg-purple-100 text-purple-800",
  [USER_ROLES.RESEARCH_ASSISTANT]: "bg-blue-100 text-blue-800",
  [USER_ROLES.FYP_STUDENT]: "bg-green-100 text-green-800",
} as const;

// ============================================================================
// FYP Project Status
// ============================================================================

export const FYP_STATUS = {
  ONGOING: "ongoing",
  COMPLETED: "completed",
  ON_HOLD: "on_hold",
} as const;

export const FYP_STATUS_LABELS = {
  [FYP_STATUS.ONGOING]: "Ongoing",
  [FYP_STATUS.COMPLETED]: "Completed",
  [FYP_STATUS.ON_HOLD]: "On Hold",
} as const;

export const FYP_STATUS_COLORS = {
  [FYP_STATUS.ONGOING]: "bg-blue-100 text-blue-800",
  [FYP_STATUS.COMPLETED]: "bg-green-100 text-green-800",
  [FYP_STATUS.ON_HOLD]: "bg-yellow-100 text-yellow-800",
} as const;

// ============================================================================
// Validation
// ============================================================================

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL_REGEX: /^https?:\/\/.+/,
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_URL: "Please enter a valid URL",
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
  PASSWORDS_DONT_MATCH: "Passwords do not match",
} as const;

// ============================================================================
// Session
// ============================================================================

export const SESSION = {
  COOKIE_NAME: "session",
  DURATION_MS: 7 * 24 * 60 * 60 * 1000, // 7 days
  DURATION_SECONDS: 7 * 24 * 60 * 60, // 7 days
} as const;

// ============================================================================
// Database
// ============================================================================

export const DATABASE = {
  PATH: "data/cybrarians.db",
  BACKUP_PREFIX: "backup-",
} as const;

// ============================================================================
// UI Messages
// ============================================================================

export const MESSAGES = {
  // Success
  USER_CREATED: "User created successfully",
  USER_UPDATED: "User updated successfully",
  USER_DELETED: "User deleted successfully",
  PROFILE_UPDATED: "Profile updated successfully",
  PAPER_CREATED: "Paper added successfully",
  PAPER_UPDATED: "Paper updated successfully",
  PAPER_DELETED: "Paper deleted successfully",
  COMMUNITY_MEMBER_CREATED: "Community member added successfully",
  COMMUNITY_MEMBER_UPDATED: "Community member updated successfully",
  COMMUNITY_MEMBER_DELETED: "Community member deleted successfully",
  LOGIN_SUCCESS: "Logged in successfully",
  LOGOUT_SUCCESS: "Logged out successfully",

  // Errors
  LOGIN_FAILED: "Invalid email or password",
  UNAUTHORIZED: "You are not authorized to perform this action",
  NOT_FOUND: "Resource not found",
  ALREADY_EXISTS: "A record with this information already exists",
  VALIDATION_FAILED: "Please check your input and try again",
  GENERIC_ERROR: "An error occurred. Please try again.",
  CANNOT_DELETE_SELF: "You cannot delete your own account",

  // Confirmations
  CONFIRM_DELETE_USER:
    "Are you sure you want to delete this user? This action cannot be undone.",
  CONFIRM_DELETE_PAPER: "Are you sure you want to delete this paper?",
  CONFIRM_DELETE_COMMUNITY_MEMBER:
    "Are you sure you want to delete this community member?",
} as const;

// ============================================================================
// Pagination & Limits
// ============================================================================

export const LIMITS = {
  PAPERS_PER_PAGE: 10,
  USERS_PER_PAGE: 20,
  RECENT_ITEMS: 5,
} as const;

// ============================================================================
// Security
// ============================================================================

export const SECURITY = {
  BCRYPT_ROUNDS: 10,
  JWT_ALGORITHM: "HS256",
  DEFAULT_JWT_SECRET: "your-secret-key-change-in-production",
} as const;

// ============================================================================
// Feature Flags (for future extensibility)
// ============================================================================

export const FEATURES = {
  ENABLE_EMAIL_NOTIFICATIONS: false,
  ENABLE_FILE_UPLOADS: false,
  ENABLE_TWO_FACTOR_AUTH: false,
  ENABLE_AUDIT_LOG: false,
} as const;
