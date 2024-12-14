import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/db"; // Import Mongoose connection
import bcrypt from "bcryptjs";
import User from "@/models/User"; // Import Mongoose User model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase(); // Ensure database connection
  const {
    query: { id, name, phone, password, isAdmin, appointments },
    method,
  } = req;
  const hashedPassword = password
    ? bcrypt.hashSync(password as string, 10)
    : "";
  try {
    switch (method) {
      case "GET":
        const users = await User.find();
        res.status(200).json(users);
        break;
      case "PUT":
        const data = await User.findByIdAndUpdate(id, {
          name,
          phone,
          password: hashedPassword,
          isAdmin,
          appointments,
        });
        res.status(200).json(data);
        break;
      case "POST":
        const user = new User({
          name,
          phone,
          password: hashedPassword,
          isAdmin,
          appointments,
        });
        await user.save();
        res.status(201).json(user);
        break;
      case "DELETE":
        await User.findByIdAndDelete(id);
        res.status(204).end();
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
