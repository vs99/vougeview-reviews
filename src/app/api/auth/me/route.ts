// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // This is a simplified route that lets the client handle auth state
  // The response simply indicates the endpoint is available
  
  // Get the cookie or custom header if you want some basic validation
  const authCookie = request.cookies.get('auth');
  
  if (!authCookie) {
    // No cookie found - return unauthorized
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
  
  // Return a success response
  // The actual user data is managed by the client in localStorage
  return NextResponse.json({ authenticated: true }, { status: 200 });
}