import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import db from "./db";
import type {
  User,
  UserRole,
  SessionPayload,
  UserWithPassword,
} from "@/app/types";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production",
);

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// ============================================================================
// Password Management
// ============================================================================

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// ============================================================================
// JWT Token Management
// ============================================================================

export async function createToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    expiresAt: payload.expiresAt.toISOString(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifyToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      userId: payload.userId as number,
      email: payload.email as string,
      role: payload.role as UserRole,
      expiresAt: new Date(payload.expiresAt as string),
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// ============================================================================
// Session Management
// ============================================================================

export async function createSession(user: User): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    expiresAt,
  };

  const token = await createToken(payload);

  // Store session in database
  const sessionId = `${user.id}-${Date.now()}`;
  const stmt = db.prepare(`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (?, ?, ?)
  `);
  stmt.run(sessionId, user.id, expiresAt.toISOString());

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  const session = await verifyToken(token);

  if (!session) {
    return null;
  }

  // Check if session is expired
  if (new Date() > new Date(session.expiresAt)) {
    await deleteSession();
    return null;
  }

  return session;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export function cleanExpiredSessions(): void {
  const stmt = db.prepare(`
    DELETE FROM sessions
    WHERE expires_at < datetime('now')
  `);
  stmt.run();
}

// ============================================================================
// Authentication
// ============================================================================

export async function authenticate(
  email: string,
  password: string,
): Promise<User | null> {
  const stmt = db.prepare(`
    SELECT id, email, password, role, created_at, updated_at
    FROM users
    WHERE email = ?
  `);

  const user = stmt.get(email) as UserWithPassword | undefined;

  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}

// ============================================================================
// Authorization Middleware
// ============================================================================

export async function requireAuth(): Promise<SessionPayload | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  // Check if session is expired
  if (new Date() > new Date(session.expiresAt)) {
    await deleteSession();
    return null;
  }

  return session;
}

export async function requireRole(
  allowedRoles: UserRole[],
): Promise<SessionPayload | null> {
  const session = await requireAuth();

  if (!session) {
    return null;
  }

  if (!allowedRoles.includes(session.role)) {
    return null;
  }

  return session;
}

export async function requireSupervisor(): Promise<SessionPayload | null> {
  return requireRole(["supervisor"]);
}

export async function requireResearchAssistant(): Promise<SessionPayload | null> {
  return requireRole(["research_assistant"]);
}

export async function requireFYPStudent(): Promise<SessionPayload | null> {
  return requireRole(["fyp_student"]);
}

// ============================================================================
// Role Checking Helpers
// ============================================================================

export async function isSupervisor(): Promise<boolean> {
  const session = await getSession();
  return session?.role === "supervisor";
}

export async function isResearchAssistant(): Promise<boolean> {
  const session = await getSession();
  return session?.role === "research_assistant";
}

export async function isFYPStudent(): Promise<boolean> {
  const session = await getSession();
  return session?.role === "fyp_student";
}

export async function hasRole(role: UserRole): Promise<boolean> {
  const session = await getSession();
  return session?.role === role;
}

export async function hasAnyRole(roles: UserRole[]): Promise<boolean> {
  const session = await getSession();
  return session ? roles.includes(session.role) : false;
}
