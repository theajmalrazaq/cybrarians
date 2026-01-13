import { NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import {
  createProfile,
  updateProfile,
  getProfileByUserId,
  createFYPStudent,
  updateFYPStudent,
  getFYPStudentByUserId,
} from "@/app/lib/db/service";

export async function POST(request: Request) {
  try {
    const session = await requireAuth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only RAs and FYP students can update their profiles
    if (session.role === "supervisor") {
      return NextResponse.json(
        { error: "Supervisors cannot update profiles through this endpoint" },
        { status: 403 },
      );
    }

    const { userId, profile, fypData } = await request.json();

    // Verify user is updating their own profile
    if (userId !== session.userId) {
      return NextResponse.json(
        { error: "You can only update your own profile" },
        { status: 403 },
      );
    }

    // Check if profile exists
    const existingProfile = getProfileByUserId(userId);

    // Update or create profile
    if (existingProfile) {
      updateProfile(userId, {
        name: profile.name,
        bio: profile.bio,
        profilePicture: profile.profilePicture,
      });
    } else {
      createProfile({
        userId,
        name: profile.name,
        bio: profile.bio,
        profilePicture: profile.profilePicture,
      });
    }

    // Handle FYP-specific data
    if (session.role === "fyp_student" && fypData) {
      const existingFypData = getFYPStudentByUserId(userId);

      if (existingFypData) {
        updateFYPStudent(userId, {
          projectTitle: fypData.projectTitle,
          ideaDescription: fypData.ideaDescription,
          year: fypData.year,
          status: fypData.status,
        });
      } else {
        createFYPStudent({
          userId,
          projectTitle: fypData.projectTitle,
          ideaDescription: fypData.ideaDescription,
          year: fypData.year,
          status: fypData.status,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "An error occurred while updating profile" },
      { status: 500 },
    );
  }
}
