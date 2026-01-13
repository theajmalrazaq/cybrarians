import { NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/auth";
import { updatePaper, deletePaper, getPaperById } from "@/app/lib/db/service";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAuth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only Research Assistants can update papers
    if (session.role !== "research_assistant") {
      return NextResponse.json(
        { error: "Only Research Assistants can update papers" },
        { status: 403 },
      );
    }

    const { id } = await params;
    const paperId = parseInt(id);
    const paper = getPaperById(paperId) as any;

    if (!paper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    // Verify user owns this paper
    if (paper.user_id !== session.userId) {
      return NextResponse.json(
        { error: "You can only update your own papers" },
        { status: 403 },
      );
    }

    const { title, url, description, publishedDate } = await request.json();

    updatePaper(paperId, {
      title,
      url,
      description,
      publishedDate,
    });

    return NextResponse.json({
      success: true,
      message: "Paper updated successfully",
    });
  } catch (error) {
    console.error("Update paper error:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the paper" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAuth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only Research Assistants can delete papers
    if (session.role !== "research_assistant") {
      return NextResponse.json(
        { error: "Only Research Assistants can delete papers" },
        { status: 403 },
      );
    }

    const { id } = await params;
    const paperId = parseInt(id);
    const paper = getPaperById(paperId) as any;

    if (!paper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    // Verify user owns this paper
    if (paper.user_id !== session.userId) {
      return NextResponse.json(
        { error: "You can only delete your own papers" },
        { status: 403 },
      );
    }

    deletePaper(paperId);

    return NextResponse.json({
      success: true,
      message: "Paper deleted successfully",
    });
  } catch (error) {
    console.error("Delete paper error:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the paper" },
      { status: 500 },
    );
  }
}
