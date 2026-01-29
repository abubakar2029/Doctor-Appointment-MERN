import { gql } from "@apollo/client";

export type AppointmentInput = {
  doctor_id: string;
  jwtToken: string;
  time: string;
};

export type Appointment = {
  doctor_id: string;
  patient_id: string;
  time: string;
  status: string;
};

export type BookAppointmentPayload = {
  success: boolean;
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
      appointment {
        doctor_id
        patient_id
        time
        status
      }
    }
  }
`;

