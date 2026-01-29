import mongoose, { Schema } from "mongoose";
import { ref } from "process";

export type Doctor = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other" | "prefer-not-to-say";
  address?: string;
  passwordHash: string;
  patients: mongoose.Types.ObjectId[];
  certifications: {
    name: string;
    pdf: Buffer;
  }[];
  role: "doctor";
};

export type DoctorDocument = mongoose.HydratedDocument<Doctor>;

const DoctorSchema = new Schema<Doctor>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: ["male", "female", "other", "prefer-not-to-say"],
    },
    address: {
      type: String,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    patients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],

    certifications: [
      {
        name: {
          type: String,
          required: true,
        },
        pdf: {
          type: Buffer,
          required: true,
          select: false,
        },
      },
    ],
    role: {
      type: String,
      enum: ["doctor"],
      default: "doctor",
      immutable: true, // 👈 prevents updates later
    },

  }

);

export const DoctorModel =
  mongoose.models.Doctor || mongoose.model<Doctor>("Doctor", DoctorSchema);