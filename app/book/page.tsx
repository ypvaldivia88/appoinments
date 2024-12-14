"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

interface Appointment {
  date: string;
  time: string;
  userId: number;
}

const fetcher = async (url: string) => fetch(url).then((res) => res.json());
const poster = async (url: string, data: Appointment) => {
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
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { data: user, error } = useSWR("/api/auth/session", fetcher);

  if (error) {
    return <div>Error loading user</div>;
  }

  if (!user) {
    router.push("/login");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const appointment: Appointment = {
      date,
      time,
      userId: user.id,
    };

    await poster("/api/appointments", appointment);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 dark:from-pink-700 dark:via-purple-700 dark:to-indigo-700 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        Reserva tu cita
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            value={user.phone}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Fecha
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Hora
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-pink-500 dark:bg-pink-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-pink-700 dark:hover:bg-pink-900 transition-colors w-full"
        >
          Reservar
        </button>
      </form>
    </div>
  );
}
