import { gql } from "@apollo/client";

export const DOCTOR_SIGNUP_MUTATION = gql`

  mutation signupDoctor(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phone: String!
    $dateOfBirth: String!
    $gender: String!
    $address: String
    $certifications: [CertificationInput!]
  ) {
    signupDoctor(
      input: {
        firstName: $firstName
        lastName: $lastName
        password: $password
        email: $email
        phone: $phone
        dateOfBirth: $dateOfBirth
        gender: $gender
        address: $address
        certifications: $certifications
      }
    ) {
      success
      token
      doctor {
        firstName
        lastName
        email
        phone
        dateOfBirth
        gender
        address
        certifications {
          name
        }
      }
    }
  }
`;
