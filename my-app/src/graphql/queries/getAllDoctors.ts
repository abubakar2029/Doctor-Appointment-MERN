import { gql } from "@apollo/client";

export const GET_ALL_DOCTORS_QUERY = gql`
  query getAllDoctors {
    getAllDoctors {
      id
      firstName
    }
  }
`;

export type GetAllDoctorsData = {
  getAllDoctors: Array<{
    id: string;
    firstName: string;
  }>;
};
