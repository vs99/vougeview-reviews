// app/api/products/search/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    
    // Perform a case-insensitive search on the title field
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    }).limit(10); // limit to 10 results (adjust as needed)
    
    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error("Error searching products:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
