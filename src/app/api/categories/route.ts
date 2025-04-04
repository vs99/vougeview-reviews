import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';

export async function GET(_request: NextRequest) {
  try {
    await dbConnect();
    const categories = await Category.find({});
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}