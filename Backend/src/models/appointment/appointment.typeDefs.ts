export const appointmentTypeDefs = /* GraphQL */ `
  type Appointment {
    doctor_id: ID!
    patient_id: ID!
    time: String!
    status: String!
  }

  input AppointmentInput {
    doctor_id: ID!
    jwtToken: String!
    time: String!
  }

  type BookAppointmentPayload {
    success: Boolean!
    appointment: Appointment!
  }

  type GetAppointmentPayload {
    id: ID!
    doctorNameFirst: String!
    patientNameFirst: String!
    time: String!
    status: String!
  }

  extend type Query {
    getAllAppointments: [GetAppointmentPayload!]!
  }
  input ChangeAppointmentStatusInput {
    appointmentId: ID!
    jwtToken: String!
    status: String!
  }

  type AppointmentStatusPayload {
    id: ID!
    status: String!
  }

  type ChangeAppointmentStatusPayload { 
    success: Boolean!
    appointment: AppointmentStatusPayload!
  }
  
  extend type Mutation {
    updateStatus(input: ChangeAppointmentStatusInput!): ChangeAppointmentStatusPayload!
    bookAppointment(input: AppointmentInput!): BookAppointmentPayload!
  }
`;
