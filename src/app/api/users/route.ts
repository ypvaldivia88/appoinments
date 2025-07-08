// route.ts
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiAuth";

export async function GET(req: NextRequest) {
  // Only admins can list all users
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    await dbConnect();
    const data = await User.find({});
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Only admins can create users directly (registration is separate)
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await dbConnect();
    const body = await request.json();
    const user = new User(body);
    const data = await user.save();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

