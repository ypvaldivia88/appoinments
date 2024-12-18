import { useEffect, useState } from "react";
import { IAppointment } from "@/app/models/Appointment";

export default function useAppointmentCrud(
  onSave: (appointment: IAppointment) => void
) {
  const [currentAppointment, setCurrentAppointment] =
    useState<IAppointment | null>(null);
  const [appointmentList, setAppointmentList] = useState<IAppointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch("api/appointments", { method: "GET" });
      if (!response.ok) {
        return;
      }
      const appointments = await response.json();
      setAppointmentList(appointments);
    };
    fetchAppointments();
  }, []);

  const createAppointment = (newAppointment: IAppointment) => {
    setAppointmentList([...appointmentList, newAppointment]);
    onSave(newAppointment);
  };

  const readAppointment = (id: string) => {
    return appointmentList.find((appointment) => appointment.id === id) || null;
  };

  const updateAppointment = (updatedAppointment: IAppointment) => {
    const updatedList = appointmentList.map((appointment) =>
      appointment.id === updatedAppointment.id
        ? updatedAppointment
        : appointment
    );
    setAppointmentList(updatedList);
    onSave(updatedAppointment);
  };

  const deleteAppointment = (id: string) => {
    const updatedList = appointmentList.filter(
      (appointment) => appointment.id !== id
    );
    setAppointmentList(updatedList);
  };

  return {
    currentAppointment,
    appointmentList,
    createAppointment,
    readAppointment,
    updateAppointment,
    deleteAppointment,
    setCurrentAppointment,
  };
}
