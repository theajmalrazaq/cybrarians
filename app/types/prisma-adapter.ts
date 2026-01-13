/**
 * Prisma Adapter Types
 *
 * Type mappings between Prisma-generated types and application types.
 * Use these adapters when migrating from better-sqlite3 to Prisma ORM.
 *
 * DO NOT USE YET - For future migration reference only
 * 
 * NOTE: Commented out to prevent "Module not found" errors until Prisma is installed.
 */

/*
import type {
  User as PrismaUser,
  Profile as PrismaProfile,
  FYPStudent as PrismaFYPStudent,
  Paper as PrismaPaper,
  CommunityMember as PrismaCommunityMember,
  Session as PrismaSession,
  UserRole as PrismaUserRole,
  FYPStatus as PrismaFYPStatus,
} from "@prisma/client";

import type {
  User,
  UserRole,
  Profile,
  ProfileWithUser,
  FYPStudent,
  FYPStudentWithProfile,
  FYPStatus,
  Paper,
  PaperWithAuthor,
  CommunityMember,
} from "./index";

// ============================================================================
// Type Mappers - Convert Prisma types to Application types
// ============================================================================

export function mapPrismaUser(prismaUser: any): User {
  return {
    id: prismaUser.id,
    email: prismaUser.email,
    role: prismaUser.role as UserRole,
    created_at: prismaUser.createdAt.toISOString(),
    updated_at: prismaUser.updatedAt.toISOString(),
  };
}

export function mapPrismaProfile(prismaProfile: any): Profile {
  return {
    id: prismaProfile.id,
    user_id: prismaProfile.userId,
    name: prismaProfile.name,
    bio: prismaProfile.bio,
    profile_picture: prismaProfile.profilePicture,
    created_at: prismaProfile.createdAt.toISOString(),
    updated_at: prismaProfile.updatedAt.toISOString(),
  };
}

// ... rest of the mappings commented out below
*/

