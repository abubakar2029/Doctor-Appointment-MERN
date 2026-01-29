import mongoose, { Schema } from "mongoose";

export type Appointment = {
  doctor_id: mongoose.Types.ObjectId;
  patient_id: mongoose.Types.ObjectId;
  time: string;
  status: string;
};

export type AppointmentDocument = mongoose.HydratedDocument<Appointment>;

const AppointmentSchema = new Schema<Appointment>(
  {
    status: {
      type: String,
      enum: ["Pending", "confirmed", "canceled", "completed"],
      default: "Pending",
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patient_id: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AppointmentModel =
  mongoose.models.Appointment ||
  mongoose.model<Appointment>("Appointment", AppointmentSchema);

