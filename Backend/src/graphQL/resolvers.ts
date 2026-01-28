import { appointmentResolvers } from "../models/appointment/appointment.resolvers";
import { patientResolvers } from "../models/patient/patient.resolvers";

export const resolvers = {
  Query: {
    ...(appointmentResolvers as any).Query,
    ...(patientResolvers as any).Query,
  },
  Mutation: {
    ...(appointmentResolvers as any).Mutation,
    ...(patientResolvers as any).Mutation,
  },
};

