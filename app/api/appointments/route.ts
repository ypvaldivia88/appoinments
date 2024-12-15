import { NextRequest, NextResponse } from "next/server";
import Appointment from "@/models/Appointment";

export async function GET() {
  try {
    const data = await Appointment.find();
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

export async function PUT(req: NextRequest, params: { _id: number }) {
  try {
    const { _id } = params;
    const data = await Appointment.findByIdAndUpdate(_id, await req.json(), {
      new: true,
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in PUT function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, params: { _id: number }) {
  try {
    const { _id } = params;
    await Appointment.findByIdAndDelete(_id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error("Error in DELETE function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
