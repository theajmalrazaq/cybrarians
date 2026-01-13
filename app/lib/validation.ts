/**
 * Validation utilities for form inputs and data
 */

import { VALIDATION, VALIDATION_MESSAGES } from "./constants";
import type { UserRole } from "@/app/types";

// ============================================================================
// Type Guards
// ============================================================================

export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL_REGEX.test(email);
}

export function isValidUrl(url: string): boolean {
  return VALIDATION.URL_REGEX.test(url);
}

export function isValidRole(role: string): role is UserRole {
  return ["supervisor", "research_assistant", "fyp_student"].includes(role);
}

// ============================================================================
// Validation Results
// ============================================================================

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function createValidationResult(
  errors: Record<string, string> = {},
): ValidationResult {
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// ============================================================================
// Field Validators
// ============================================================================

export const validators = {
  required: (value: any, fieldName = "Field"): string | null => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return `${fieldName} is required`;
    }
    return null;
  },

  email: (value: string): string | null => {
    if (!value) return null; // Use required validator first
    if (!isValidEmail(value)) {
      return VALIDATION_MESSAGES.INVALID_EMAIL;
    }
    return null;
  },

  url: (value: string): string | null => {
    if (!value) return null; // Use required validator first
    if (!isValidUrl(value)) {
      return VALIDATION_MESSAGES.INVALID_URL;
    }
    return null;
  },

  minLength: (value: string, minLength: number): string | null => {
    if (!value) return null; // Use required validator first
    if (value.length < minLength) {
      return `Must be at least ${minLength} characters`;
    }
    return null;
  },

  maxLength: (value: string, maxLength: number): string | null => {
    if (!value) return null;
    if (value.length > maxLength) {
      return `Must be at most ${maxLength} characters`;
    }
    return null;
  },

  password: (value: string): string | null => {
    if (!value) return null;
    if (value.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      return VALIDATION_MESSAGES.PASSWORD_TOO_SHORT;
    }
    return null;
  },

  role: (value: string): string | null => {
    if (!value) return null;
    if (!isValidRole(value)) {
      return "Invalid role specified";
    }
    return null;
  },
};

// ============================================================================
// Form Validators
// ============================================================================

export function validateLoginForm(
  email: string,
  password: string,
): ValidationResult {
  const errors: Record<string, string> = {};

  const emailError =
    validators.required(email, "Email") || validators.email(email);
  if (emailError) errors.email = emailError;

  const passwordError = validators.required(password, "Password");
  if (passwordError) errors.password = passwordError;

  return createValidationResult(errors);
}

export function validateUserForm(
  email: string,
  password: string,
  role: string,
): ValidationResult {
  const errors: Record<string, string> = {};

  const emailError =
    validators.required(email, "Email") || validators.email(email);
  if (emailError) errors.email = emailError;

  const passwordError =
    validators.required(password, "Password") || validators.password(password);
  if (passwordError) errors.password = passwordError;

  const roleError = validators.required(role, "Role") || validators.role(role);
  if (roleError) errors.role = roleError;

  return createValidationResult(errors);
}

export function validateProfileForm(
  name: string,
  bio?: string,
): ValidationResult {
  const errors: Record<string, string> = {};

  const nameError = validators.required(name, "Name");
  if (nameError) errors.name = nameError;

  if (bio && bio.length > 500) {
    errors.bio = "Bio must be at most 500 characters";
  }

  return createValidationResult(errors);
}

export function validatePaperForm(
  title: string,
  url: string,
): ValidationResult {
  const errors: Record<string, string> = {};

  const titleError = validators.required(title, "Title");
  if (titleError) errors.title = titleError;

  const urlError = validators.required(url, "URL") || validators.url(url);
  if (urlError) errors.url = urlError;

  return createValidationResult(errors);
}

export function validateCommunityMemberForm(
  name: string,
  email: string,
): ValidationResult {
  const errors: Record<string, string> = {};

  const nameError = validators.required(name, "Name");
  if (nameError) errors.name = nameError;

  const emailError =
    validators.required(email, "Email") || validators.email(email);
  if (emailError) errors.email = emailError;

  return createValidationResult(errors);
}

// ============================================================================
// Sanitization
// ============================================================================

export function sanitizeString(value: string | null | undefined): string {
  if (!value) return "";
  return value.trim();
}

export function sanitizeEmail(email: string): string {
  return sanitizeString(email).toLowerCase();
}

export function sanitizeUrl(url: string): string {
  const sanitized = sanitizeString(url);
  // Ensure URL has protocol
  if (sanitized && !sanitized.match(/^https?:\/\//)) {
    return `https://${sanitized}`;
  }
  return sanitized;
}

// ============================================================================
// Type Coercion
// ============================================================================

export function toBoolean(value: any): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value === "1";
  }
  if (typeof value === "number") return value !== 0;
  return Boolean(value);
}

export function toInt(value: any, defaultValue = 0): number {
  const parsed = parseInt(String(value), 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

// ============================================================================
// Batch Validation
// ============================================================================

export function validateFields(
  fields: Record<string, any>,
  rules: Record<string, Array<(value: any) => string | null>>,
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = fields[field];

    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  }

  return createValidationResult(errors);
}
