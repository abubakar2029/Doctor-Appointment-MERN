export const doctorTypeDefs = /* GraphQL */ `
  scalar Date

  type AuthUser {
    id: ID!
    email: String!
  }

  type CheckTokenPayload {
    success: Boolean!
    user: AuthUser
  }

  type Certification {
    name: String!
  }

  type Doctor {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    dateOfBirth: String!
    gender: String!
    address: String
    certifications: [Certification!]
    role: String!
  }

  input CertificationInput {
    name: String!
    base64: String!
  }

  input SignupDoctorInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
    dateOfBirth: String!
    gender: String!
    address: String
    certifications: [CertificationInput!]
  }

  type SignupDoctorPayload {
    success: Boolean!
    token: String!
    doctor: Doctor!
  }

  type getAllDoctorsPayload {
    id: ID!
    firstName: String!
  }
    
  extend type Query {
    checkToken: CheckTokenPayload!
    getAllDoctors: [getAllDoctorsPayload!]!
  }

  extend type Mutation {
    signupDoctor(input: SignupDoctorInput!): SignupDoctorPayload!
  }
`;
