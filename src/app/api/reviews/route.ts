import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    // Get the product ID from URL query params
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    
    // If productId is provided, filter reviews by product
    const query = productId ? { productId } : {};
    const reviews = await Review.find(query).sort({ date: -1 });
    
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Add current date if not provided
    if (!data.date) {
      data.date = new Date().toISOString();
    }
    
    // Set initial helpful count to 0 if not provided
    if (!data.helpfulCount) {
      data.helpfulCount = 0;
    }
    
    const review = await Review.create(data);
    return NextResponse.json(
      { success: true, review },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}