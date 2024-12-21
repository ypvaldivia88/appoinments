import { NextRequest, NextResponse } from "next/server";
import Appointment from "@/app/models/Appointment";
import dbConnect from "@/app/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    const data = await Appointment.find().populate("services");
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
  try {
    const conn = await dbConnect();
    console.log("Connection:", conn);
    
    const appointment = new Appointment(await req.json());
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
