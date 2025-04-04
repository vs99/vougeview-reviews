import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<Response> {
  try {
    await dbConnect();
    const review = await Review.findById(context.params.id);
    
    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }
    
    // Increment helpful count
    review.helpfulCount = (review.helpfulCount || 0) + 1;
    await review.save();
    
    return NextResponse.json({ 
      success: true, 
      helpfulCount: review.helpfulCount 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}