import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export async function GET() {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 }
  );
  Cookies.remove("session");
  return response;
}
