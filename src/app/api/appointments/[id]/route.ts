// Original source file: app/api/appointments/[id]/route.ts
import Appointment from "@/models/Appointment";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const data = await Appointment.findById(id);
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
    const data = await Appointment.findByIdAndUpdate(id, body);
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
    await Appointment.findByIdAndDelete(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error in DELETE function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
