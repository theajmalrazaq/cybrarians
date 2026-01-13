import { NextResponse } from "next/server";
import { requireRole } from "@/app/lib/auth";
import {
  updateCommunityMember,
  deleteCommunityMember,
  getCommunityMemberById,
} from "@/app/lib/db/service";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireRole(["supervisor"]);

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized. Only supervisors can update community members.",
        },
        { status: 401 },
      );
    }

    const { id } = await params;
    const memberId = parseInt(id);

    if (isNaN(memberId)) {
      return NextResponse.json({ error: "Invalid member ID" }, { status: 400 });
    }

    // Check if member exists
    const member = getCommunityMemberById(memberId);
    if (!member) {
      return NextResponse.json(
        { error: "Community member not found" },
        { status: 404 },
      );
    }

    const body = await request.json();
    const {
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

    // Update the community member
    updateCommunityMember(memberId, {
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
      message: "Community member updated successfully",
    });
  } catch (error: any) {
    console.error("Update community member error:", error);

    // Handle unique constraint violation
    if (error?.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json(
        { error: "A community member with this email already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "An error occurred while updating the community member" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireRole(["supervisor"]);

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized. Only supervisors can delete community members.",
        },
        { status: 401 },
      );
    }

    const { id } = await params;
    const memberId = parseInt(id);

    if (isNaN(memberId)) {
      return NextResponse.json({ error: "Invalid member ID" }, { status: 400 });
    }

    // Check if member exists
    const member = getCommunityMemberById(memberId);
    if (!member) {
      return NextResponse.json(
        { error: "Community member not found" },
        { status: 404 },
      );
    }

    // Delete the community member
    deleteCommunityMember(memberId);

    return NextResponse.json({
      success: true,
      message: "Community member deleted successfully",
    });
  } catch (error) {
    console.error("Delete community member error:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the community member" },
      { status: 500 },
    );
  }
}
