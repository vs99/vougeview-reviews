import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get search query from URL parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    
    // Build search conditions
    const searchConditions: Record<string, any> = {};
    
    if (query) {
      searchConditions.title = { $regex: query, $options: 'i' };
    }
    
    if (category) {
      searchConditions.category = category;
    }
    
    // Execute search
    const products = await Product.find(searchConditions).limit(20);
    
    return NextResponse.json({ success: true, products });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}