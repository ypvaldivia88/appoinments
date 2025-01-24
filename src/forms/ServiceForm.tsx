import React, { useEffect } from "react";
import { IService } from "@/models/Service";
import GenericForm from "@/forms/GenericForm";
import FormField from "@/forms/FormField";
import useServices from "@/hooks/useServices";
import { ICategory } from "@/models/Category";
import useCategories from "@/hooks/useCategories";

interface ServiceFormProps {
  onClose: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onClose }) => {
  const { service, createService, setService, updateService } = useServices();
  const { categories } = useCategories();
  const [isEditing, setIsEditing] = React.useState(false);

  useEffect(() => {
    setIsEditing(service?._id !== undefined);
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await updateService();
    } else {
      await createService();
    }
    onClose();
  };

  return (
    <GenericForm
      title={isEditing ? "Editar Servicio" : "Crear Servicio"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <FormField
        type="text"
        label="Name"
        value={service?.name}
        onChange={(e) =>
          setService({ ...service, name: e.target.value } as IService)
        }
      />
      <FormField
        type="text"
        label="Description"
        value={service?.description}
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
        value={service?.price}
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
        value={service?.duration}
        onChange={(e) =>
          setService({
            ...service,
            duration: parseInt(e.target.value),
          } as IService)
        }
      />
      <FormField
        type="select"
        label="Categoría"
        value={
          typeof service?.category === "object"
            ? (service.category as ICategory)._id.toString()
            : service?.category
        }
        onChange={(e) =>
          setService({
            ...service,
            category: e.target.value,
          } as IService)
        }
        options={categories.map((category: ICategory) => ({
          value: category._id.toString(),
          label: category.name,
        }))}
      />
    </GenericForm>
  );
};

export default ServiceForm;
