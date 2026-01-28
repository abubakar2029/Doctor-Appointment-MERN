import { gql } from "@apollo/client";

export const PATIENT_LOGIN_MUTATION = gql`
  mutation loginPatient(
    $email: String!
    $password: String!
  ) {
    loginPatient(
      email: $email
      password: $password
    ) {
      success
      message
      token
      patient {
        id
        firstName
        email
      }
    }
  }
`;
