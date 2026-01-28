import { gql } from "@apollo/client";

export type AppointmentInput = {
  name: string;
  email: string;
  department: string;
  time: string;
};

export type Appointment = AppointmentInput & {
  createdAt: string;
};

export type BookAppointmentPayload = {
  success: boolean;
  message: string;
  appointment: Appointment;
};

export type BookAppointmentMutationData = {
  bookAppointment: BookAppointmentPayload;
};

export type BookAppointmentMutationVars = {
  input: AppointmentInput;
};

export const BOOK_APPOINTMENT_MUTATION = gql`
  mutation BookAppointment($input: AppointmentInput!) {
    bookAppointment(input: $input) {
      success
      message
      appointment {
        name
        email
        department
        time
        createdAt
      }
    }
  }
`;

