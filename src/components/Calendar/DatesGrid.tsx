import React from "react";
import dayjs from "dayjs";
import { generateDate } from "@/util/calendar";
import cn from "@/util/cn";
import { IAppointment } from "@/models/Appointment";
import useSession from "@/hooks/useSession";

export default function DatesGrid({
  today,
  selectedDate,
  handleDateChange,
  availableAppointments,
}: {
  today: dayjs.Dayjs;
  selectedDate?: Date;
  handleDateChange: (date: Date) => void;
  availableAppointments: IAppointment[];
}) {
  const { isAdmin } = useSession();

  return (
    <div className="grid grid-cols-7">
      {generateDate(today.month(), today.year()).map(
        ({ date, currentMonth, today }, index) => (
          <div
            key={index}
            className="p-1 md:p-2 text-center h-10 md:h-14 grid place-content-center text-sm border-t"
          >
            <h1
              className={cn(
                currentMonth ? "" : "text-gray-400",
                today ? "border-white border-2 text-white" : "",
                dayjs(selectedDate).format("YYYY-MM-DD") ===
                  date.format("YYYY-MM-DD")
                  ? "bg-black text-white"
                  : "",
                availableAppointments.find(
                  (app) =>
                    dayjs(app.date).format("YYYY-MM-DD") ===
                    date.format("YYYY-MM-DD")
                )
                  ? "bg-green-500 text-white"
                  : "",
                isAdmin &&
                  availableAppointments.find(
                    (app) =>
                      dayjs(app.date).format("YYYY-MM-DD") ===
                        date.format("YYYY-MM-DD") && app.userId
                  )
                  ? "bg-red-500 text-white"
                  : "",
                "h-8 md:h-10 w-8 md:w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
              )}
              onClick={() => {
                handleDateChange(date.toDate());
              }}
            >
              {date.date()}
            </h1>
          </div>
        )
      )}
    </div>
  );
}
