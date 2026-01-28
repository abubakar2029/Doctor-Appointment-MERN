import type { Patient } from "./patient.model";
import { signupPatient } from "./patient.service";
import { PatientModel } from "./patient.model";
import { verifyToken } from "../../utils/jwt";

type SignupPatientArgs = {
    input: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        dateOfBirth: string;
        gender: string;
        address?: string;
        password: string;
    };
};

export const patientResolvers = {
    Query: {
        checkToken: async (
            _parent: unknown,
            _args: unknown,
            context: { authHeader?: string }
        ): Promise<{
            success: boolean;
            user: null | { id: string; email: string };
        }> => {
            const auth = context.authHeader ?? "";

            if (!auth.toLowerCase().startsWith("bearer ")) {
                return { success: false, user: null };
            }

            const token = auth.slice(7).trim();

            console.log("Token : ", token);

            try {
                const decoded = verifyToken(token);

                console.log("Decoded : ", decoded);

                const patient = await PatientModel
                    .findById(decoded.sub)
                    .select("firstName email");


                console.log(patient);

                if (!patient) {
                    return { success: false, user: null };
                }

                return {
                    success: true,
                    user: {
                        id: patient._id.toString(),
                        email: patient.email,
                    },
                };
            } catch {
                return { success: false, user: null };
            }
        },
    },

    Mutation: {
        signupPatient: async (
            _parent: unknown,
            args: SignupPatientArgs
        ): Promise<{
            success: boolean;
            message: string;
            token: string;
            patient: {
                firstName: string;
                lastName: string;
                email: string;
                phone: string;
                dateOfBirth: string;
                gender: string;
                address?: string;
            };
        }> => {
            const { patientDoc, token } = await signupPatient(args.input);

            const patient: Patient = patientDoc.toObject();



            return {
                success: true,
                message: "Patient account created successfully",
                token,
                patient: {
                    firstName: patient.firstName,
                    lastName: patient.lastName,
                    email: patient.email,
                    phone: patient.phone,
                    dateOfBirth: patient.dateOfBirth,
                    gender: patient.gender,
                    address: patient.address,
                },
            };
        },
    },
};
