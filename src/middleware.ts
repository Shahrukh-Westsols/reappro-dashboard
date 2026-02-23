import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAuthenticated(request: NextRequest) {
  // Replace with real session check
  return true;
}

function isAdmin(request: NextRequest) {
  // Replace with real role check
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );

  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!isAdmin(request)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (pathname.startsWith("/user")) {
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login|unauthorized).*)"],
};
