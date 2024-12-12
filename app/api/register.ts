import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/db"; // Fixed import path

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // add register endpoint
    if (req.method === "POST") {
      const { name, phone, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { phone },
      });
      if (user) {
        return res.status(409).json({ error: "already exists" }); // Conflict
      }
      const newUser = await prisma.user.create({
        data: { name, phone, password },
      });
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Internal Server Error
  }
}
