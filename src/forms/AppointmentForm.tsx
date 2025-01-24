import React, { useEffect, useState } from "react";
import { IAppointment } from "@/models/Appointment";
import GenericForm from "@/forms/GenericForm";
import FormField from "@/forms/FormField";
import useAppointments from "@/hooks/useAppointments";
import { IUser } from "@/models/User";
import { IService } from "@/models/Service";
import useServices from "@/hooks/useServices";
import useUsers from "@/hooks/useUsers";
import ServiceSelector from "@/components/ServiceSelector";
import dayjs from "dayjs";

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

  const { users } = useUsers();
  const { services } = useServices();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);

  useEffect(() => {
    setIsEditing(appointment?._id !== undefined);
    if (appointment?.services && appointment.services.length > 0) {
      setSelectedServices(
        services.filter((service) =>
          appointment.services?.includes(service._id.toString())
        )
      );
    }
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
        value={dayjs(appointment?.date).format("YYYY-MM-DD")}
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
        value={
          typeof appointment?.user === "object"
            ? (appointment.user as IUser)._id.toString()
            : appointment?.user?.toString()
        }
        onChange={(e) =>
          setAppointment({
            ...appointment,
            user: e.target.value,
          } as IAppointment)
        }
        options={users.map((user: IUser) => ({
          value: user._id.toString(),
          label: user.name,
        }))}
      />
      <ServiceSelector
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
      />
    </GenericForm>
  );
};

export default AppointmentForm;
