import mongoose, { Schema } from "mongoose";

// - createdAt is backend-generated via timestamps
export type Appointment = {
  name: string;
  email: string;
  department: string;
  time: string;
  createdAt: Date;
};

export type AppointmentDocument = mongoose.HydratedDocument<Appointment>;

const AppointmentSchema = new Schema<Appointment>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 320,
      // Reasonable production validation; does not add fields.
      match:
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
    },
    department: {
      type: String,
      required: true,
      trim: true,
      // Align with current frontend select options.
      enum: ["cardiology", "neurology", "orthopedics"],
    },
    time: {
      type: String,
      required: true,
      trim: true,
      // Align with current frontend select options.
      enum: ["4:00", "5:00", "6:00"],
    },
    // createdAt is added by timestamps
  },
  {
    timestamps: true, // adds createdAt/updatedAt
    versionKey: false,
  }
);

// Prevent model overwrite in dev/watch environments.
export const AppointmentModel =
  mongoose.models.Appointment ||
  mongoose.model<Appointment>("Appointment", AppointmentSchema);

