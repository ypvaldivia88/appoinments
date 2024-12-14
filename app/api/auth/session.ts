import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/app/lib/db"; // Import Mongoose connection
import User from "@/app/models/User"; // Import Mongoose User model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase(); // Ensure database connection
  const {
    query: { id },
    method,
  } = req;

  try {
    switch (method) {
      case "GET":
        const user = await User.findById(id);

        if (!user) {
          res.status(404).json({ error: "User not found" });
          return;
        }

        res.status(200).json({
          _id: user._id,
          name: user.name,
          phone: user.phone,
          isAdmin: user.isAdmin,
          appointments: user.appointments,
        });
        break;

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
