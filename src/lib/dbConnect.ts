import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  return uri;
}

async function dbConnect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const options = {
    bufferCommands: false,
  };
  cachedConnection = await mongoose.connect(getMongoUri(), options);

  return cachedConnection;
}

export default dbConnect;
