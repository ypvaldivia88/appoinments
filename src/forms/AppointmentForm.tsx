import React, { useEffect, useState } from "react";
import { IAppointment } from "@/models/Appointment";
import GenericForm from "@/components/GenericForm";
import FormField from "@/components/FormField";
import useAppointments from "@/hooks/useAppointments";
import dayjs from "dayjs";
import { IUser } from "@/models/User";
import { IService } from "@/models/Service";
import useServices from "@/hooks/useServices";

interface AppointmentFormProps {
  onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onClose }) => {
  const {
    appointment,
    setAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  } = useAppointments();

  const { services } = useServices();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(appointment?._id !== undefined);
  }, [appointment]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (appointment) {
      if (isEditing && appointment._id) {
        await updateAppointment(appointment._id.toString(), appointment);
      } else {
        await createAppointment(appointment);
      }
    }
    onClose();
  };

  const handleDelete = async () => {
    if (appointment?._id) {
      // confirm before delete
      if (window.confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
        await deleteAppointment(appointment._id);
        onClose();
      }
    }
  };

  console.log(appointment);

  return (
    <GenericForm
      title={isEditing ? "Editar Cita" : "Crear Cita"}
      onClose={() => onClose()}
      onSubmit={handleSubmit}
      onDelete={appointment ? handleDelete : undefined}
    >
      <FormField
        type="date"
        label="Fecha"
        value={dayjs(appointment?.date).format("YYYY-MM-DD") || ""}
        onChange={(e) =>
          setAppointment({
            ...appointment,
            date: dayjs(e.target.value).toDate(),
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
      {typeof appointment?.userId === "object" &&
        appointment?.userId !== null && (
          <p className="text-sm text-gray-400 mb-4">
            <strong className="text-gray-200">Cliente:</strong>{" "}
            {(appointment.userId as IUser).name}
          </p>
        )}
      {appointment?.services && appointment.services.length > 0 && (
        <p className="text-sm text-gray-400 mb-4">
          <strong className="text-gray-200">Servicios:</strong>{" "}
          {services.map((service: IService) => {
            if (appointment.services?.includes(service._id.toString())) {
              return service.name;
            }
          })}
        </p>
      )}
    </GenericForm>
  );
};

export default AppointmentForm;
