import { NextRequest, NextResponse } from "next/server";
import Appointment from "@/models/Appointment";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    dbConnect();
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
    dbConnect();
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

export async function PUT(req: NextRequest) {
  try {
    dbConnect();
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");
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

export async function DELETE(req: NextRequest) {
  try {
    dbConnect();
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");
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
