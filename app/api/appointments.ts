import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/db"; // Fixed import path

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const appointments = await prisma.appointment.findMany({
        include: { user: true },
      });
      res.status(200).json(appointments);
    } else if (req.method === "DELETE") {
      const { id } = req.body;
      await prisma.appointment.delete({ where: { id } });
      res.status(204).end(); // No Content
    } else {
      res.status(405).json({ error: "Method Not Allowed" }); // Method Not Allowed
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Internal Server Error
  }
}
