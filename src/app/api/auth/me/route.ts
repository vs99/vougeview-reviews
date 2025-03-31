// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';

// This example assumes the client stores the user info.
// In production, you’d typically verify a token or session cookie.
export async function GET() {
  // Since we aren’t maintaining a server session here, just return 401.
  return NextResponse.json({ user: null }, { status: 401 });
}
