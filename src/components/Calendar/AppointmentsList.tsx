import React from "react";
import { IAppointment } from "@/models/Appointment";

export default function AppointmentsList({
  selectedDate,
  selectedTime,
  setSelectedTime,
  currentDayAppointments,
}: {
  selectedDate?: Date;
  selectedTime?: string;
  setSelectedTime: (time: string) => void;
  currentDayAppointments: IAppointment[];
}) {
  return (
    <div className="h-auto w-full">
      <h1 className="font-semibold">
        Citas disponibles para {selectedDate?.toLocaleDateString()}
      </h1>
      {currentDayAppointments?.length > 0 ? (
        <ul className="my-2 flex gap-2 flex-wrap justify-items-center items-center">
          {currentDayAppointments.map((app, index) => (
            <li
              key={index}
              className="text-gray-700 text-sm bg-slate-300 px-4 py-2 max-w-fit rounded-md"
            >
              <label>
                <input
                  type="radio"
                  name="appointment"
                  value={app.time}
                  checked={selectedTime === app.time}
                  onChange={() => setSelectedTime(app.time)}
                  className="mr-2"
                />
                {app.time}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No hay Citas para este día.</p>
      )}
    </div>
  );
}
