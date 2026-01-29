import { gql } from "@apollo/client";
import type { AppointmentStatus } from "@/pages/main/AppointmentsPage";

export const GET_ALL_Appointments = gql`
  query getAllAppointments {
    getAllAppointments {
      id
      patientNameFirst
      doctorNameFirst
      time
      status
    }
  }
`;

export type GetAllAppointmentsData = {
  getAllAppointments: Array<{
    id: string;
    patientNameFirst: string;
    doctorNameFirst: string;
    time: string;
    status: AppointmentStatus;
  }>;
};
