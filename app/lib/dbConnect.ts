// dbConnect.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedConnection: typeof mongoose | null = null;

async function dbConnect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const options = {
    bufferCommands: false,
  };
  cachedConnection = await mongoose.connect(MONGODB_URI, options);

  return cachedConnection;
}

export default dbConnect;
