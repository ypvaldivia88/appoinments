import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!;
const clientOptions = {
  serverApi: { version: "1" as const, strict: true, deprecationErrors: true },
};

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    isConnected = true;
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default connectToDatabase;
