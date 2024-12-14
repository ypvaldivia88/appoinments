import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../lib/db"; // Import Mongoose connection
import Appointment from "../models/Appointment"; // Import Mongoose Appointment model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase(); // Ensure database connection

  try {
    if (req.method === "GET") {
      const appointments = await Appointment.find().populate("user");
      res.status(200).json(appointments);
    } else if (req.method === "DELETE") {
      const { id } = req.body;
      await Appointment.findByIdAndDelete(id);
      res.status(204).end();
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
