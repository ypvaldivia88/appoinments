import { useState, useEffect } from "react";
import { IAppointment } from "@/app/models/Appointment";

const useAppointments = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [appointment, setAppointment] = useState<IAppointment>();
  const [availableAppointments, setAvailableAppointments] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      setAppointments(data);
      processAvailableAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const processAvailableAppointments = async (data: IAppointment[]) => {
    try {
      const availableAppointments = data
        .filter((app) => !app.userId)
        .reduce((acc, appointment) => {
          const date = new Date(appointment.date).toISOString().split("T")[0];
          if (acc[date]) {
            acc[date].push(appointment.time);
          } else {
            acc[date] = [appointment.time];
          }
          return acc;
        }, {} as { [key: string]: string[] });
      setAvailableAppointments(availableAppointments);
    } catch (error) {
      console.error("Error fetching available appointments:", error);
    }
  };

  const createAppointment = async (newAppointment: IAppointment) => {
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      });
      const data = await response.json();
      setAppointments([...appointments, data]);
      processAvailableAppointments([...appointments, data]);
      setAppointment(undefined);
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
      processAvailableAppointments(
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
      processAvailableAppointments(
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
    availableAppointments,
  };
};

export default useAppointments;
