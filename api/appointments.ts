import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../lib/db"; // Import Mongoose connection
import Appointment from "../models/Appointment"; // Import Mongoose User model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase(); // Ensure database connection
  const {
    query: { id, date, description, userId },
    method,
  } = req;
  let dbres;
  try {
    switch (method) {
      case "GET":
        dbres = await Appointment.find();
        res.status(200).json(dbres);
        break;
      case "PUT":
        dbres = await Appointment.findByIdAndUpdate(id, {
          date,
          description,
          userId,
        });
        res.status(200).json(dbres);
        break;
      case "POST":
        const appointment = new Appointment({
          date,
          description,
          userId,
        });
        dbres = await appointment.save();
        res.status(201).json(dbres);
        break;
      case "DELETE":
        await Appointment.findByIdAndDelete(id);
        res.status(204).end();
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
