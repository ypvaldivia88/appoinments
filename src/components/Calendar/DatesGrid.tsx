import React, { useEffect } from "react";
import dayjs from "dayjs";
import { generateDate } from "@/util/calendar";
import cn from "@/util/cn";
import { IAppointment } from "@/models/Appointment";
import AppointmentsStore from "@/stores/AppointmentsStore";
import useSession from "@/hooks/useSession";

export default function DatesGrid({
  today,
  selectedDate,
  handleDateChange,
}: {
  today: dayjs.Dayjs;
  selectedDate?: Date;
  handleDateChange: (date: Date) => void;
}) {
  const { appointments } = AppointmentsStore();
  const { isAdmin } = useSession();

  const [appointmentMap, setAppointmentMap] = React.useState<
    Map<string, IAppointment[]>
  >(new Map());

  useEffect(() => {
    // Trigger a re-render when availableAppointments changes
    if (appointments) {
      // Preprocess appointments into a map for quick lookup
      const appMap = new Map<string, IAppointment[]>();
      appointments.forEach((app) => {
        const dateKey = dayjs(app.date).format("YYYY-MM-DD");
        if (!appMap.has(dateKey)) {
          appMap.set(dateKey, []);
        }
        appMap.get(dateKey)!.push(app);
      });
      setAppointmentMap(appMap);
    }
  }, [appointments]);

  return (
    <div className="grid grid-cols-7">
      {generateDate(today.month(), today.year()).map(
        ({ date, currentMonth, today }, index) => {
          const formattedDate = date.format("YYYY-MM-DD");
          const isSelected =
            dayjs(selectedDate).format("YYYY-MM-DD") === formattedDate;

          const appointmentsForDate = appointmentMap.get(formattedDate) || [];
          const hasAppointments = appointmentsForDate.length > 0;
          const userIdCount = appointmentsForDate.filter(
            (app) => (app.services?.length ?? 0) > 0 || app.user
          ).length;

          return (
            <div
              key={index}
              className="p-1 md:p-2 text-center h-10 md:h-14 grid place-content-center text-sm border-t"
            >
              <div
                className={cn(
                  "relative h-8 md:h-10 w-8 md:w-10 rounded-full grid place-content-center",
                  currentMonth ? "" : "text-gray-400",
                  today ? "border-white border-2 text-white" : "",
                  isSelected ? "bg-black text-white" : "",
                  hasAppointments ? "border-green-500 border-2" : "",
                  "hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                )}
                onClick={() => handleDateChange(date.toDate())}
              >
                {userIdCount > 0 && isAdmin && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {userIdCount}
                  </span>
                )}
                {date.date()}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
