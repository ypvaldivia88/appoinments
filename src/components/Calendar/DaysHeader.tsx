import React from "react";

export default function DaysHeader({ days }: { days: string[] }) {
  return (
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
  );
}
