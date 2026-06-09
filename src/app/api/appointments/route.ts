// Code for the /api/appointments route
import { NextRequest, NextResponse } from "next/server";
import Appointment from "@/models/Appointment";
import dbConnect from "@/lib/dbConnect";
import { requireAuth } from "@/lib/apiAuth";
import { getUserId, isAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  // Check authentication
  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    await dbConnect();
    const currentUserId = getUserId(req);
    const userIsAdmin = isAdmin(req);

    let data;
    if (userIsAdmin) {
      // Admins can see all appointments
      data = await Appointment.find().populate("user");
    } else {
      // Regular users can only see their own appointments
      data = await Appointment.find({ user: currentUserId }).populate("user");
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  // Check authentication
  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    await dbConnect();

    const appointmentData = await req.json();
    const currentUserId = getUserId(req);
    const userIsAdmin = isAdmin(req);

    // If not admin, force the appointment to be associated with the current user
    if (!userIsAdmin) {
      appointmentData.user = currentUserId;
    }

    const appointment = new Appointment(appointmentData);
    const data = await appointment.save();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
