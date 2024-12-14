import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/db"; // Import Mongoose connection
import User from "../../models/User"; // Import Mongoose User model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase(); // Ensure database connection

  try {
    const sessionToken = req.cookies.session;
    if (!sessionToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findOne({ phone: sessionToken });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
