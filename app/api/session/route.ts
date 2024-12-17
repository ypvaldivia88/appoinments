import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User"; // Import Mongoose User model
import dbConnect from "@/app/lib/dbConnect";

export async function GET(request: NextRequest) {
  dbConnect();
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
