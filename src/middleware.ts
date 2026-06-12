import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/auth-utils";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  // Paths that require authentication
  const isProtectedPath = 
    request.nextUrl.pathname.startsWith("/dashboard") || 
    request.nextUrl.pathname.startsWith("/advisor") || 
    request.nextUrl.pathname.startsWith("/simulator") || 
    request.nextUrl.pathname.startsWith("/passport");

  // Paths that are only for non-authenticated users
  const isAuthPath = 
    request.nextUrl.pathname.startsWith("/login") || 
    request.nextUrl.pathname.startsWith("/register");

  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPath && session) {
    const payload = await verifyJWT(session);
    if (payload) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/advisor/:path*",
    "/simulator/:path*",
    "/passport/:path*",
    "/login",
    "/register",
  ],
};
