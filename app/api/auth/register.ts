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
      const { name, phone, password } = req.body;
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return res.status(409).json({ error: "already exists" });
      }
      const newUser = new User({ name, phone, password });
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
