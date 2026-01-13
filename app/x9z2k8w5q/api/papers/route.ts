import { NextResponse } from 'next/server';
import { requireAuth } from '@/app/lib/auth';
import { createPaper } from '@/app/lib/db/service';

export async function POST(request: Request) {
  try {
    const session = await requireAuth();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only Research Assistants can add papers
    if (session.role !== 'research_assistant') {
      return NextResponse.json(
        { error: 'Only Research Assistants can add papers' },
        { status: 403 }
      );
    }

    const { title, url, description, publishedDate, userId } = await request.json();

    // Verify user is adding their own papers
    if (userId !== session.userId) {
      return NextResponse.json(
        { error: 'You can only add papers to your own account' },
        { status: 403 }
      );
    }

    if (!title || !url) {
      return NextResponse.json(
        { error: 'Title and URL are required' },
        { status: 400 }
      );
    }

    const result = createPaper({
      userId,
      title,
      url,
      description,
      publishedDate,
    });

    return NextResponse.json({
      success: true,
      message: 'Paper added successfully',
      paperId: (result as any).lastInsertRowid,
    });
  } catch (error) {
    console.error('Create paper error:', error);
    return NextResponse.json(
      { error: 'An error occurred while adding the paper' },
      { status: 500 }
    );
  }
}
