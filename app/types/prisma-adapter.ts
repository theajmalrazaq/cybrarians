/**
 * Prisma Adapter Types
 *
 * Type mappings between Prisma-generated types and application types.
 * Use these adapters when migrating from better-sqlite3 to Prisma ORM.
 *
 * DO NOT USE YET - For future migration reference only
 */

import type {
  User as PrismaUser,
  Profile as PrismaProfile,
  FYPStudent as PrismaFYPStudent,
  Paper as PrismaPaper,
  CommunityMember as PrismaCommunityMember,
  Session as PrismaSession,
  UserRole as PrismaUserRole,
  FYPStatus as PrismaFYPStatus,
} from '@prisma/client';

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
} from './index';

// ============================================================================
// Type Mappers - Convert Prisma types to Application types
// ============================================================================

/**
 * Map Prisma User to Application User
 */
export function mapPrismaUser(prismaUser: PrismaUser): User {
  return {
    id: prismaUser.id,
    email: prismaUser.email,
    role: prismaUser.role as UserRole,
    created_at: prismaUser.createdAt.toISOString(),
    updated_at: prismaUser.updatedAt.toISOString(),
  };
}

/**
 * Map Prisma Profile to Application Profile
 */
export function mapPrismaProfile(prismaProfile: PrismaProfile): Profile {
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

/**
 * Map Prisma Profile with User relation to Application ProfileWithUser
 */
export function mapPrismaProfileWithUser(
  prismaProfile: PrismaProfile & { user: PrismaUser }
): ProfileWithUser {
  return {
    id: prismaProfile.id,
    user_id: prismaProfile.userId,
    name: prismaProfile.name,
    bio: prismaProfile.bio,
    profile_picture: prismaProfile.profilePicture,
    created_at: prismaProfile.createdAt.toISOString(),
    updated_at: prismaProfile.updatedAt.toISOString(),
    email: prismaProfile.user.email,
    role: prismaProfile.user.role as UserRole,
  };
}

/**
 * Map Prisma FYPStudent to Application FYPStudent
 */
export function mapPrismaFYPStudent(prismaFYP: PrismaFYPStudent): FYPStudent {
  return {
    id: prismaFYP.id,
    user_id: prismaFYP.userId,
    idea_description: prismaFYP.ideaDescription,
    project_title: prismaFYP.projectTitle,
    year: prismaFYP.year,
    status: prismaFYP.status as FYPStatus,
    created_at: prismaFYP.createdAt.toISOString(),
    updated_at: prismaFYP.updatedAt.toISOString(),
  };
}

/**
 * Map Prisma FYPStudent with relations to Application FYPStudentWithProfile
 */
export function mapPrismaFYPStudentWithProfile(
  prismaFYP: PrismaFYPStudent & {
    user: PrismaUser & { profile: PrismaProfile | null };
  }
): FYPStudentWithProfile {
  return {
    id: prismaFYP.id,
    user_id: prismaFYP.userId,
    idea_description: prismaFYP.ideaDescription,
    project_title: prismaFYP.projectTitle,
    year: prismaFYP.year,
    status: prismaFYP.status as FYPStatus,
    created_at: prismaFYP.createdAt.toISOString(),
    updated_at: prismaFYP.updatedAt.toISOString(),
    name: prismaFYP.user.profile?.name || null,
    bio: prismaFYP.user.profile?.bio || null,
    profile_picture: prismaFYP.user.profile?.profilePicture || null,
    email: prismaFYP.user.email,
  };
}

/**
 * Map Prisma Paper to Application Paper
 */
export function mapPrismaPaper(prismaPaper: PrismaPaper): Paper {
  return {
    id: prismaPaper.id,
    user_id: prismaPaper.userId,
    title: prismaPaper.title,
    url: prismaPaper.url,
    description: prismaPaper.description,
    published_date: prismaPaper.publishedDate,
    created_at: prismaPaper.createdAt.toISOString(),
    updated_at: prismaPaper.updatedAt.toISOString(),
  };
}

/**
 * Map Prisma Paper with author to Application PaperWithAuthor
 */
export function mapPrismaPaperWithAuthor(
  prismaPaper: PrismaPaper & {
    user: PrismaUser & { profile: PrismaProfile | null };
  }
): PaperWithAuthor {
  return {
    id: prismaPaper.id,
    user_id: prismaPaper.userId,
    title: prismaPaper.title,
    url: prismaPaper.url,
    description: prismaPaper.description,
    published_date: prismaPaper.publishedDate,
    created_at: prismaPaper.createdAt.toISOString(),
    updated_at: prismaPaper.updatedAt.toISOString(),
    email: prismaPaper.user.email,
    author_name: prismaPaper.user.profile?.name || null,
  };
}

/**
 * Map Prisma CommunityMember to Application CommunityMember
 */
export function mapPrismaCommunityMember(
  prismaMember: PrismaCommunityMember
): CommunityMember {
  return {
    id: prismaMember.id,
    name: prismaMember.name,
    email: prismaMember.email,
    role_in_community: prismaMember.roleInCommunity,
    bio: prismaMember.bio,
    profile_picture: prismaMember.profilePicture,
    linkedin_url: prismaMember.linkedinUrl,
    github_url: prismaMember.githubUrl,
    website_url: prismaMember.websiteUrl,
    joined_date: prismaMember.joinedDate,
    is_active: prismaMember.isActive,
    created_at: prismaMember.createdAt.toISOString(),
    updated_at: prismaMember.updatedAt.toISOString(),
  };
}

// ============================================================================
// Reverse Mappers - Convert Application types to Prisma input types
// ============================================================================

/**
 * Map Application UserRole to Prisma UserRole
 */
export function toPrismaUserRole(role: UserRole): PrismaUserRole {
  return role as PrismaUserRole;
}

/**
 * Map Application FYPStatus to Prisma FYPStatus
 */
export function toPrismaFYPStatus(status: FYPStatus): PrismaFYPStatus {
  return status as PrismaFYPStatus;
}

// ============================================================================
// Prisma Query Result Types with Relations
// ============================================================================

/**
 * User with all relations
 */
export type PrismaUserWithRelations = PrismaUser & {
  profile: PrismaProfile | null;
  fypStudent: PrismaFYPStudent | null;
  papers: PrismaPaper[];
  sessions: PrismaSession[];
};

/**
 * Profile with user
 */
export type PrismaProfileWithUser = PrismaProfile & {
  user: PrismaUser;
};

/**
 * FYP Student with user and profile
 */
export type PrismaFYPStudentWithUser = PrismaFYPStudent & {
  user: PrismaUser & {
    profile: PrismaProfile | null;
  };
};

/**
 * Paper with author details
 */
export type PrismaPaperWithAuthor = PrismaPaper & {
  user: PrismaUser & {
    profile: PrismaProfile | null;
  };
};

// ============================================================================
// Helper Types for Prisma Operations
// ============================================================================

/**
 * Prisma select options for User
 */
export const userSelect = {
  id: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

/**
 * Prisma select options for Profile
 */
export const profileSelect = {
  id: true,
  userId: true,
  name: true,
  bio: true,
  profilePicture: true,
  createdAt: true,
  updatedAt: true,
} as const;

/**
 * Prisma include options for User with Profile
 */
export const userWithProfileInclude = {
  profile: true,
} as const;

/**
 * Prisma include options for FYP Student with details
 */
export const fypStudentWithDetailsInclude = {
  user: {
    include: {
      profile: true,
    },
  },
} as const;

/**
 * Prisma include options for Paper with Author
 */
export const paperWithAuthorInclude = {
  user: {
    include: {
      profile: true,
    },
  },
} as const;

// ============================================================================
// Batch Operation Helpers
// ============================================================================

/**
 * Map array of Prisma Users to Application Users
 */
export function mapPrismaUsers(prismaUsers: PrismaUser[]): User[] {
  return prismaUsers.map(mapPrismaUser);
}

/**
 * Map array of Prisma Profiles to Application Profiles
 */
export function mapPrismaProfiles(prismaProfiles: PrismaProfile[]): Profile[] {
  return prismaProfiles.map(mapPrismaProfile);
}

/**
 * Map array of Prisma Papers to Application Papers
 */
export function mapPrismaPapers(prismaPapers: PrismaPaper[]): Paper[] {
  return prismaPapers.map(mapPrismaPaper);
}

/**
 * Map array of Prisma Papers with authors to Application PapersWithAuthor
 */
export function mapPrismaPapersWithAuthor(
  prismaPapers: PrismaPaperWithAuthor[]
): PaperWithAuthor[] {
  return prismaPapers.map(mapPrismaPaperWithAuthor);
}

/**
 * Map array of Prisma CommunityMembers to Application CommunityMembers
 */
export function mapPrismaCommunityMembers(
  prismaMembers: PrismaCommunityMember[]
): CommunityMember[] {
  return prismaMembers.map(mapPrismaCommunityMember);
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Check if Prisma result includes profile
 */
export function hasPrismaProfile(
  user: PrismaUser | PrismaUserWithRelations
): user is PrismaUser & { profile: PrismaProfile } {
  return 'profile' in user && user.profile !== null;
}

/**
 * Check if Prisma result includes FYP student data
 */
export function hasPrismaFYPStudent(
  user: PrismaUser | PrismaUserWithRelations
): user is PrismaUser & { fypStudent: PrismaFYPStudent } {
  return 'fypStudent' in user && user.fypStudent !== null;
}

/**
 * Check if Prisma result includes papers
 */
export function hasPrismaPapers(
  user: PrismaUser | PrismaUserWithRelations
): user is PrismaUser & { papers: PrismaPaper[] } {
  return 'papers' in user && Array.isArray(user.papers);
}
