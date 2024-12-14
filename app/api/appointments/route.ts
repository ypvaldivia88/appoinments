import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const data = await Appointment.find();
    return res.status(201).json(data);
  } catch (error) {
    console.error("Error in GET function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const appointment = new Appointment(req.body);
    const data = await appointment.save();
    return res.status(201).json(data);
  } catch (error) {
    console.error("Error in POST function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const { id } = req.query;
    const data = await Appointment.findByIdAndUpdate(id, req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in PUT function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const { id } = req.query;
    await Appointment.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    console.error("Error in DELETE function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
