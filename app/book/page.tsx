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

export default function Book() {
  const router = useRouter();
  const { session, sessionChecked } = useSession();
  const { createAppointment } = useAppointments();

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
    await createAppointment({
      ...formValues,
      services: selectedServices.map((s) => s._id.toString()),
      userId: session?._id.toString(),
    } as IAppointment);
  };

  return (
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
