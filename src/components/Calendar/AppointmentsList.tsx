import React from "react";
import { IAppointment } from "@/models/Appointment";
import cn from "@/util/cn";
import AppointmentsStore from "@/stores/AppointmentsStore";

export default function AppointmentsList({
  selectedDate,
  currentDayAppointments,
}: {
  selectedDate?: Date;
  currentDayAppointments: IAppointment[];
}) {
  const { appointment, setAppointment } = AppointmentsStore();
  
  return (
    <div className="h-auto w-full flex-col justify-center items-center">
      <h1 className="font-semibold text-center">
        Citas disponibles para {selectedDate?.toLocaleDateString()}
      </h1>
      {currentDayAppointments?.length > 0 ? (
        <ul className="my-2 flex gap-4 flex-wrap justify-center items-center">
          {currentDayAppointments.map((app, index) => (
            <li
              key={index}
              className={cn(
                "text-gray-700 text-sm bg-slate-300 px-4 py-2 max-w-fit rounded-md cursor-pointer",
                app?.userId !== undefined ? "bg-yellow-600 text-white" : ""
              )}
              onClick={() => setAppointment(app)}
            >
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="Appointment"
                  value={app._id}
                  checked={appointment?._id === app._id}
                  className="mr-2 cursor-pointer"
                  readOnly={app.userId ? true : false}
                  onChange={() => setAppointment(app)}
                />
                {app.time}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-orange-400 text-center my-4">
          No hay Citas para este día.
        </p>
      )}
    </div>
  );
}
