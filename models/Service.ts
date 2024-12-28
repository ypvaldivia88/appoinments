import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  duration: number; // duration in minutes
}

const ServiceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
});

const Service =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
