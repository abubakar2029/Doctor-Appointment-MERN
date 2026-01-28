import { gql } from "@apollo/client";

export const PATIENT_SIGNUP_MUTATION = gql`
  mutation signupPatient(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phone: String!
    $dateOfBirth: String!
    $gender: String!
    $address: String
  ) {
    signupPatient(
      input: {
        firstName: $firstName
        lastName: $lastName
        password: $password 
        email: $email
        phone: $phone
        dateOfBirth: $dateOfBirth
        gender: $gender
        address: $address
      }
    ) {
      message
      success
      token
      patient {
        firstName
        lastName
        email
        phone
        dateOfBirth
        gender
        address
      }
    }
  }
`;
