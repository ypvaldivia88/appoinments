import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import User from "@/models/User"; // Import Mongoose User model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { name, phone, password, isAdmin },
    method,
  } = req;
  const hashedPassword = password
    ? bcrypt.hashSync(password as string, 10)
    : "";
  try {
    switch (method) {
      case "POST":
        // verify if user exists
        const exists = await User.findOne({ phone });
        if (exists) {
          res.status(400).json({ error: "User already exists" });
          return;
        }

        const user = new User({
          name,
          phone,
          password: hashedPassword,
          isAdmin,
        });

        await user.save();
        res.status(200).json(user);
        break;

      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
