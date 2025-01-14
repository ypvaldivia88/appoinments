import { NextRequest, NextResponse } from "next/server";

// List of routes that require authentication
const protectedRoutes = ["/book"];
const adminRoutes = ["/admin"];

export default function auth(req: NextRequest): NextResponse {
  const userId = req.cookies.get("userId");
  const isAdmin = req.cookies.get("isAdmin");
  console.log("[middleware userId]", userId);
  console.log("[middleware isAdmin]", isAdmin);

  const isProtectedRoute = adminRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if ((!userId && isProtectedRoute) || (!isAdmin && isAdminRoute)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// This line configures which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
