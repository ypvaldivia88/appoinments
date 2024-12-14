import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/db"; // Import Mongoose connection
import User from "../../models/User"; // Import Mongoose User model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase(); // Ensure database connection

  try {
    if (req.method === "POST") {
      const { phone, password } = req.body;
      const user = await User.findOne({ phone });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      res.status(200).json(user);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
