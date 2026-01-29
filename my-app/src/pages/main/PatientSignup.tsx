import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Check } from "lucide-react"
import PrimaryInput from "@/components/main/PrimaryInput"
import { useMutation } from "@apollo/client/react";
import { PATIENT_SIGNUP_MUTATION } from "@/graphql/mutations/patientSignup";
import { useNavigate } from "react-router-dom";
import { validateToken } from "@/lib/checkToken";
import { useApolloClient } from "@apollo/client/react";
import { Link } from "react-router-dom";

export default function PatientSignupForm() {

    const client = useApolloClient();

    useEffect(() => {
        const validate = validateToken(client);
        validate.then((isValid) => {
            if (isValid) {
                navigate("/");
            }
        });
    }, [client]);



    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        address: "",
    })
    const navigate = useNavigate();


    const [isSubmitted, setIsSubmitted] = useState(false)
    const [signupPatient, { loading, error }] = useMutation(PATIENT_SIGNUP_MUTATION);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const { data }: any = await signupPatient({
                variables: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    dateOfBirth: formData.dateOfBirth,
                    gender: formData.gender,
                    address: formData.address,
                },
            });

            if (data.signupPatient.success) {

                console.log(data);

                localStorage.setItem("payload", JSON.stringify(data.signupPatient));

                setTimeout(() => {
                    navigate("/");
                }, 2000);

                setIsSubmitted(true);

            }
        } catch (err) {
            console.error(err);
        }
    };



    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-teal-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">
                        Registration Complete
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Thank you for registering. We will contact you shortly.
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
                {/* Header */}
                <div className="bg-teal-600 px-6 py-8 rounded-t-2xl">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
                        Patient Registration
                    </h1>
                    <p className="text-teal-100 text-center mt-2 text-sm">
                        Please fill in your personal information
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                First Name *
                            </label>
                            <PrimaryInput
                                name="firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 !border-slate-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                Last Name *
                            </label>
                            <PrimaryInput
                                name="lastName"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 !border-slate-300"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                            Email Address *
                        </label>
                        <PrimaryInput
                            type="email"
                            name="email"
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 !border-slate-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                            Password *
                        </label>
                        <PrimaryInput
                            type="password"
                            name="password"
                            placeholder="#Y6&*U9@!"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 !border-slate-300"
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                            Phone Number *
                        </label>
                        <PrimaryInput
                            type="tel"
                            name="phone"
                            placeholder="+92 300 1234567"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 !border-slate-300"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                Date of Birth *
                            </label>
                            <PrimaryInput
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 !border-slate-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                Gender *
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 outline-none bg-white text-gray-600"
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                            Address
                        </label>
                        <textarea
                            name="address"
                            rows={3}
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Street, City, Country"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 outline-none resize-none"
                        />
                    </div>

                    {/* Terms */}
                    <div className="bg-slate-50 rounded-lg p-4">
                        <label className="flex items-start gap-3">
                            <input type="checkbox" required className="mt-1 w-4 h-4" />
                            <span className="text-sm text-slate-600">
                                I agree to the{" "}
                                <span className="text-teal-600">Terms of Service</span> and{" "}
                                <span className="text-teal-600">Privacy Policy</span>.
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
                        disabled={loading}
                    >
                        <Check className="w-5 h-5" />
                        {loading ? "Submitting..." : "Submit Registration"}
                    </button>
                    <div className="text-teal-600 text-sm flex flex-col gap-y-1 justify-center items-center">
                        <Link to="/doctorSignup" className="hover:underline">Register as Doctor</Link>
                        <Link to="/login" className="hover:underline">Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}
