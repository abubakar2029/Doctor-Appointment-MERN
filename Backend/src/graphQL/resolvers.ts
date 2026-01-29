import { appointmentResolvers } from "../models/appointment/appointment.resolvers";
import { patientResolvers } from "../models/patient/patient.resolvers";
import { doctorResolvers } from "../models/doctor/doctor.resolvers";

export const resolvers = {
  Query: {
    ...(appointmentResolvers as any).Query,
    ...(patientResolvers as any).Query,
    ...(doctorResolvers as any).Query,
  },
  Mutation: {
    ...(doctorResolvers as any).Mutation,
    ...(appointmentResolvers as any).Mutation,
    ...(patientResolvers as any).Mutation,
  },
};

