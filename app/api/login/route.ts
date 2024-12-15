import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User"; // Import Mongoose User model

export async function POST(req: NextRequest) {
  // Remove res from parameters
  try {
    const { phone, password } = await req.json(); // Correct way to parse JSON body

    // Find user by phone
    const user = await User.findOne({ phone }).select("+password");
    if (!user) {
      return NextResponse.json(
        { message: "Invalid phone or password" },
        { status: 401 }
      );
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password); // Await the password comparison
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid phone or password" },
        { status: 401 }
      );
    }

    // Authentication successful
    return NextResponse.json(
      { message: "Login successful", user: user.toJSON() },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
