"use client";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

interface Appointment {
  id: number;
  name: string;
  phone: string;
  date: string;
  time: string;
}

export default function Admin() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Fetch appointments from an API or database
    // Example data:
    setAppointments([
      {
        id: 1,
        name: "Maria",
        phone: "123456789",
        date: "2023-10-01",
        time: "10:00",
      },
      {
        id: 2,
        name: "Juan",
        phone: "987654321",
        date: "2023-10-02",
        time: "11:00",
      },
      {
        id: 3,
        name: "Ana",
        phone: "555555555",
        date: "2023-10-03",
        time: "12:00",
      },
      {
        id: 4,
        name: "Pedro",
        phone: "999999999",
        date: "2023-10-04",
        time: "13:00",
      },
      {
        id: 5,
        name: "Laura",
        phone: "111111111",
        date: "2023-10-05",
        time: "14:00",
      },
    ]);
  }, []);

  const handleDelete = (id: number) => {
    // Handle delete logic here
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
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
                  {appointment.name}
                  <br />
                  {appointment.phone}
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
  );
}
