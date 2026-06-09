import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { requireAuth } from "@/lib/apiAuth";
import { getUserId, isAdmin } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    await dbConnect();
    const { id } = await params;
    const currentUserId = getUserId(request);

    if (!currentUserId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    if (id !== currentUserId && !isAdmin(request)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
