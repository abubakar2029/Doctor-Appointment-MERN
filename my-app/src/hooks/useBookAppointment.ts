import { useMutation } from "@apollo/client/react";
import {
  BOOK_APPOINTMENT_MUTATION,
  type BookAppointmentMutationData,
  type BookAppointmentMutationVars,
} from "../graphql/mutations/bookAppointment";

export function useBookAppointment() {
  const [mutate, { data, loading, error, reset }] = useMutation<
    BookAppointmentMutationData,
    BookAppointmentMutationVars
  >(BOOK_APPOINTMENT_MUTATION);

  return {
    bookAppointment: (vars: BookAppointmentMutationVars) => mutate({ variables: vars }),
    data,
    loading,
    error,
    reset,
  };
}

