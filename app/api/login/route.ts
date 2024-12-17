import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import dbConnect from "@/app/lib/dbConnect";
import Cookies from "js-cookie";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { phone, password } = await req.json();
    const user = await User.findOne({ phone }).select("+password");

    if (!user) {
      return NextResponse.json(
        { message: `User with phone: ${phone} not found` },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const session = { userId: user._id };
    const sessionCookie = JSON.stringify(session);
    Cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in POST function:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Internal server error: " + errorMessage },
      { status: 500 }
    );
  }
}
