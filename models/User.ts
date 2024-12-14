import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  name: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  appointments: mongoose.Types.ObjectId[]; // Add appointments field
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }], // Add appointments field
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
