import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User"; // Import Mongoose User model

export default async function handler(req: NextRequest) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        // get session from cookies
        const session = req.cookies.get("session");

        if (!session) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const {
          user: { id },
        } = JSON.parse(session.value);
        const user = await User.findById(id);

        if (!user) {
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          );
        }

        return NextResponse.json({
          _id: user._id,
          name: user.name,
          phone: user.phone,
          isAdmin: user.isAdmin,
          appointments: user.appointments,
        });

      default:
        return NextResponse.json(
          { error: `Method ${method} Not Allowed` },
          { status: 405, headers: { Allow: "GET" } }
        );
    }
  } catch (error) {
    console.error("Error in handler function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
