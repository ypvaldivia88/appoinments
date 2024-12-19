import React, { useEffect } from "react";
import { IService } from "@/app/models/Service";
import GenericForm from "@/app/components/GenericForm";
import FormField from "@/app/components/FormField";
import useServices from "../hooks/useServices";

interface ServiceFormProps {
  onClose: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onClose }) => {
  const { service, createService, setService, updateService } = useServices();
  const [isEditing, setIsEditing] = React.useState(false);

  useEffect(() => {
    setIsEditing(service?._id !== undefined);
  }, [service]);

  return (
    <GenericForm
      title={isEditing ? "Editar Servicio" : "Crear Servicio"}
      onClose={() => onClose()}
      onSubmit={() => (isEditing ? updateService : createService)}
    >
      <FormField
        type="text"
        label="Name"
        value={service?.name || ""}
        onChange={(e) =>
          setService({ ...service, name: e.target.value } as IService)
        }
      />
      <FormField
        type="text"
        label="Description"
        value={service?.description || ""}
        onChange={(e) =>
          setService({
            ...service,
            description: e.target.value,
          } as IService)
        }
      />
      <FormField
        type="number"
        label="Price"
        value={service?.price || 0}
        onChange={(e) =>
          setService({
            ...service,
            price: parseFloat(e.target.value),
          } as IService)
        }
      />
      <FormField
        type="number"
        label="Duration"
        value={service?.duration || 0}
        onChange={(e) =>
          setService({
            ...service,
            duration: parseInt(e.target.value),
          } as IService)
        }
      />
    </GenericForm>
  );
};

export default ServiceForm;
