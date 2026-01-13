import { NextResponse } from "next/server";
import { requireRole } from "@/app/lib/auth";
import {
  createUser,
  getUserByEmail,
  createProfile,
  createFYPStudent,
} from "@/app/lib/db/service";
import { validateUserForm, sanitizeEmail } from "@/app/lib/validation";
import { withRateLimit, RateLimits } from "@/app/lib/rate-limit";
import type { UserRole } from "@/app/types";

export async function POST(request: Request) {
  // Apply rate limiting: 30 requests per minute
  return withRateLimit(request, RateLimits.MODERATE, async () => {
    try {
      const session = await requireRole(["supervisor"]);

      if (!session) {
        return NextResponse.json(
          { error: "Unauthorized. Only supervisors can create users." },
          { status: 401 },
        );
      }

      const body = await request.json();
      let { email, password, role } = body;

      // Sanitize email
      email = sanitizeEmail(email || "");

      // Validate input
      const validation = validateUserForm(email, password || "", role || "");
      if (!validation.isValid) {
        const firstError = Object.values(validation.errors)[0];
        return NextResponse.json({ error: firstError }, { status: 400 });
      }

      // Check if user already exists
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 409 },
        );
      }

      // Create the user
      const result = await createUser({
        email,
        password,
        role: role as UserRole,
      });

      // Auto-create profile for research assistants and FYP students
      if (role === "research_assistant" || role === "fyp_student") {
        const userName = email.split("@")[0]; // Use email prefix as default name
        createProfile({
          userId: result.id,
          name: userName,
          bio: null,
          profilePicture: null,
        });
      }

      // Auto-create FYP student record for FYP students
      if (role === "fyp_student") {
        createFYPStudent({
          userId: result.id,
          ideaDescription: null,
          projectTitle: null,
          year: null,
          status: "ongoing",
        });
      }

      return NextResponse.json({
        success: true,
        message: "User created successfully",
        userId: result.id,
      });
    } catch (error) {
      console.error("Create user error:", error);
      return NextResponse.json(
        { error: "An error occurred while creating the user" },
        { status: 500 },
      );
    }
  });
}
