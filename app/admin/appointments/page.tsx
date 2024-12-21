"use client";
import React from "react";
import useAppointments from "@/hooks/useAppointments";
import AppointmentForm from "@/forms/AppointmentForm";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { IAppointment } from "@/models/Appointment";

const AppointmentsPage: React.FC = () => {
  const { appointments, setAppointment, deleteAppointment } = useAppointments();

  const [showModal, setShowModal] = React.useState(false);

  const handleDelete = async (_id: string) => {
    await deleteAppointment(_id);
  };

  const handleEdit = (appointment: IAppointment) => {
    setAppointment(appointment);
    setShowModal(true);
  };

  const handleCreate = () => {
    setAppointment(undefined);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-main p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        Gestión de Turnos
      </h1>
      <button
        className="bg-purple-600 text-white hover:bg-purple-400 transition-colors font-bold py-2 px-4 rounded-full shadow-lg mb-4 flex items-center gap-2"
        onClick={handleCreate}
      >
        <FaPlus /> Crear Turno
      </button>
      <div className="p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-x-auto bg-gray-500 bg-opacity-10">
        <table className="min-w-full">
          <thead>
            <tr className="table-row">
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Hora</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {appointments?.map((appointment) => (
              <tr key={appointment._id.toString()} className="table-row">
                <td className="py-2 px-4 border-b">
                  {new Date(appointment.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{appointment.time}</td>
                <td className="py-2 px-4 border-b flex justify-center flex-nowrap">
                  <button
                    className=" text-blue-500 font-bold py-1 px-2 rounded-full shadow-lg hover:text-blue-700 transition-colors mr-2"
                    onClick={() => handleEdit(appointment)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className=" text-red-500 font-bold py-1 px-2 rounded-full shadow-lg hover:text-red-700 transition-colors"
                    onClick={() => handleDelete(appointment._id.toString())}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <AppointmentForm onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AppointmentsPage;
