import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/db"; // Fixed import path

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sessionToken = req.cookies.session;
    if (!sessionToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { phone: sessionToken },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
