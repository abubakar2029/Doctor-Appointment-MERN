export const patientTypeDefs = /* GraphQL */ `

  type User {
    id: ID!
    email: String!
  }

  type CheckTokenPayload {
    success: Boolean!
    user: User
  }

  type Patient {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    dateOfBirth: String!
    gender: String!
    address: String
    createdAt: String!
  }

  input SignupPatientInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    dateOfBirth: String!
    gender: String!
    address: String
    password: String!
  }

  type SignupPatientPayload {
    success: Boolean!
    message: String!
    token: String!
    patient: Patient!
  }

  extend type Query {
    checkToken: CheckTokenPayload!
  }

  extend type Mutation {
    signupPatient(input: SignupPatientInput!): SignupPatientPayload!
  }
`;

