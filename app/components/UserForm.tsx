import { IUser } from "@/app/models/User";
import useUserForm from "@/app/hooks/useUserForm";
import GenericForm from "@/app/components/GenericForm";
import FormField from "@/app/components/FormField";

export default function UserForm({
  user,
  onClose,
  onSave,
}: {
  user: IUser | null;
  onClose: () => void;
  onSave: (user: IUser) => void;
}) {
  const {
    name,
    setName,
    phone,
    setPhone,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isAdmin,
    setIsAdmin,
    error,
    handleSubmit,
  } = useUserForm(user, onSave);

  return (
    <GenericForm
      title={user ? "Editar Usuario" : "Crear Usuario"}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <FormField
        label="Nombre"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <FormField
        label="Teléfono"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        disabled={!!user}
      />
      <FormField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormField
        label="Repetir Contraseña"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
      <FormField
        label="Es Admin"
        type="checkbox"
        value={isAdmin}
        onChange={(e) => setIsAdmin(e.target.checked)}
      />
    </GenericForm>
  );
}
