import React from "react";
import { IAppointment } from "@/models/Appointment";

interface AppointmentDetailsProps {
  userActiveAppointment: IAppointment;
  handleCancelAppointment: () => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  userActiveAppointment,
  handleCancelAppointment,
}) => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 md:p-4 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 lg:mb-8 text-center">
        Ya tienes una Cita planificada
      </h1>
      <div className="p-6 md:p-8 lg:p-10 rounded-lg shadow-lg w-full md:max-w-xl bg-gradient-secondary flex flex-col gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-800 text-lg font-semibold">
            Fecha: {new Date(userActiveAppointment.date).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-800 text-lg font-semibold">
            Hora: {userActiveAppointment.time}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-800 text-lg font-semibold">
            Servicios:{" "}
            {userActiveAppointment.services?.map((s) => s).join(", ")}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-800 text-lg font-semibold">
            Nota: {userActiveAppointment.note}
          </p>
        </div>
      </div>
      <button
        className="font-bold py-2 px-4 rounded-full shadow-lg bg-red-600 text-white hover:bg-orange-400 transition-colors w-full mt-4"
        onClick={handleCancelAppointment}
      >
        Cancelar Cita
      </button>
    </div>
  );
};

export default AppointmentDetails;
