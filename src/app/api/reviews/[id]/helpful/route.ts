// src/app/api/reviews/[id]/helpful/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to your database
    await dbConnect();

    const { id } = params;
    // Use MongoDB's $inc operator to increment the helpfulCount by 1
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { $inc: { helpfulCount: 1 } },
      { new: true }
    );

    if (!updatedReview) {
      return NextResponse.json(
        { success: false, error: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, review: updatedReview });
  } catch (error: any) {
    console.error("Error updating helpful count:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
