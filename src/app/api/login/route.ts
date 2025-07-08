import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { generateToken } from "@/lib/auth";
import { checkRateLimit, clearRateLimit } from "@/lib/apiAuth";

export async function POST(req: NextRequest) {
  await dbConnect();
  
  try {
    const { phone, password } = await req.json();
    
    // Check rate limiting (using phone as identifier)
    if (!checkRateLimit(phone)) {
      return NextResponse.json(
        { message: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

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

    // Clear rate limit on successful login
    clearRateLimit(phone);

    // Generate JWT token
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
    console.error("Error in POST function:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Internal server error: " + errorMessage },
      { status: 500 }
    );
  }
}
