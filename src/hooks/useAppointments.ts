import { useEffect } from "react";
import { IAppointment } from "@/models/Appointment";
import AppointmentsStore from "@/stores/AppointmentsStore";
import useSession from "@/hooks/useSession";
import useServices from "./useServices";
import {
  isSameAppointmentUser,
  userHasAppointmentOnDate as checkUserHasAppointmentOnDate,
} from "@/util/appointment";

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
  const { services } = useServices();
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
      const availableAppointments = data.filter((app) => !app.user);
      setAvailableAppointments(availableAppointments);
      const reservedAppointments = data.filter((app) => app.user);
      setReservedAppointments(reservedAppointments);

      if (session) {
        const userId = session._id.toString();
        const userAppointment = data.find((app) =>
          isSameAppointmentUser(app.user, userId)
        );

        if (userAppointment) {
          userAppointment.services = services
            .filter((service) =>
              userAppointment.services?.includes(service._id.toString())
            )
            .map((service) => service.name);
          setUserActiveAppointment(userAppointment);
        } else {
          setUserActiveAppointment(undefined);
        }
      }
    } catch (error) {
      console.error("Error fetching available appointments:", error);
    }
  };

  const createAppointment = async () => {
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });
      await fetchAppointments();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const createBulkAppointments = async (apps: IAppointment[]) => {
    try {
      for (const app of apps) {
        await fetch("/api/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(app),
        });
      }
      await fetchAppointments();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const updateAppointment = async () => {
    if (!appointment?._id) {
      console.error("Appointment ID is missing");
      return;
    }
    try {
      await fetch(`/api/appointments/${appointment?._id?.toString()}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });
      await fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const reserveAppointment = async (app: IAppointment) => {
    if (!app?._id) {
      return { success: false, error: "Seleccione una hora para su cita" };
    }
    try {
      const response = await fetch(`/api/appointments/${app._id.toString()}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(app),
      });

      if (!response.ok) {
        const data = await response.json();
        return {
          success: false,
          error: data.error || "No se pudo reservar la cita",
        };
      }

      await fetchAppointments();
      return { success: true };
    } catch (error) {
      console.error("Error updating appointment:", error);
      return { success: false, error: "Error de red al reservar la cita" };
    }
  };

  const hasUserAppointmentOnDate = (date: Date | string) => {
    if (!session) return false;
    return checkUserHasAppointmentOnDate(
      appointments,
      session._id.toString(),
      date
    );
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
    createBulkAppointments,
    updateAppointment,
    reserveAppointment,
    deleteAppointment,
    hasUserAppointmentOnDate,
  };
};

export default useAppointments;
