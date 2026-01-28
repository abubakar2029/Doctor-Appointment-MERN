import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PatientModel } from "../patient/patient.model"; // mongoose/sequelize model

export const authResolvers = {
    Mutation: {
        loginPatient: async (_: any, { email, password }: any) => {
            try {
                // 1. Find patient
                const patient = await PatientModel.findOne({ email });
                if (!patient) {
                    return {
                        success: false,
                        message: "Invalid credentials",
                    };
                }

                // 2. Compare password
                const isMatch = await bcrypt.compare(password, patient.passwordHash);
                if (!isMatch) {
                    return {
                        success: false,
                        message: "Invalid credentials",
                    };
                }

                const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";

                // 3. Generate JWT
                const token = jwt.sign(
                    { id: patient._id, email: patient.email },
                    JWT_SECRET,
                    { expiresIn: "7d" }
                );

                // 4. Success response
                return {
                    success: true,
                    token,
                    patient: {
                        id: patient._id,
                        firstName: patient.firstName,
                        email: patient.email,
                    },
                };
            } catch (error) {
                console.error(error);
                return {
                    success: false,
                    message: "Internal server error",
                };
            }
        },
    },
};
