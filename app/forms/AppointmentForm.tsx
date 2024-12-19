import React, { useEffect, useState } from "react";
import { IAppointment } from "@/app/models/Appointment";
import GenericForm from "@/app/components/GenericForm";
import FormField from "@/app/components/FormField";
import useAppointments from "../hooks/useAppointments";

interface AppointmentFormProps {
  onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onClose }) => {
  const { appointment, createAppointment, setAppointment, updateAppointment } =
    useAppointments();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(appointment?._id !== undefined);
  }, [appointment]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (appointment) {
      if (isEditing) {
        await updateAppointment(appointment._id.toString(), appointment);
      } else {
        await createAppointment(appointment);
      }
    }
    onClose();
  };

  return (
    <GenericForm
      title={isEditing ? "Editar Turno" : "Crear Turno"}
      onClose={() => onClose()}
      onSubmit={handleSubmit}
    >
      <FormField
        type="date"
        label="Fecha"
        value={appointment?.date || ""}
        onChange={(e) =>
          setAppointment({
            ...appointment,
            date: e.target.value,
          } as unknown as IAppointment)
        }
      />
      <FormField
        type="time"
        label="Hora"
        value={appointment?.time || ""}
        onChange={(e) =>
          setAppointment({
            ...appointment,
            time: e.target.value,
          } as IAppointment)
        }
      />
    </GenericForm>
  );
};

export default AppointmentForm;
