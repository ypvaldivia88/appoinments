import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// List of routes that require authentication
const protectedRoutes = ["/book"];
const adminRoutes = ["/admin"];

interface DecodedToken {
  userId: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export default function auth(req: NextRequest): NextResponse {
  const token = req.cookies.get("auth-token")?.value;

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // If no authentication required, proceed
  if (!isProtectedRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  // If authentication required but no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as DecodedToken;
    
    // Check if admin route requires admin privileges
    if (isAdminRoute && !decoded.isAdmin) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Token is valid, proceed
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// This line configures which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
