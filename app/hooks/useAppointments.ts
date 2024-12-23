import { useEffect } from "react";
import { IAppointment } from "@/models/Appointment";
import useAppointmentsStore from "@/stores/appointmentsStore";

const useAppointments = () => {
  const {
    appointments,
    appointment,
    availableAppointments,
    setAppointments,
    setAppointment,
    setAvailableAppointments,
  } = useAppointmentsStore();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      if (!response.ok) {
        console.error("Error fetching appointments:", data);
        return;
      }
      setAppointments(data);
      processAvailableAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const processAvailableAppointments = async (data: IAppointment[]) => {
    try {
      if (!data.length) {
        return;
      }
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
