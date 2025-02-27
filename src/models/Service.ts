import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  duration: number;
  category?: string;
}

const ServiceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
});

const Service =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
