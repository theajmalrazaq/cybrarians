import { NextResponse } from "next/server";
import { requireRole } from "@/app/lib/auth";
import {
  createCommunityMember,
  getCommunityMemberById,
} from "@/app/lib/db/service";
import {
  validateCommunityMemberForm,
  sanitizeEmail,
  sanitizeString,
} from "@/app/lib/validation";

export async function POST(request: Request) {
  try {
    const session = await requireRole(["supervisor"]);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Only supervisors can add community members." },
        { status: 401 },
      );
    }

    const body = await request.json();
    let {
      name,
      email,
      roleInCommunity,
      bio,
      profilePicture,
      linkedinUrl,
      githubUrl,
      websiteUrl,
      joinedDate,
      isActive,
    } = body;

    // Sanitize input
    name = sanitizeString(name);
    email = sanitizeEmail(email);
    roleInCommunity = sanitizeString(roleInCommunity);
    bio = sanitizeString(bio);

    // Validate input
    const validation = validateCommunityMemberForm(name, email);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    // Create the community member
    const result = createCommunityMember({
      name,
      email,
      roleInCommunity,
      bio,
      profilePicture,
      linkedinUrl,
      githubUrl,
      websiteUrl,
      joinedDate,
      isActive,
    });

    return NextResponse.json({
      success: true,
      message: "Community member added successfully",
      memberId: result.id,
    });
  } catch (error: any) {
    console.error("Create community member error:", error);

    // Handle unique constraint violation
    if (error?.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json(
        { error: "A community member with this email already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "An error occurred while adding the community member" },
      { status: 500 },
    );
  }
}
