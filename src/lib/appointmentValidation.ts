import dayjs from "dayjs";
import Appointment from "@/models/Appointment";

function getDayBounds(date: Date | string) {
  const day = dayjs(date);
  return {
    start: day.startOf("day").toDate(),
    end: day.endOf("day").toDate(),
  };
}

export async function userHasAppointmentOnDate(
  userId: string,
  date: Date | string,
  excludeAppointmentId?: string
): Promise<boolean> {
  const { start, end } = getDayBounds(date);

  const query: Record<string, unknown> = {
    user: userId,
    date: { $gte: start, $lte: end },
  };

  if (excludeAppointmentId) {
    query._id = { $ne: excludeAppointmentId };
  }

  const count = await Appointment.countDocuments(query);
  return count > 0;
}

export function isSameDay(dateA: Date | string, dateB: Date | string): boolean {
  return dayjs(dateA).format("YYYY-MM-DD") === dayjs(dateB).format("YYYY-MM-DD");
}
