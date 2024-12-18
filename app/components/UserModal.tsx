import { useState } from "react";
import { IUser } from "@/app/models/User";
import useValidation from "../hooks/useValidation";

export default function UserModal({
  user,
  onClose,
  onSave,
}: {
  user: IUser | null;
  onClose: () => void;
  onSave: (user: IUser) => void;
}) {
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState(user?.password || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const [error, setError] = useState("");
  const { validateUser } = useValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateUser(name, phone, password, !!user, confirmPassword);
    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }
    const options = {
      method: user ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, password, isAdmin }),
    };
    const response = await fetch(
      "/api/users" + (user ? `/${user._id}` : ""),
      options
    );
    const savedUser = await response.json();
    onSave(savedUser);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-700 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md  mx-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">
          {user ? "Editar Usuario" : "Crear Usuario"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled={!!user}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2">
              Repetir Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          <div className="flex items-center mb-4">
            <input
              id="isadmin-checkbox"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="isadmin-checkbox"
              className="ms-2 mt-1 text-sm font-medium text-gray-200"
            >
              Es Admin
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors mr-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-pink-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-pink-700 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
