import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { PatientModel } from "../models/patient/patient.model";

export function requiredTrimmed(value: unknown, fieldName: string): string {
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


export function validateEmailFormat(email: string): void {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email)) {
        throw new GraphQLError("Invalid email address", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }
}

export function validatePhone(phone: string): void {
    if (!/^\d{10,20}$/.test(phone.replace(/[\s\-\(\)]/g, ""))) {
        throw new GraphQLError("Invalid phone number", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }
}


export function validateGender(gender: string): void {
    const validGenders = ["male", "female", "other", "prefer-not-to-say"];
    if (!validGenders.includes(gender)) {
        throw new GraphQLError("Invalid gender", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }
}

export async function existingEmail(email: string): Promise<void> {
    const existingPatient = await PatientModel.findOne({ email });
    if (existingPatient) {
        throw new GraphQLError("Email already registered", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }
}


export async function passwordLength(password: string): Promise<void> {
    if (password.length < 8) {
        throw new GraphQLError("Password must be at least 8 characters", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }
}
