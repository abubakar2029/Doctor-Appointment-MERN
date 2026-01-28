import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { PatientModel } from "./patient.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type SignupPatientInput = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address?: string;
    password: string;
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

export async function signupPatient(input: SignupPatientInput) {
    const firstName = requiredTrimmed(input?.firstName, "firstName");
    const lastName = requiredTrimmed(input?.lastName, "lastName");
    const email = requiredTrimmed(input?.email, "email").toLowerCase();
    const phone = requiredTrimmed(input?.phone, "phone");
    const dateOfBirth = requiredTrimmed(input?.dateOfBirth, "dateOfBirth");
    const gender = requiredTrimmed(input?.gender, "gender").toLowerCase();
    const address = input?.address?.trim();
    const password = requiredTrimmed(input?.password, "password");

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email)) {
        throw new GraphQLError("Invalid email address", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }

    // Validate phone format (basic validation)
    if (!/^\d{10,20}$/.test(phone.replace(/[\s\-\(\)]/g, ""))) {
        throw new GraphQLError("Invalid phone number", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }

    // Validate gender (matches frontend options)
    const validGenders = ["male", "female", "other", "prefer-not-to-say"];
    if (!validGenders.includes(gender)) {
        throw new GraphQLError("Invalid gender", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }


    if (password.length < 8) {
        throw new GraphQLError("Password must be at least 8 characters", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }

    try {
        // Check if email already exists
        const existingPatient = await PatientModel.findOne({ email });
        if (existingPatient) {
            throw new GraphQLError("Email already registered", {
                extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const patientDoc = await PatientModel.create({
            firstName,
            lastName,
            email,
            phone,
            dateOfBirth,
            gender,
            address,
            passwordHash,
        });

        const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";
        const token = jwt.sign(
            { sub: patientDoc._id.toString(), email: patientDoc.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return { success: true, patientDoc, token };
    } catch (err) {
        if (err instanceof GraphQLError) {
            throw err;
        }
        // Duplicate key (email) safety net
        if (
            typeof err === "object" &&
            err !== null &&
            // @ts-expect-error mongoose error shape
            err.code === 11000
        ) {
            throw new GraphQLError("Email already registered", {
                extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
            });
        }
        // Avoid leaking internal DB errors
        throw new GraphQLError("Failed to create patient account", {
            extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
        });
    }
}
