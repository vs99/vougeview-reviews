import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';
import Product from '@/models/Product'; // Import Product to update its rating

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    // Get the product ID from URL query params
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    
    let query = {};
    if (productId) {
      console.log("Searching for reviews with productId:", productId);
      // When productId is stored as ObjectId, you may not need the $or clause.
      query = { productId: productId };
    }
    
    const reviews = await Review.find(query).sort({ date: -1 });
    console.log(`Found ${reviews.length} reviews for product ${productId}`);
    
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
    
    // Ensure date and helpfulCount are set
    if (!data.date) {
      data.date = new Date().toISOString();
    }
    if (!data.helpfulCount) {
      data.helpfulCount = 0;
    }
    
    // Create the review document
    const review = await Review.create(data);

    // ----- Update product rating & reviewCount -----
    // Fetch all reviews for the given productId
    const reviews = await Review.find({ productId: data.productId });
    const reviewCount = reviews.length;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = reviewCount ? totalRating / reviewCount : 0;
    
    // Update the Product document with the new average rating and review count
    await Product.findByIdAndUpdate(
      data.productId,
      { rating: averageRating, reviewCount: reviewCount },
      { new: true }
    );
    // -----------------------------------------------
    
    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
