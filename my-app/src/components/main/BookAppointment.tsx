import PrimaryInput from "./PrimaryInput";
import { useForm } from "react-hook-form";
import { useBookAppointment } from "../../hooks/useBookAppointment";
import type { AppointmentInput } from "../../graphql/mutations/bookAppointment";

export function BookAppointment() {
    const { bookAppointment, data, loading, error, reset: resetMutation } = useBookAppointment();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AppointmentInput>({
        defaultValues: {
            name: "",
            email: "",
            department: "",
            time: "4:00",
        },
        mode: "onSubmit",
    });

    const onSubmit = handleSubmit(async (values) => {
        console.log("Submitting appointment:", values);
        await bookAppointment({ input: values });
        reset();
    });

    const nameField = register("name", { required: "Name is required" });
    const emailField = register("email", {
        required: "Email is required",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
            message: "Enter a valid email address",
        },
    });
    const departmentField = register("department", { required: "Department is required" });
    const timeField = register("time", { required: "Time is required" });

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-sm w-full">
            {/* Heading */}
            <h1 className="text-2xl text-start font-bold text-slate-800 mb-8">
                Book Appointment
            </h1>

            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                {/* Name Field */}
                <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                        Name <span className="text-slate-800">*</span>
                    </label>
                    <PrimaryInput
                        customClasses="!w-full !border-gray-200"
                        placeholder="Full Name *"
                        aria-invalid={Boolean(errors.name)}
                        {...nameField}
                        onChange={(e) => {
                            resetMutation();
                            nameField.onChange(e);
                        }}
                    />
                    {errors.name?.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}

                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                        Email address <span className="text-slate-800">*</span>
                    </label>
                    <PrimaryInput
                        customClasses="!w-full !border-gray-200"
                        placeholder="example@gmail.com"
                        aria-invalid={Boolean(errors.email)}
                        {...emailField}
                        onChange={(e) => {
                            resetMutation();
                            emailField.onChange(e);
                        }}
                    />
                    {errors.email?.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}

                </div>

                {/* Department Field */}
                <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                        Departement <span className="text-slate-800">*</span>
                    </label>
                    <select
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-400 bg-white focus:outline-none focus:border-teal-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem]"
                        aria-invalid={Boolean(errors.department)}
                        {...departmentField}
                        onChange={(e) => {
                            resetMutation();
                            departmentField.onChange(e);
                        }}
                    >
                        <option value="">Please Select</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="neurology">Neurology</option>
                        <option value="orthopedics">Orthopedics</option>
                    </select>
                    {errors.department?.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
                    )}
                </div>

                {/* Time Field */}
                <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                        Time <span className="text-slate-800">*</span>
                    </label>
                    <select
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-400 bg-white focus:outline-none focus:border-teal-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem]"
                        aria-invalid={Boolean(errors.time)}
                        {...timeField}
                        onChange={(e) => {
                            resetMutation();
                            timeField.onChange(e);
                        }}
                    >
                        <option value="4:00">4:00 Available</option>
                        <option value="5:00">5:00 Available</option>
                        <option value="6:00">6:00 Available</option>
                    </select>
                    {errors.time?.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                    )}
                </div>

                {error?.message && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error.message}
                    </div>
                )}

                {data?.bookAppointment?.success && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {data.bookAppointment.message}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="w-full py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors mt-2"
                >
                    {loading || isSubmitting ? "Booking..." : "Book Appointment"}
                </button>
            </form>
        </div>
    )
}