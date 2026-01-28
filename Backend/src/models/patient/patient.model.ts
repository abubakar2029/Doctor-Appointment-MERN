import mongoose, { Schema } from "mongoose";

// GraphQL Patient fields (+ internal passwordHash for auth).
export type Patient = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other" | "prefer-not-to-say";
  address?: string;
  passwordHash: string;
};

export type PatientDocument = mongoose.HydratedDocument<Patient>;

const PatientSchema = new Schema<Patient>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 320,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
      unique: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    dateOfBirth: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: ["male", "female", "other", "prefer-not-to-say"],
    },
    address: {
      type: String,
      required: false,
      trim: true,
      maxlength: 500,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
  }
);

export const PatientModel =
  mongoose.models.Patient || mongoose.model<Patient>("Patient", PatientSchema);