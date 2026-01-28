export const appointmentTypeDefs = /* GraphQL */ `
  type Appointment {
    name: String!
    email: String!
    department: String!
    time: String!
    createdAt: String!
  }

  input AppointmentInput {
    name: String!
    email: String!
    department: String!
    time: String!
  }

  type BookAppointmentPayload {
    success: Boolean!
    message: String!
    appointment: Appointment!
  }

  extend type Mutation {
    bookAppointment(input: AppointmentInput!): BookAppointmentPayload!
  }
`;
