import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import mongoose from "mongoose";
import { AppointmentModel, AppointmentDocument } from "./appointment.model";
import { requiredTrimmed } from "../../utils/registrationUtils";
import { decodeToken } from "../../utils/jwt";

export type CreateAppointmentInput = {
  doctor_id: string;
  jwtToken: string;
  time: string;
};


export async function createAppointment(
  input: CreateAppointmentInput
): Promise<AppointmentDocument> {
  const time = requiredTrimmed(input.time, "time");
  const doctor_id = requiredTrimmed(input.doctor_id, "doctor_id");
  const jwtToken = requiredTrimmed(input.jwtToken, "jwtToken");
  const patient_id = decodeToken(jwtToken).sub;

  try {
    return await AppointmentModel.create({
      doctor_id: new mongoose.Types.ObjectId(doctor_id),
      patient_id: new mongoose.Types.ObjectId(patient_id),
      time,
    });
  } catch (err) {
    console.error("Error in appointment.service.ts:", err);
    throw new GraphQLError("Failed to book appointment", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    });
  }
}
