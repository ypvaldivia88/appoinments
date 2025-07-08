import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await dbConnect();
  
  try {
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

    // Generate JWT token for automatic login after registration
    const token = generateToken({
      userId: user._id.toString(),
      isAdmin: user.isAdmin
    });

    // Create response with user data (password excluded by toJSON)
    const response = NextResponse.json(user, { status: 200 });

    // Set secure httpOnly cookie with JWT token
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/"
    });

    return response;
  } catch (error) {
    console.error("Error in register:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Internal server error: " + errorMessage },
      { status: 500 }
    );
  }
}
