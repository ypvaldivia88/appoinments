import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/db"; // Fixed import path
import bcrypt from "bcryptjs"; // Import bcrypt

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } else if (req.method === "POST") {
      const { name, phone, password } = req.body; // Removed isAdmin
      const hashedPassword = bcrypt.hashSync(password, 10); // Hash password
      const user = await prisma.user.create({
        data: { name, phone, password: hashedPassword }, // Removed isAdmin
      });
      res.status(201).json(user);
    } else if (req.method === "PUT") {
      const { phone, name, password } = req.body; // Removed isAdmin
      const hashedPassword = bcrypt.hashSync(password, 10); // Hash password
      const user = await prisma.user.update({
        where: { phone },
        data: { name, password: hashedPassword }, // Removed isAdmin
      });
      res.status(200).json(user);
    } else if (req.method === "DELETE") {
      const { phone } = req.body;
      await prisma.user.delete({
        where: { phone },
      });
      res.status(204).end(); // No Content
    } else {
      res.status(405).json({ error: "Method Not Allowed" }); // Method Not Allowed
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Internal Server Error
  }
}
