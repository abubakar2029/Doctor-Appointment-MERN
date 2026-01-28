

export const authTypeDefs = /* GraphQL */`

  type LoginResponse {
    success: Boolean!
    token: String
    firstName: String
    email: String!
  }

  type Mutation {
    loginPatient(email: String!, password: String!): LoginResponse!
  }
`;
