import mongoose, { Schema, Document, Model } from "mongoose";

interface IAppointment extends Document {
  date: Date;
  description: string;
  userId: mongoose.Types.ObjectId;
}

const AppointmentSchema: Schema<IAppointment> = new Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ensure reference to User model
});

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
