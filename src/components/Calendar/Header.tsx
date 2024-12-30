import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { months } from "@/util/calendar";
import dayjs from "dayjs";

export default function Header({
  today,
  setToday,
  currentDate,
}: {
  today: dayjs.Dayjs;
  setToday: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  currentDate: dayjs.Dayjs;
}) {
  return (
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
  );
}
