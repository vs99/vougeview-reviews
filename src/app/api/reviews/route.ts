// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  await dbConnect();
  try {
    const reviews = await Review.find({ productId: Number(productId) });
    return NextResponse.json({ success: true, reviews });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { user, rating, title, content, productId, productName } = body;
    if (!user || !user.name || !rating || !title || !content || !productId || !productName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    const review = await Review.create({
      user,
      rating,
      title,
      content,
      productId,
      productName,
    });
    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error: any) {
    console.error("Error in review POST:", error);
    return NextResponse.json(
      { success: false, error: error.toString() },
      { status: 500 }
    );
  }
}
