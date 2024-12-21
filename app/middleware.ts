import { NextRequest, NextResponse } from "next/server";
import useGlobalStore from "@/store/useGlobalStore";

// List of routes that require authentication
const protectedRoutes = ["/book"];
const adminRoutes = ["/admin"];

export default function auth(req: NextRequest): NextResponse {
  const { session, sessionChecked } = useGlobalStore.getState();

  if (!sessionChecked) {
    return NextResponse.next();
  }

  const isProtectedRoute = adminRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if ((!session && isProtectedRoute) || (!session?.isAdmin && isAdminRoute)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// This line configures which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
