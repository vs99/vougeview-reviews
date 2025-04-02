// app/api/categories/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const categories = await Category.find({});
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
