import React, { useEffect, useState } from "react";
import { IAppointment } from "@/models/Appointment";
import GenericForm from "@/components/GenericForm";
import FormField from "@/components/FormField";
import useAppointments from "@/hooks/useAppointments";
import useAppointmentsStore from "@/stores/useAppointmentsStore";
import DaysOfWeekSelector from "@/components/DaysOfWeekSelector";

interface AppointmentFormProps {
  onClose: () => void;
}

const AppointmentBulkForm: React.FC<AppointmentFormProps> = ({ onClose }) => {
  const { appointment, setAppointment } = useAppointmentsStore();
  const { createAppointment } = useAppointments();
  const [isEditing, setIsEditing] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [timeInterval, setTimeInterval] = useState<number>(60);

  useEffect(() => {
    setIsEditing(appointment?._id !== undefined);
  }, [appointment]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (appointment) {
      const appointmentsToCreate: IAppointment[] = [];
      const startDate = new Date(appointment.date);
      const endDate = new Date(appointment.date);
      endDate.setDate(endDate.getDate() + 30); // Create appointments for the next 30 days

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (daysOfWeek.includes(d.getDay().toString())) {
          const times = generateTimesForDay(d, timeInterval);
          times.forEach((time) => {
            const { note, userId, services } = appointment;
            appointmentsToCreate.push({
              note,
              userId,
              services,
              date: new Date(d.toISOString().split("T")[0]),
              time,
            } as IAppointment);
          });
        }
      }

      for (const appt of appointmentsToCreate) {
        await createAppointment(appt);
      }
    }
    onClose();
  };

  const generateTimesForDay = (date: Date, interval: number) => {
    const times: string[] = [];
    const start = new Date(date);
    start.setHours(9, 0, 0, 0); // Start at 9:00 AM
    const end = new Date(date);
    end.setHours(18, 0, 0, 0); // End at 6:00 PM

    for (let t = start; t < end; t.setMinutes(t.getMinutes() + interval)) {
      times.push(t.toTimeString().split(" ")[0].substring(0, 5));
    }
    return times;
  };

  const handleDaysOfWeekChange = (day: string) => {
    setDaysOfWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <GenericForm
      title={isEditing ? "Editar Cita" : "Crear Citas en Masa"}
      onClose={() => onClose()}
      onSubmit={handleSubmit}
    >
      <FormField
        type="date"
        label="Fecha de Inicio"
        value={appointment?.date || ""}
        onChange={(e) =>
          setAppointment({
            ...appointment,
            date: e.target.value,
          } as unknown as IAppointment)
        }
      />
      <DaysOfWeekSelector
        daysOfWeek={daysOfWeek}
        onDaysOfWeekChange={handleDaysOfWeekChange}
      />
      <FormField
        type="number"
        label="Intervalo de Tiempo (minutos)"
        value={timeInterval}
        onChange={(e) => setTimeInterval(parseInt(e.target.value))}
      />
    </GenericForm>
  );
};

export default AppointmentBulkForm;
