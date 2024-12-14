import mongoose, { Schema, Document, Model } from "mongoose";

interface IAppointment extends Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  description: string;
}

const AppointmentSchema: Schema<IAppointment> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
