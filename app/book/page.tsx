"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import useGlobalStore from "@/app/store/useGlobalStore";
import Calendar from "@/app/components/Calendar";

interface Appointment {
  date: string;
  description: string;
  userId: string | null;
  _id?: string;
}

export default function Book() {
  const router = useRouter();
  const session = useGlobalStore((state) => state.session);

  const [description, setDescription] = useState("");
  const [sessionChecked, setSessionChecked] = useState(false);
  const [formValues, setFormValues] = useState<Appointment>({
    date: "",
    description: "",
    userId: null,
  });

  useEffect(() => {
    if (!sessionChecked) {
      setSessionChecked(true);
      return;
    }

    if (!session) {
      router.push("/login");
    } else {
      setFormValues({
        ...formValues,
        userId: session._id.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, session, sessionChecked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // on submit find the selected appointment by date and time, edit the appointment to add the description and userId
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-main p-2 md:p-4 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 lg:mb-8">
        Reserva tu cita
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full md:max-w-xl backdrop-filter  backdrop-blur-md bg-opacity-30 backdrop-saturate-150 backdrop-contrast-125"
      >
        <div className="mb-4">
          <Calendar />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">
            Nota
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
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
