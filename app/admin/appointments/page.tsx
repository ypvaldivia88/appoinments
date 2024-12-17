"use client";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Admin from "@/app/admin/page";

interface User {
  name: string | null;
  phone: string;
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  user: User;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch("/api/appointments", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <Admin>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 dark:from-pink-700 dark:via-purple-700 dark:to-indigo-700 p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
          Administración de Citas
        </h1>
        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="table-row">
                <th className="py-2 px-4 border-b dark:border-gray-700">
                  Nombre <br /> Teléfono
                </th>
                <th className="py-2 px-4 border-b dark:border-gray-700">
                  Fecha <br /> Hora
                </th>
                <th className="py-2 px-4 border-b dark:border-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="table-row">
                  <td className="py-2 px-4 border-b dark:border-gray-700">
                    {appointment.user.name}
                    <br />
                    {appointment.user.phone}
                  </td>
                  <td className="py-2 px-4 border-b dark:border-gray-700">
                    {appointment.date}
                    <br />
                    {appointment.time}
                  </td>
                  <td className="py-2 px-4 border-b dark:border-gray-700">
                    <button
                      className="bg-red-500 dark:bg-red-700 text-white font-bold py-1 px-2 rounded-full shadow-lg hover:bg-red-700 dark:hover:bg-red-900 transition-colors"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
}
