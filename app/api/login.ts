import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/db"; // Fixed import path

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // add login endpoint
    if (req.method === "POST") {
      const { phone, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { phone },
      });
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" }); // Unauthorized
      }
      if (user.password !== password) {
        return res.status(401).json({ error: "Unauthorized" }); // Unauthorized
      }
      res.status(200).json(user);
    } else {
      res.status(405).json({ error: "Method Not Allowed" }); // Method Not Allowed
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Internal Server Error
  }
}
