import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/auth-utils";

// Simple in-memory rate limiter for Edge
const ipRequests = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 100;

  const record = ipRequests.get(ip);
  if (!record || now > record.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function middleware(request: NextRequest) {
  const ip = request.ip || request.headers.get("x-forwarded-for") || "127.0.0.1";
  
  if (!checkRateLimit(ip)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

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

  const response = NextResponse.next();

  const securityHeaders = {
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
    "X-DNS-Prefetch-Control": "on",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-XSS-Protection": "1; mode=block",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "origin-when-cross-origin",
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
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
