import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getJwtSecretKey } from "@/lib/jwtSecret";

const protectedRoutes = ["/book"];
const adminRoutes = ["/admin"];

export default async function auth(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get("auth-token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!isProtectedRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    if (
      typeof payload.userId !== "string" ||
      typeof payload.isAdmin !== "boolean"
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAdminRoute && !payload.isAdmin) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
