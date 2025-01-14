"use client";
import React, { useEffect } from "react";
import AppointmentForm from "@/forms/AppointmentForm";
import { FaPlus } from "react-icons/fa";
import AppointmentsStore from "@/stores/AppointmentsStore";
import AppointmentBulkForm from "@/forms/AppointmentBulkForm";
import Calendar from "@/components/Calendar";

const AppointmentsPage: React.FC = () => {
  const { setAppointment, appointment } = AppointmentsStore();

  const [showModal, setShowModal] = React.useState(false);
  const [showBulkModal, setShowBulkModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  useEffect(() => {
    if (appointment) {
      setShowModal(true);
    }
  }, [appointment]);

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
        />
      </div>
      {showModal && (
        <AppointmentForm
          onClose={() => {
            setAppointment(undefined);
            setShowModal(false);
          }}
        />
      )}
      {showBulkModal && (
        <AppointmentBulkForm onClose={() => setShowBulkModal(false)} />
      )}
    </div>
  );
};

export default AppointmentsPage;
