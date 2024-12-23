import React, { useEffect, useState } from "react";
import { IAppointment } from "@/models/Appointment";
import GenericForm from "@/components/GenericForm";
import FormField from "@/components/FormField";
import useAppointments from "@/hooks/useAppointments";
import useServices from "@/hooks/useServices";

interface AppointmentFormProps {
  onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onClose }) => {
  const { createAppointment, updateAppointment } = useAppointments();
  const { services } = useServices();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [appointment, setAppointment] = useState<IAppointment | undefined>();

  useEffect(() => {
    setIsEditing(appointment?._id !== undefined);
  }, [appointment]);

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedServices(selected);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (appointment) {
      appointment.services = selectedServices;
      if (isEditing && appointment._id) {
        await updateAppointment(appointment._id.toString(), appointment);
      } else {
        await createAppointment(appointment);
      }
    }
    onClose();
  };

  return (
    <GenericForm
      title={isEditing ? "Editar Cita" : "Crear Cita"}
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
      <div className="mb-4">
        <label className="block text-gray-200 text-sm font-bold mb-2">
          Servicios
        </label>
        <select
          multiple
          value={selectedServices}
          onChange={handleServiceChange}
        >
          {services.map((service) => (
            <option key={service._id.toString()} value={service._id.toString()}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
    </GenericForm>
  );
};

export default AppointmentForm;
