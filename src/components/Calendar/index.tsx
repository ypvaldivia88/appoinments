import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IAppointment } from "@/models/Appointment";
import Header from "@/components/Calendar/Header";
import DaysHeader from "@/components/Calendar/DaysHeader";
import DatesGrid from "@/components/Calendar/DatesGrid";
import AppointmentsList from "@/components/Calendar/AppointmentsList";
import useAppointments from "@/hooks/useAppointments";

export default function Calendar() {
  const { appointments, setAppointment } = useAppointments();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [today, setToday] = useState(dayjs());
  const days = ["D", "L", "M", "M", "J", "V", "S"];
  const [currentDayAppointments, setCurrentDayAppointments] = useState<
    IAppointment[]
  >([]);

  useEffect(() => {
    filterAppointmentsByDate(appointments, selectedDate);
  }, [appointments]);

  function filterAppointmentsByDate(
    appointments: IAppointment[],
    date: Date
  ): void {
    const apps = appointments.filter(
      (app) =>
        dayjs(app.date).format("YYYY-MM-DD") ===
        dayjs(date).format("YYYY-MM-DD")
    );

    setCurrentDayAppointments(apps);
  }

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setAppointment(undefined);
    filterAppointmentsByDate(appointments, date);
  };

  return (
    <div className="flex gap-4 justify-center items-center flex-col border-2 border-gray-300 rounded-lg p-4">
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto">
        <Header
          today={today}
          setToday={setToday}
          currentDate={dayjs(selectedDate)}
        />
        <DaysHeader days={days} />
        <DatesGrid
          today={today}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
      </div>
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto">
        <AppointmentsList
          selectedDate={selectedDate}
          currentDayAppointments={currentDayAppointments}
        />
      </div>
    </div>
  );
}
