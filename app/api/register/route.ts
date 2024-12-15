import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User"; // Import Mongoose User model

export default async function handler(req: NextRequest) {
  const { method } = req;

  try {
    switch (method) {
      case "POST":
        const { name, phone, password, isAdmin } = await req.json();
        const hashedPassword = password ? bcrypt.hashSync(password, 10) : "";

        // verify if user exists
        const exists = await User.findOne({ phone });
        if (exists) {
          return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
          );
        }

        const user = new User({
          name,
          phone,
          password: hashedPassword,
          isAdmin,
        });

        await user.save();
        return NextResponse.json(user, { status: 200 });

      default:
        return NextResponse.json(
          { error: `Method ${method} Not Allowed` },
          { status: 405, headers: { Allow: "POST" } }
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
