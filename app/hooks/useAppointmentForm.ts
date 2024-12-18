import { useState } from "react";
import { IAppointment } from "@/app/models/Appointment";

export default function useAppointmentForm(
  appointment: IAppointment | null,
  onSave: (appointment: IAppointment) => void
) {
  const [date, setDate] = useState(appointment?.date || "");
  const [description, setDescription] = useState(
    appointment?.description || ""
  );
  const [userId, setUserId] = useState(appointment?.userId || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const options = {
      method: appointment ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, description, userId }),
    };
    const response = await fetch(
      "/api/appointments" + (appointment ? `/${appointment._id}` : ""),
      options
    );
    const savedAppointment = await response.json();
    onSave(savedAppointment);
  };

  return {
    setDate,
    setDescription,
    setUserId,
    handleSubmit,
  };
}
