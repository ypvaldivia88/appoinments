import dayjs from "dayjs";
import { IAppointment } from "@/models/Appointment";
import { IUser } from "@/models/User";

export function getAppointmentUserId(
  user: IAppointment["user"]
): string | undefined {
  if (!user) return undefined;
  if (typeof user === "object") {
    return (user as IUser)._id.toString();
  }
  return user.toString();
}

export function isSameAppointmentUser(
  appointmentUser: IAppointment["user"],
  userId: string
): boolean {
  const appointmentUserId = getAppointmentUserId(appointmentUser);
  return appointmentUserId === userId;
}

export function isAppointmentOnDate(
  appointment: IAppointment,
  date: Date | string
): boolean {
  return (
    dayjs(appointment.date).format("YYYY-MM-DD") ===
    dayjs(date).format("YYYY-MM-DD")
  );
}

export function userHasAppointmentOnDate(
  appointments: IAppointment[],
  userId: string,
  date: Date | string
): boolean {
  return appointments.some(
    (app) =>
      isSameAppointmentUser(app.user, userId) &&
      isAppointmentOnDate(app, date)
  );
}
