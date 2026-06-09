import Appointment from "@/models/Appointment";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import {
  requireAuth,
  requireAppointmentOwnerOrAdmin,
  requireAppointmentUpdateAccess,
} from "@/lib/apiAuth";
import { getUserId, isAdmin } from "@/lib/auth";
import { userHasAppointmentOnDate } from "@/lib/appointmentValidation";

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

    const accessError = requireAppointmentUpdateAccess(
      request,
      appointment.user?.toString()
    );
    if (accessError) return accessError;

    const currentUserId = getUserId(request);
    const userIsAdmin = isAdmin(request);

    if (!userIsAdmin) {
      body.user = currentUserId;
    }

    const targetUserId = (body.user ?? appointment.user)?.toString();
    const targetDate = body.date ?? appointment.date;
    const isNewReservation = !appointment.user && targetUserId;

    if (targetUserId && targetDate && (isNewReservation || body.user)) {
      const alreadyBooked = await userHasAppointmentOnDate(
        targetUserId,
        targetDate,
        id
      );

      if (alreadyBooked) {
        return NextResponse.json(
          { error: "Ya tienes una cita reservada para este día" },
          { status: 409 }
        );
      }
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
