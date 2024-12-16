import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User"; // Import Mongoose User model

export async function GET(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const {
    user: { id },
  } = JSON.parse(session.value);
  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}