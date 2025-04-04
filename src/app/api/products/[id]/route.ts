import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      await dbConnect();
      const product = await Product.findById(params.id);
  
      if (!product) {
        return NextResponse.json(
          { success: false, error: 'Product not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ success: true, product });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      );
    }
  }
  
  