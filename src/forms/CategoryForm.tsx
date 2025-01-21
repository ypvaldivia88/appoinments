import React, { useEffect } from "react";
import { ICategory } from "@/models/Category";
import GenericForm from "@/forms/GenericForm";
import FormField from "@/forms/FormField";
import useCategories from "@/hooks/useCategories";

interface CategoryFormProps {
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onClose }) => {
  const { category, createCategory, setCategory, updateCategory } =
    useCategories();
  const [isEditing, setIsEditing] = React.useState(false);

  useEffect(() => {
    setIsEditing(category?._id !== undefined);
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await updateCategory();
    } else {
      await createCategory();
    }
    setCategory(null);
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
        label="Nombre"
        value={category?.name || ""}
        onChange={(e) =>
          setCategory({ ...category, name: e.target.value } as ICategory)
        }
      />
      <FormField
        type="text"
        label="Descripción"
        value={category?.description || ""}
        onChange={(e) =>
          setCategory({
            ...category,
            description: e.target.value,
          } as ICategory)
        }
      />
    </GenericForm>
  );
};

export default CategoryForm;
