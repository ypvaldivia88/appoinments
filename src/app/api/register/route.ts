import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { name, phone, password } = await req.json();

  // verify if user exists
  const exists = await User.findOne({ phone });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = new User({
    name,
    phone,
    password,
    isAdmin: false,
  });

  await user.save();
  return NextResponse.json(user, { status: 200 });
}
