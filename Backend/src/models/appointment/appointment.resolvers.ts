import type { Appointment } from "./appointment.model";
import { createAppointment } from "./appointment.service";

type BookAppointmentArgs = {
  input: {
    name: string;
    email: string;
    department: string;
    time: string;
  };
};

export const appointmentResolvers = {
  Mutation: {
    bookAppointment: async (
      _parent: unknown,
      args: BookAppointmentArgs
    ): Promise<{
      success: boolean;
      message: string;
      appointment: {
        name: string;
        email: string;
        department: string;
        time: string;
        createdAt: string;
      };
    }> => {
      const doc = await createAppointment(args.input);

      // GraphQL type defines createdAt as String!
      const createdAt = new Date(doc.createdAt).toISOString();

      const appointment: Appointment = doc.toObject();

      return {
        success: true,
        message: "Appointment booked successfully",
        appointment: {
          name: appointment.name,
          email: appointment.email,
          department: appointment.department,
          time: appointment.time,
          createdAt,
        },
      };
    },
  },
};

