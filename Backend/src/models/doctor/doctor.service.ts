import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { DoctorModel } from "./doctor.model";
import bcrypt from "bcryptjs";
import { existingEmail, passwordLength, requiredTrimmed, validateEmailFormat, validateGender, validatePhone } from "../../utils/registrationUtils";
import { signToken } from "../../utils/jwt";

export type SignupDoctorInput = {
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other" | "prefer-not-to-say";
    address?: string;
    assignedDoctors: any[];
    certifications?: {
        name: string;
        base64: string;
    }[];
};


export async function signupDoctor(input: SignupDoctorInput) {
    const firstName = requiredTrimmed(input?.firstName, "firstName");
    const lastName = requiredTrimmed(input?.lastName, "lastName");
    const email = requiredTrimmed(input?.email, "email").toLowerCase();
    const phone = requiredTrimmed(input?.phone, "phone");
    const dateOfBirth = new Date(requiredTrimmed(input?.dateOfBirth, "dateOfBirth"));
    const gender = requiredTrimmed(input?.gender, "gender").toLowerCase();
    const address = input?.address?.trim();
    const password = requiredTrimmed(input?.password, "password");
    const certifications = input.certifications || [];


    try {
        validateEmailFormat(email);
        validatePhone(phone);
        validateGender(gender);
        passwordLength(password);

        await existingEmail(email);

        const passwordHash = await bcrypt.hash(password, 12);

        const certsBuffer = certifications.map((c) => ({
            name: c.name,
            pdf: Buffer.from(c.base64, "base64"),
        }));

        const doctorDoc = await DoctorModel.create({
            firstName,
            lastName,
            email,
            phone,
            dateOfBirth,
            gender,
            address,
            certifications: certsBuffer,
            passwordHash,
            role: "doctor",
        });

        const token = signToken({ _id: doctorDoc._id.toString(), email: doctorDoc.email });

        return { doctorDoc, token };
    } catch (err) {
        console.error("signupDoctor error:", err);

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
