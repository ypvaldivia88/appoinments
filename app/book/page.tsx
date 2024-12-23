"use client";
import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import useServices from "@/hooks/useServices";
import useAppointments from "@/hooks/useAppointments";
import ServiceSelector from "@/components/ServiceSelector";
import { IService } from "@/models/Service";

interface Appointment {
  date: string;
  description: string;
  userId: string | null;
  _id?: string;
}

export default function Book() {
  const router = useRouter();
  const { session, sessionChecked } = useSession();
  const { appointment, createAppointment, updateAppointment } =
    useAppointments();

  const [selectedServices, setSelectedServices] = useState<IService[]>([]);

  const [description, setDescription] = useState("");
  const [formValues, setFormValues] = useState<Appointment>({
    date: "",
    description: "",
    userId: null,
  });

  useEffect(() => {
    if (!sessionChecked) return;

    if (!session) {
      router.push("/login");
    } else {
      setFormValues({
        ...formValues,
        userId: session._id.toString(),
      });
    }
  }, [session, sessionChecked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-main p-2 md:p-4 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 lg:mb-8">
        Reserva tu cita
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full md:max-w-xl bg-gray-500 bg-opacity-10"
      >
        <Calendar />
        <ServiceSelector
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />
        <FormField
          type="text"
          label="Nota"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
