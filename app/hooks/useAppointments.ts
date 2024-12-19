import { useState, useEffect } from "react";
import { IAppointment } from "@/app/models/Appointment";

const useAppointments = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [appointment, setAppointment] = useState<IAppointment | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const createAppointment = async () => {
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });
      const data = await response.json();
      setAppointments([...appointments, data]);
      setAppointment(null);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const updateAppointment = async (
    id: string,
    updatedAppointment: IAppointment
  ) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAppointment),
      });
      const data = await response.json();
      setAppointments(
        appointments.map((appointment) =>
          appointment._id.toString() === id ? data : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });
      setAppointments(
        appointments.filter((appointment) => appointment._id.toString() !== id)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return {
    appointments,
    appointment,
    setAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
};

export default useAppointments;
