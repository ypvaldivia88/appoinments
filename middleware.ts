import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "./app/lib/db"; // Import prisma

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("session")?.value;
  if (!sessionToken && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (sessionToken) {
    const session = await prisma.user.findUnique({
      where: { phone: sessionToken },
    });
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/book/:path*"],
};
