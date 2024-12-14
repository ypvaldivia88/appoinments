import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/app/lib/db"; // Import Mongoose connection
import User from "@/app/models/User"; // Import Mongoose User model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase(); // Ensure database connection
  const {
    query: { phone, password },
    method,
  } = req;
  const hashedPassword = password
    ? bcrypt.hashSync(password as string, 10)
    : "";
  try {
    switch (method) {
      case "POST":
        const user = await User.findOne({
          phone: phone as string,
          password: hashedPassword,
        });
        if (!user) {
          res.status(401).json({ error: "Invalid credentials" });
          return;
        }
        // add user to session in localstore
        localStorage.setItem("session", JSON.stringify({ user: user }));
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
