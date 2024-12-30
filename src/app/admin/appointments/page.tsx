"use client";
import React from "react";
import useAppointments from "@/hooks/useAppointments";
import AppointmentForm from "@/forms/AppointmentForm";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import useAppointmentsStore from "@/stores/useAppointmentsStore";
import AppointmentBulkForm from "@/forms/AppointmentBulkForm";
import Calendar from "@/components/Calendar";
import { IAppointment } from "@/models/Appointment";

const AppointmentsPage: React.FC = () => {
  const { deleteAppointment } = useAppointments();
  const { appointments, setAppointment } = useAppointmentsStore();

  const [showModal, setShowModal] = React.useState(false);
  const [showBulkModal, setShowBulkModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );
  const [selectedAppointment, setSelectedAppointment] = React.useState<
    IAppointment | undefined
  >(undefined);

  const handleDelete = async () => {
    const id = appointments.find(
      (app) => app._id === selectedAppointment?._id
    )?._id;
    if (!id) {
      return;
    }
    await deleteAppointment(id);
  };

  const handleEdit = () => {
    setAppointment(selectedAppointment);
    setShowModal(true);
  };

  const handleCreate = () => {
    setAppointment(undefined);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        Gestión de Citas
      </h1>
      <div className="flex flex-col">
        <button
          className="bg-purple-950 text-white hover:bg-purple-400 transition-colors font-bold py-2 px-4 rounded-full shadow-lg mb-4 flex items-center gap-2 justify-center"
          onClick={() => setShowBulkModal(true)}
        >
          <FaPlus /> Citas por Lotes
        </button>
        <button
          className="bg-purple-600 text-white hover:bg-purple-400 transition-colors font-bold py-2 px-4 rounded-full shadow-lg mb-4 flex items-center gap-2 justify-center"
          onClick={handleCreate}
        >
          <FaPlus /> Cita Específica
        </button>
      </div>
      <div className="p-6 md:p-8 rounded-lg shadow-lg w-full max-w-80 md:max-w-screen-2xl overflow-x-auto bg-gradient-secondary">
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={(date: Date) => setSelectedDate(date)}
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={(app) => setSelectedAppointment(app)}
        />
        {selectedAppointment && (
          <div className="flex items-center justify-around mt-4">
            <button
              className="px-4 py-2 rounded-md bg-blue-600 hover:text-blue-400 transition-colors flex items-center gap-2 flex-nowrap"
              onClick={handleEdit}
            >
              <FaEdit /> Editar
            </button>
            <button
              className="px-4 py-2 rounded-md bg-red-600 hover:text-red-400 transition-colors flex items-center gap-2 flex-nowrap"
              onClick={handleDelete}
            >
              <FaTrash /> Eliminar
            </button>
          </div>
        )}
      </div>
      {showModal && <AppointmentForm onClose={() => setShowModal(false)} />}
      {showBulkModal && (
        <AppointmentBulkForm onClose={() => setShowBulkModal(false)} />
      )}
    </div>
  );
};

export default AppointmentsPage;
