import { DoctorModel } from "./doctor.model";
import { signupDoctor, SignupDoctorInput } from "./doctor.service";
import { verifyToken } from "../../utils/jwt";

type SignupDoctorArgs = {
    input: SignupDoctorInput;
};

export const doctorResolvers = {
    Query: {
        checkToken: async (
            _parent: unknown,
            _args: unknown,
            context: { authHeader?: string }
        ): Promise<{ success: boolean; user: null | { id: string; email: string } }> => {
            const auth = context.authHeader ?? "";
            if (!auth.toLowerCase().startsWith("bearer ")) return { success: false, user: null };
            const token = auth.slice(7).trim();

            try {
                const decoded = verifyToken(token);
                const doctor = await DoctorModel.findById(decoded.sub).select("firstName email");
                if (!doctor) return { success: false, user: null };
                return { success: true, user: { id: doctor._id.toString(), email: doctor.email } };
            } catch {
                return { success: false, user: null };
            }
        },
        getAllDoctors: async (): Promise<any[]> => {
            console.log("In the Query");

            const doctors = await DoctorModel.find({}).select("_id firstName");
            return doctors.map((doc) => ({
                id: doc._id.toString(),
                firstName: doc.firstName,
            }));
        },
    },

    Mutation: {
        signupDoctor: async (
            _parent: unknown,
            args: SignupDoctorArgs
        ): Promise<{
            success: boolean;
            token: string;
            doctor: {
                firstName: string;
                lastName: string;
                email: string;
                phone: string;
                dateOfBirth: string;
                gender: string;
                address?: string;
                certifications?: { name: string }[];
            };
        }> => {
            const { doctorDoc, token } = await signupDoctor(args.input);
            const docObj = doctorDoc.toObject();

            return {
                success: true,
                token,
                doctor: {
                    firstName: docObj.firstName,
                    lastName: docObj.lastName,
                    email: docObj.email,
                    phone: docObj.phone,
                    dateOfBirth: docObj.dateOfBirth,
                    gender: docObj.gender,
                    address: docObj.address,
                    certifications: docObj.certifications?.map((c: any) => ({ name: c.name })),
                },
            };
        },
    },
};
