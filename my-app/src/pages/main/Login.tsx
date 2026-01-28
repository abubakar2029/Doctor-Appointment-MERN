import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Check } from "lucide-react";
import PrimaryInput from "@/components/main/PrimaryInput";
import { useMutation, useApolloClient } from "@apollo/client/react";
import { PATIENT_LOGIN_MUTATION } from "@/graphql/mutations/login";
import { useNavigate } from "react-router-dom";
import { validateToken } from "@/lib/checkToken";

export default function Login() {
    const navigate = useNavigate();
    const client = useApolloClient();

    useEffect(() => {
        validateToken(client).then((isValid) => {
            if (isValid) navigate("/");
        });
    }, [client, navigate]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loginPatient, { loading, error }] = useMutation(
        PATIENT_LOGIN_MUTATION
    );

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const { data }: any = await loginPatient({
                variables: {
                    email: formData.email,
                    password: formData.password,
                },
            });

            if (data.loginPatient.success) {
                localStorage.setItem("token", data.loginPatient.token);
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                {/* Header */}
                <div className="bg-teal-600 px-6 py-8 rounded-t-2xl text-center">
                    <h1 className="text-2xl font-bold text-white">Patient Login</h1>
                    <p className="text-teal-100 mt-2 text-sm">
                        Access your account securely
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                            Email Address
                        </label>
                        <PrimaryInput
                            type="email"
                            name="email"
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                            Password
                        </label>
                        <PrimaryInput
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">
                            Invalid credentials. Please retry.
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
                    >
                        <Check className="w-5 h-5" />
                        {loading ? "Authenticating..." : "Login"}
                    </button>
                </form>
            </div>
        </main>
    );
}
