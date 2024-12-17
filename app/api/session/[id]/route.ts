import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User"; // Import Mongoose User model
import dbConnect from "@/app/lib/dbConnect";

export async function GET(request: NextRequest) {
  dbConnect();
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
