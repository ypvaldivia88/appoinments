"use client";
import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import ServiceSelector from "@/components/ServiceSelector";
import { IService } from "@/models/Service";
import { IAppointment } from "@/models/Appointment";
import useAppointments from "@/hooks/useAppointments";
import useValidation from "@/hooks/useValidation";
import useAppointmentsStore from "@/stores/useAppointmentsStore";

export default function Book() {
  const router = useRouter();
  const { session, sessionChecked } = useSession();
  const { validateAppointment } = useValidation();
  const { createAppointment, deleteAppointment } = useAppointments();
  const { userActiveAppointment } = useAppointmentsStore();

  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [formValues, setFormValues] = useState<Partial<IAppointment>>({
    _id: undefined,
    userId: undefined,
    date: new Date(),
    services: [],
    note: "",
  });

  useEffect(() => {
    if (!sessionChecked) return;

    if (!session) {
      router.push("/login");
    } else {
      setFormValues((prev) => ({
        ...prev,
        userId: session._id.toString(),
      }));
    }
  }, [session, sessionChecked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: IAppointment = {
      ...formValues,
      services: selectedServices.map((s) => s._id.toString()),
      userId: session?._id.toString(),
    } as IAppointment;
    const errors = validateAppointment(payload);
    if (errors.length) {
      alert(errors.join("\n"));
    } else {
      await createAppointment(payload);
    }
  };

  return userActiveAppointment ? (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 md:p-4 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 lg:mb-8">
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
        onClick={() => {
          if (userActiveAppointment?._id) {
            if (
              confirm(
                "Cuidado! Esta acción no se puede revertir. ¿Estás segur@ de que deseas cancelar esta cita?"
              )
            ) {
              deleteAppointment(userActiveAppointment._id.toString());
            }
          }
        }}
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
          selectedDate={formValues.date}
          setSelectedDate={(date) =>
            setFormValues((prev) => ({ ...prev, date }))
          }
          selectedTime={formValues.time}
          setSelectedTime={(time) =>
            setFormValues((prev) => ({ ...prev, time }))
          }
        />
        <ServiceSelector
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />
        <FormField
          type="text"
          label="Nota"
          value={formValues.note || ""}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, note: e.target.value }))
          }
        />
        <button
          type="submit"
          className="font-bold py-2 px-4 rounded-full shadow-lg bg-purple-600 text-white hover:bg-purple-400 transition-colors w-full"
        >
          Reservar
        </button>
      </form>
    </div>
  );
}
