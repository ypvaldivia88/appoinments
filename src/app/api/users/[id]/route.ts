// route.ts
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { requireUserOrAdmin } from "@/lib/apiAuth";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    // Check if user can access this resource (own data or admin)
    const authError = requireUserOrAdmin(request, id);
    if (authError) return authError;

    const data = await User.findById(id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id } = await params;

    // Check if user can modify this resource (own data or admin)
    const authError = requireUserOrAdmin(request, id);
    if (authError) return authError;

    if (!body.password) {
      delete body.password;
    }

    const auth = getAuthFromRequest(request);
    if (!auth?.isAdmin) {
      delete body.isAdmin;
    }

    const data = await User.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in PUT function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    // Check if user can delete this resource (own data or admin)
    const authError = requireUserOrAdmin(request, id);
    if (authError) return authError;

    await User.findByIdAndDelete(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error in DELETE function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
