import { useEffect } from "react";
import { IAppointment } from "@/models/Appointment";
import AppointmentsStore from "@/stores/AppointmentsStore";
import useSession from "@/hooks/useSession";
import { ServiceStore } from "@/stores/ServiceStore";

const useAppointments = () => {
  const {
    appointment,
    setAppointment,
    appointments,
    setAppointments,
    availableAppointments,
    setAvailableAppointments,
    reservedAppointments,
    setReservedAppointments,
    userActiveAppointment,
    setUserActiveAppointment,
  } = AppointmentsStore();
  const { services } = ServiceStore();
  const { session } = useSession();

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
      const availableAppointments = data.filter((app) => !app.userId);
      setAvailableAppointments(availableAppointments);
      const reservedAppointments = data.filter((app) => app.userId);
      setReservedAppointments(reservedAppointments);

      if (session) {
        const userAppointment =
          data.find((app) => app.userId === session._id.toString()) ||
          undefined;

        if (userAppointment) {
          userAppointment.services = services
            .filter((service) =>
              userAppointment.services?.includes(service._id.toString())
            )
            .map((service) => service.name);
          setUserActiveAppointment(userAppointment);
        }
      }
    } catch (error) {
      console.error("Error fetching available appointments:", error);
    }
  };

  const createAppointment = async (newAppointment: IAppointment) => {
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      });
      await fetchAppointments();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const updateAppointment = async (
    id: string,
    updatedAppointment: IAppointment
  ) => {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAppointment),
      });
      await fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });
      await fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return {
    appointment,
    setAppointment,
    appointments,
    setAppointments,
    availableAppointments,
    setAvailableAppointments,
    reservedAppointments,
    setReservedAppointments,
    userActiveAppointment,
    setUserActiveAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
};

export default useAppointments;
