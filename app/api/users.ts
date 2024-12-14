import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../lib/db"; // Import Mongoose connection
import bcrypt from "bcryptjs";
import User from "../models/User"; // Import Mongoose User model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase(); // Ensure database connection

  try {
    if (req.method === "GET") {
      const users = await User.find();
      res.status(200).json(users);
    } else if (req.method === "POST") {
      const { name, phone, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = new User({ name, phone, password: hashedPassword });
      await user.save();
      res.status(201).json(user);
    } else if (req.method === "PUT") {
      const { phone, name, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await User.findOneAndUpdate(
        { phone },
        { name, password: hashedPassword },
        { new: true }
      );
      res.status(200).json(user);
    } else if (req.method === "DELETE") {
      const { phone } = req.body;
      await User.findOneAndDelete({ phone });
      res.status(204).end();
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
