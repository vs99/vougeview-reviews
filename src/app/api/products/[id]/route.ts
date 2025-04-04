// src/app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

// Fix the type signature to use NextRequest
export async function GET(
  request: NextRequest, 
  context: { params: { id: string } }
) {
  try {
    await dbConnect();
    const product = await Product.findById(context.params.id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, product });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}