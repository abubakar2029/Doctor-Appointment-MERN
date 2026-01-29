import { gql } from "@apollo/client";


export type ChangeAppointmentStatusInput = {
    appointmentId: string;
    jwtToken: string;
    status: string;
};

export type ChangeAppointmentStatusPayload = {
    success: boolean;
    appointment: {
        id: string;
        status: string;
    };
};

export type ChangeAppointmentStatusMutationData = {
    changeAppointmentStatus: ChangeAppointmentStatusPayload;
};


export type ChangeAppointmentStatusMutationVars = {
    input: ChangeAppointmentStatusInput;
};

export const CHANGE_APPOINTMENT_STATUS_MUTATION = gql`
  mutation updateStatus($input: ChangeAppointmentStatusInput!) {
    updateStatus(input: $input) {
        success
        appointment {
            id
            status
        }   
    }
  }
`;