import Appointment from "@/models/Appointment";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireAppointmentOwnerOrAdmin } from "@/lib/apiAuth";
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
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    const accessError = requireAppointmentOwnerOrAdmin(
      request,
      appointment.user?.toString()
    );
    if (accessError) return accessError;

    return NextResponse.json(appointment, { status: 200 });
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
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    await dbConnect();
    const body = await request.json();
    const { id } = await params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    const accessError = requireAppointmentOwnerOrAdmin(
      request,
      appointment.user?.toString()
    );
    if (accessError) return accessError;

    if (!isAdmin(request)) {
      body.user = getUserId(request);
    }

    const data = await Appointment.findByIdAndUpdate(id, body, { new: true });
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
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    await dbConnect();
    const { id } = await params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    const accessError = requireAppointmentOwnerOrAdmin(
      request,
      appointment.user?.toString()
    );
    if (accessError) return accessError;

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
