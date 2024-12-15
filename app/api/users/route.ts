// route.ts
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id } = params;
    const data = await User.findByIdAndUpdate(_id, body, { new: true });
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
  { params }: { params: { _id: string } }
) {
  try {
    await dbConnect();
    const { _id } = params;
    await User.findByIdAndDelete(_id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error in DELETE function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
