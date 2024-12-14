import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt"; // Import bcrypt

export interface IUser extends Document {
  name: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  appointments: mongoose.Types.ObjectId[]; // Add appointments field
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Ensure password is not selected by default
  isAdmin: { type: Boolean, default: false },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }], // Add appointments field
});

// Encrypt password before saving
UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as IUser;
  return bcrypt.compare(candidatePassword, user.password);
};

// Ensure password is selected when needed
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
