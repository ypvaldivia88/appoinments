import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 }
  );
  response.cookies.delete("session");
  return response;
}
