import { appointmentTypeDefs } from "../models/appointment/appointment.typeDefs";
import { patientTypeDefs } from "../models/patient/patient.typeDefs";

const baseTypeDefs = /* GraphQL */ `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [baseTypeDefs, appointmentTypeDefs, patientTypeDefs];

