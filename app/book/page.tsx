"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import useGlobalStore from "@/app/store/useGlobalStore";
import Calendar from "@/app/components/Calendar";

interface Appointment {
  date: string;
  description: string;
  userId: string;
}

const POST = async (url: string, data: Appointment) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export default function Book() {
  const router = useRouter();
  const session = useGlobalStore((state) => state.session);

  const [description, setDescription] = useState("");
  const [sessionChecked, setSessionChecked] = useState(false);

  const [formValues, setFormValues] = useState<Appointment>({
    date: "",
    description: "",
    userId: "",
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

    const appointment: Appointment = formValues;

    await POST("/api/appointments", appointment);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-main p-2 md:p-4 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 lg:mb-8">
        Reserva tu cita
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-xs md:max-w-md lg:max-w-lg"
      >
        <div className="mb-4">
          <Calendar />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          className="bg-pink-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-pink-700 transition-colors w-full"
        >
          Reservar
        </button>
      </form>
    </div>
  );
}
