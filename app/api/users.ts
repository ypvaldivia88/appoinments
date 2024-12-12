import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
