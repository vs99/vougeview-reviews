// src/app/api/reviews/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // Get the product ID from URL query params
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    
    let query = {};
    if (productId) {
      query = { productId };
    }
    
    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .limit(productId ? 100 : 10);
    
    return NextResponse.json({ 
      success: true, 
      reviews 
    });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const review = await Review.create(body);
    
    return NextResponse.json(
      { success: true, review },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}