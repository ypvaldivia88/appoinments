import React from "react";
import { IAppointment } from "@/models/Appointment";
import cn from "@/util/cn";

export default function AppointmentsList({
  selectedDate,
  selectedAppointment,
  setSelectedAppointment,
  currentDayAppointments,
}: {
  selectedDate?: Date;
  selectedAppointment?: IAppointment | undefined;
  setSelectedAppointment: (appointment: IAppointment | undefined) => void;
  currentDayAppointments: IAppointment[];
}) {
  return (
    <div className="h-auto w-full">
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
                app?.userId ? "bg-yellow-600 text-white" : ""
              )}
              onClick={() => setSelectedAppointment(app)}
            >
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="selectedAppointment"
                  value={app._id}
                  checked={selectedAppointment?._id === app._id}
                  className="mr-2 cursor-pointer"
                  readOnly={app.userId ? true : false}
                  onChange={() => setSelectedAppointment(app)}
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
