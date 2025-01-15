import React, { useEffect, useState } from "react";
import { IAppointment } from "@/models/Appointment";
import GenericForm from "@/forms/GenericForm";
import FormField from "@/forms/FormField";
import useAppointments from "@/hooks/useAppointments";
import { IUser } from "@/models/User";
import { IService } from "@/models/Service";
import useServices from "@/hooks/useServices";
import useUsers from "@/hooks/useUsers";

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
  const { users } = useUsers();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(appointment?._id !== undefined);
  }, [appointment]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (appointment) {
      if (isEditing && appointment._id) {
        await updateAppointment();
      } else {
        await createAppointment();
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

  return (
    <GenericForm
      title={isEditing ? "Editar Cita" : "Crear Cita"}
      onClose={() => onClose()}
      onSubmit={handleSubmit}
      onDelete={isEditing ? handleDelete : undefined}
    >
      <FormField
        type="date"
        label="Fecha"
        value={appointment?.date}
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
        value={appointment?.time as string}
        onChange={(e) =>
          setAppointment({
            ...appointment,
            time: e.target.value,
          } as IAppointment)
        }
      />
      <FormField
        type="select"
        label="Cliente"
        value={appointment?.userId as string}
        onChange={(e) =>
          setAppointment({
            ...appointment,
            userId: e.target.value,
          } as IAppointment)
        }
        options={users.map((user: IUser) => ({
          key: user._id.toString(),
          label: user.name,
        }))}
      />
      <FormField
        type="select-multiple"
        label="Servicios"
        value={appointment?.services as string[]}
        onChange={(e) =>
          setAppointment({
            ...appointment,
            services: Array.from(
              (e.target as HTMLSelectElement).selectedOptions,
              (option) => option.value
            ),
          } as IAppointment)
        }
        options={services.map((service: IService) => ({
          key: service._id.toString(),
          label: service.name,
        }))}
      />
    </GenericForm>
  );
};

export default AppointmentForm;
