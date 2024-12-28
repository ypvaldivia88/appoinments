import React, { useEffect } from "react";
import { IUser } from "@/models/User";
import GenericForm from "@/components/GenericForm";
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

  return (
    <GenericForm
      title={isEditing ? "Editar Servicio" : "Crear Servicio"}
      onClose={() => onClose()}
      onSubmit={() => (isEditing ? updateUser : createUser)}
    >
      <FormField
        type="text"
        label="Name"
        value={user?.name || ""}
        onChange={(e) => setUser({ ...user, name: e.target.value } as IUser)}
      />
      <FormField
        type="text"
        label="Email"
        value={user?.phone || ""}
        onChange={(e) =>
          setUser({
            ...user,
            email: e.target.value,
          } as unknown as IUser)
        }
      />
      <FormField
        type="text"
        label="Password"
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
        label="Administrador"
        value={user?.isAdmin || false}
        onChange={(e) =>
          setUser({
            ...user,
            isAdmin: e.target.value,
          } as unknown as IUser)
        }
      />
    </GenericForm>
  );
};

export default UserForm;
