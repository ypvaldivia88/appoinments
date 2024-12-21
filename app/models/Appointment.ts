import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAppointment extends Document {
  date: Date;
  time: string;
  note?: string;
  _id: string;
  userId?: string;
  services?: string[];
}

const AppointmentSchema: Schema<IAppointment> = new Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  note: { type: String, required: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
});

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
