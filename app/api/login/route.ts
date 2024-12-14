import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/db"; // Import Mongoose connection
import User from "@/models/User"; // Import Mongoose User model

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const { phone, password } = req.body;

    // Find user by phone
    const user = await User.findOne({ phone }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid phone or password" });
    }

    // Compare passwords
    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid phone or password" });
    }

    // Authentication successful
    res.status(200).json({ message: "Login successful", user: user.toJSON() });
  } catch (error) {
    console.error("Error in POST function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
