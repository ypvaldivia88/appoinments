/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from "react";
import { IUser } from "@/models/User";
import GenericForm from "@/forms/GenericForm";
import FormField from "@/components/FormField";
import useUsers from "@/hooks/useUsers";

interface UserFormProps {
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onClose }) => {
  const { user, createUser, setUser, updateUser } = useUsers();
  const [isEditing, setIsEditing] = React.useState(false);

  useEffect(() => {
    setIsEditing(user?._id !== undefined);
  }, [user]);

  const handleSubmit = () => {
    isEditing && user?._id
      ? updateUser(user._id.toString(), user)
      : createUser();
    onClose();
  };

  return (
    <GenericForm
      title={isEditing ? "Editar Servicio" : "Crear Servicio"}
      onClose={() => onClose()}
      onSubmit={handleSubmit}
    >
      <FormField
        type="text"
        label="Nombre"
        value={user?.name || ""}
        onChange={(e) => setUser({ ...user, name: e.target.value } as IUser)}
      />
      <FormField
        type="phone"
        label="Teléfono"
        value={user?.phone || ""}
        onChange={(e) =>
          setUser({
            ...user,
            phone: e.target.value,
          } as unknown as IUser)
        }
      />
      <FormField
        type="text"
        label="Contraseña"
        value={user?.password || ""}
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value,
          } as IUser)
        }
      />
      <FormField
        type="checkbox"
        label="¿Es Administrador?"
        checked={user?.isAdmin as boolean}
        onChange={(e) =>
          setUser({
            ...user,
            isAdmin: e.target.checked,
          } as unknown as IUser)
        }
      />
    </GenericForm>
  );
};

export default UserForm;
