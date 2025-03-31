// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Here you could clear a session cookie if you set one.
  // For this example, we simply return a success message.
  return NextResponse.json({ success: true, message: "Logged out" }, { status: 200 });
}
