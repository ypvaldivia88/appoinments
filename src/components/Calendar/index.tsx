import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import useAppointmentsStore from "@/stores/useAppointmentsStore";
import { IAppointment } from "@/models/Appointment";
import Header from "@/components/Calendar/Header";
import DaysHeader from "@/components/Calendar/DaysHeader";
import DatesGrid from "@/components/Calendar/DatesGrid";
import AppointmentsList from "@/components/Calendar/AppointmentsList";

export default function Calendar({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: {
  selectedDate?: Date;
  setSelectedDate: (date: Date) => void;
  selectedTime?: string;
  setSelectedTime: (time: string) => void;
}): React.JSX.Element {
  const { availableAppointments } = useAppointmentsStore();

  const days = ["D", "L", "M", "M", "J", "V", "S"];
  selectedDate = selectedDate || new Date();
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  const [currentDayAppointments, setCurrentDayAppointments] = useState<
    IAppointment[]
  >([]);

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
    setSelectedTime("");
    filterAppointmentsByDate(availableAppointments, date);
  };

  useEffect(() => {
    // Trigger a re-render when availableAppointments changes
    setToday(dayjs());
    if (availableAppointments)
      filterAppointmentsByDate(availableAppointments, today.toDate());
  }, [availableAppointments]);

  return (
    <div className="flex gap-4 justify-center items-center flex-col border-2 border-gray-300 rounded-lg p-4">
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto">
        <Header today={today} setToday={setToday} currentDate={currentDate} />
        <DaysHeader days={days} />
        <DatesGrid
          today={today}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          availableAppointments={availableAppointments}
        />
      </div>
      <AppointmentsList
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        currentDayAppointments={currentDayAppointments}
      />
    </div>
  );
}
