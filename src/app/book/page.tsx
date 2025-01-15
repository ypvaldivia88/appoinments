"use client";
import React, { useState } from "react";
import Calendar from "@/components/Calendar";
import useSession from "@/hooks/useSession";
import FormField from "@/forms/FormField";
import ServiceSelector from "@/components/ServiceSelector";
import { IService } from "@/models/Service";
import { IAppointment } from "@/models/Appointment";
import useAppointments from "@/hooks/useAppointments";
import useValidation from "@/hooks/useValidation";
import AppointmentDetails from "@/components/AppointmentDetails";

export default function Book() {
  const { session } = useSession();
  const { validateAppointment } = useValidation();
  const {
    appointment,
    setAppointment,
    updateAppointment,
    deleteAppointment,
    userActiveAppointment,
    setUserActiveAppointment,
  } = useAppointments();

  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload: IAppointment = {
      ...appointment,
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
    await updateAppointment();
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
    <AppointmentDetails
      userActiveAppointment={userActiveAppointment}
      handleCancelAppointment={handleCancelAppointment}
    />
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
        />
        {!appointment ? (
          <h1 className="text-md font-bold text-white my-8 text-center">
            Seleccione una <span className="text-green-400">Fecha Hábil</span> y
            una Hora para su cita
          </h1>
        ) : (
          <>
            <ServiceSelector
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
            />
            {selectedServices.length > 0 && (
              <>
                <FormField
                  type="text"
                  label="Nota"
                  value={appointment.note}
                  onChange={(e) =>
                    setAppointment({
                      ...appointment,
                      note: e.target.value,
                    } as unknown as IAppointment)
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
          </>
        )}
      </form>
    </div>
  );
}
