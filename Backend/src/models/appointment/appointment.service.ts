import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { AppointmentModel } from "./appointment.model";

export type AppointmentInput = {
  name: string;
  email: string;
  department: string;
  time: string;
};

function requiredTrimmed(value: unknown, fieldName: string): string {
  if (typeof value !== "string") {
    throw new GraphQLError(`${fieldName} is required`, {
      extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
    });
  }

  const trimmed = value.trim();
  if (!trimmed) {
    throw new GraphQLError(`${fieldName} is required`, {
      extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
    });
  }

  return trimmed;
}

export async function createAppointment(input: AppointmentInput) {
  const name = requiredTrimmed(input?.name, "name");
  const email = requiredTrimmed(input?.email, "email").toLowerCase();
  const department = requiredTrimmed(input?.department, "department");
  const time = requiredTrimmed(input?.time, "time");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email)) {
    throw new GraphQLError("Invalid email address", {
      extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
    });
  }


  try {
    return await AppointmentModel.create({
      name,
      email,
      department,
      time,
    });
  } catch (err) {
    // Avoid leaking internal DB errors
    throw new GraphQLError("Failed to book appointment", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    });
  }
}
