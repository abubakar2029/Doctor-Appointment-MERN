import { Query } from "mongoose";
import { AppointmentModel, type AppointmentDocument } from "./appointment.model";
import { createAppointment } from "./appointment.service";
import { verifyToken } from "../../utils/jwt";

type BookAppointmentArgs = {
  input: {
    doctor_id: string;
    jwtToken: string;
    time: string;
  };
};

export const appointmentResolvers = {
  Query: {
    getAllAppointments: async (): Promise<any[]> => {

      const appointments = await AppointmentModel.find({})
        .select("doctor_id patient_id time status")
        .populate({ path: "doctor_id", select: "firstName" })
        .populate({ path: "patient_id", select: "firstName" });
      console.log(appointments);

      try {
        return appointments.map((appt) => ({
          id: appt._id.toString(),
          doctorNameFirst: appt.doctor_id.firstName,
          patientNameFirst: appt.patient_id.firstName,
          time: appt.time,
          status: appt.status,
        }));

      } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
      }
    },
  },

  Mutation: {
    bookAppointment: async (
      _parent: unknown,
      args: BookAppointmentArgs
    ) => {
      const doc: AppointmentDocument = await createAppointment(args.input);

      return {
        success: true,
        appointment: {
          doctor_id: doc.doctor_id.toString(),
          patient_id: doc.patient_id.toString(),
          time: doc.time,
          status: doc.status,
        },
      };
    },

    updateStatus: async (
      _parent: unknown,
      args: { input: { appointmentId: string; status: string; jwtToken: string } }
    ) => {

      try {

        verifyToken(args.input.jwtToken);
        const doc = await AppointmentModel.findByIdAndUpdate(
          args.input.appointmentId,
          { status: args.input.status },
          { new: true }
        );


        return {
          success: true,
          appointment: {
            id: doc._id.toString(),
            status: doc.status,
          },
        };
      } catch (error) {
        throw new Error("Failed to update appointment status");
      }
    }
  },
};
