import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "@/app/util/calendar";
import cn from "@/app/util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import useAppointments from "@/app/hooks/useAppointments";

export default function Calendar() {
  const days = ["D", "L", "M", "M", "J", "V", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { availableAppointments } = useAppointments();

  const isDateWithAppointments = (date: dayjs.Dayjs) => {
    return availableAppointments[date.format("YYYY-MM-DD")];
  };

  return (
    <div className="flex gap-4 md:gap-10 justify-center mx-auto items-center flex-col pb-4 md:pb-10 px-4 md:px-16">
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto">
        <div className="flex justify-between items-center px-2 md:px-5">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-4 md:gap-10 items-center">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Hoy
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <h1
              key={index}
              className="text-sm text-center h-10 md:h-14 w-10 md:w-14 grid place-content-center text-gray-500 select-none"
            >
              {day}
            </h1>
          ))}
        </div>
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
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? "bg-black text-white"
                      : "",
                    isDateWithAppointments(date)
                      ? "bg-green-500 text-white"
                      : "",
                    "h-8 md:h-10 w-8 md:w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                  )}
                  onClick={() => {
                    setSelectDate(date);
                  }}
                >
                  {date.date()}
                </h1>
              </div>
            )
          )}
        </div>
      </div>
      <div className="h-auto w-full max-w-xs md:max-w-md lg:max-w-lg px-2 md:px-5">
        <h1 className="font-semibold">
          Turnos disponibles para {selectDate.toDate().toLocaleDateString()}
        </h1>
        {isDateWithAppointments(selectDate) ? (
          <ul>
            {availableAppointments[selectDate.format("YYYY-MM-DD")].map(
              (time, index) => (
                <li key={index} className="text-gray-300">
                  <label>
                    <input
                      type="radio"
                      name="appointment"
                      value={time}
                      checked={selectedTime === time}
                      onChange={() => setSelectedTime(time)}
                      className="mr-2"
                    />
                    {time}
                  </label>
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="text-gray-400">No hay turnos para este día.</p>
        )}
      </div>
    </div>
  );
}
