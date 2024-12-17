import { NextResponse } from "next/server";
import User from "@/app/models/User"; // Import Mongoose User model
import dbConnect from "@/app/lib/dbConnect";
import Cookies from "js-cookie";

export async function GET() {
  dbConnect();
  const session = Cookies.get("session");

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { userId } = JSON.parse(session);
  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
