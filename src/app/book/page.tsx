"use client";
import React, { useState } from "react";
import Calendar from "@/components/Calendar";
import useSession from "@/hooks/useSession";
import FormField from "@/components/FormField";
import ServiceSelector from "@/components/ServiceSelector";
import { IService } from "@/models/Service";
import { IAppointment } from "@/models/Appointment";
import useAppointments from "@/hooks/useAppointments";
import useValidation from "@/hooks/useValidation";
import useAppointmentsStore from "@/stores/useAppointmentsStore";

export default function Book() {
  const { session } = useSession();
  const { validateAppointment } = useValidation();
  const { updateAppointment, deleteAppointment } = useAppointments();
  const { userActiveAppointment, setUserActiveAppointment } =
    useAppointmentsStore();

  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<
    IAppointment | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload: IAppointment = {
      ...selectedAppointment,
      services: selectedServices.map((s) => s._id.toString()),
      userId: session?._id.toString(),
    } as IAppointment;
    const errors = validateAppointment(payload);
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }
    if (!payload._id) {
      alert("Seleccione una Hora para su cita");
      return;
    }
    await updateAppointment(payload._id.toString(), payload);
    setLoading(false);
  };

  const handleCancelAppointment = async () => {
    setLoading(true);
    if (userActiveAppointment?._id) {
      if (
        confirm(
          "Cuidado! Esta acción no se puede revertir. ¿Estás segur@ de que deseas cancelar esta cita?"
        )
      ) {
        await deleteAppointment(userActiveAppointment._id);
        setUserActiveAppointment(undefined);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return userActiveAppointment ? (
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
  ) : (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 md:p-4 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 lg:mb-8">
        Reserva tu cita
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full md:max-w-xl bg-gradient-secondary flex flex-col gap-2"
      >
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={(date) => setSelectedDate(date)}
          selectedAppointment={selectedAppointment as IAppointment}
          setSelectedAppointment={(app) => setSelectedAppointment(app)}
        />
        {selectedAppointment === undefined ? (
          <h1 className="text-md font-bold text-white my-8">
            Seleccione una <span className="text-green-400">Fecha Hábil</span> y
            una Hora para su cita
          </h1>
        ) : (
          <>
            <ServiceSelector
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
            />
            <FormField
              type="text"
              label="Nota"
              value={selectedAppointment.note || ""}
              onChange={(e) =>
                setSelectedAppointment(
                  (prev) =>
                    ({
                      ...prev,
                      note: e.target.value,
                    } as IAppointment)
                )
              }
            />
            <button
              type="submit"
              className="font-bold py-2 px-4 rounded-full shadow-lg bg-purple-600 text-white hover:bg-purple-400 transition-colors w-full"
            >
              Reservar
            </button>
          </>
        )}
      </form>
    </div>
  );
}
