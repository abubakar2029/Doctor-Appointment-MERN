import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react"
import { GET_ALL_Appointments, type GetAllAppointmentsData } from "../../graphql/queries/getAllAppointments";
import { CHANGE_APPOINTMENT_STATUS_MUTATION, type ChangeAppointmentStatusMutationData, type ChangeAppointmentStatusMutationVars } from "../../graphql/mutations/changeAppointmentStatus";
import { useEffect } from "react";

export type AppointmentStatus =
  | "Pending"
  | "Completed"
  | "Cancelled"
  | "In Progress"

// interface Appointment {
//   id: number
//   patientNameFirst: string
//   doctorNameFirst: string
//   time: string
//   status: AppointmentStatus
// }



// const initialAppointments: Appointment[] = [
//   {
//     id: 1,
//     patientName: "John Smith",
//     doctorName: "Dr. Sarah Johnson",
//     time: "09:00 AM",
//     status: "Scheduled",
//   },
//   {
//     id: 2,
//     patientName: "Emily Davis",
//     doctorName: "Dr. Michael Chen",
//     time: "10:30 AM",
//     status: "In Progress",
//   },
//   {
//     id: 3,
//     patientName: "Robert Wilson",
//     doctorName: "Dr. Elizabeth Anderson-Montgomery",
//     time: "11:15 AM",
//     status: "Completed",
//   },
//   {
//     id: 4,
//     patientName: "Maria Garcia",
//     doctorName: "Dr. James Thompson",
//     time: "01:00 PM",
//     status: "Cancelled",
//   },
//   {
//     id: 5,
//     patientName: "David Brown",
//     doctorName: "Dr. Patricia Hernandez-Rodriguez",
//     time: "02:30 PM",
//     status: "Scheduled",
//   },
//   {
//     id: 6,
//     patientName: "Jennifer Martinez",
//     doctorName: "Dr. Christopher Lee",
//     time: "03:45 PM",
//     status: "Scheduled",
//   },
//   {
//     id: 7,
//     patientName: "William Taylor",
//     doctorName: "Dr. Amanda Fitzgerald-Wellington",
//     time: "04:30 PM",
//     status: "In Progress",
//   },
// ]

const statusStyles: Record<AppointmentStatus, string> = {
  Pending: "bg-blue-100 text-blue-800 p-2",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
}

export default function AppointmentsPage() {

  const { data, loading, error, refetch } = useQuery<GetAllAppointmentsData>(GET_ALL_Appointments);

  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("payload") || "null");
    if (tokenData?.token) {
      setJwtToken(tokenData.token);
    }
  }, []);

  const [changeAppointmentStatus] = useMutation<ChangeAppointmentStatusMutationData, ChangeAppointmentStatusMutationVars>(
    CHANGE_APPOINTMENT_STATUS_MUTATION
  );

  const cancelAppointment = async (
    id: string
  ) => {

    if (!jwtToken) return

    try {
      await changeAppointmentStatus({
        variables: {
          input: {
            appointmentId: id,
            jwtToken,
            status: "Cancelled",
          },
        },
      });

      await refetch();

    } catch (err) {
      console.error("Error updating appointment status:", err);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Appointments
          </h1>
        </div>

        <div className="p-4 md:p-6">

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-700">
                  <th className="p-3">#</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.getAllAppointments.map((a, index) => (
                  <tr
                    key={index}

                    className="hover:bg-gray-50 text-sm"
                  >
                    <td className="p-3 font-medium">{index + 1}</td>
                    <td className="p-3">{a.patientNameFirst}</td>
                    <td className="p-3 max-w-[260px] truncate">
                      {a.doctorNameFirst}
                    </td>
                    <td className="p-3 whitespace-nowrap">{a.time}</td>
                    <td className="p-3">
                      <span
                        className={`px-3.5 py-2 rounded-full text-md font-light ${statusStyles[a.status]}`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => cancelAppointment(a.id)}
                        title="Cancel appointment"
                        className="text-xl hover:scale-110 transition"
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {data?.getAllAppointments.map((a) => (
              <div
                key={a.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-500">
                    #{a.id}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[a.status]}`}
                  >
                    {a.status}
                  </span>
                </div>

                <p className="font-medium">{a.patientNameFirst}</p>
                <p className="text-sm text-gray-600 break-words">
                  {a.doctorNameFirst}
                </p>
                <p className="text-sm mt-1">{a.time}</p>

                <button
                  onClick={() => cancelAppointment(a.id)}
                  title="Cancel appointment"
                  className="text-xl hover:scale-110 transition"
                >
                  ❌
                </button>
                {/* <select
                  value={a.status}
                  onChange={(e) =>
                    cancelAppointment(
                      a.id,
                      e.target.value as AppointmentStatus
                    )
                  }
                  className="mt-3 w-full border rounded-md px-2 py-1"
                >
                  <option>Scheduled</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select> */}
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  )
}
