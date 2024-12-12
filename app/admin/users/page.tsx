"use client";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import bcrypt from "bcryptjs"; // Import bcrypt

interface User {
  user_id: number;
  name: string | null;
  phone: string;
  password: string; // Added password field
  isAdmin: boolean;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    const checkAdmin = async () => {
      // Replace with actual admin check logic
      const admin = true; // Example: fetch from session or context
      setIsAdmin(admin);
    };

    fetchUsers();
    checkAdmin();
  }, []);

  const handleDelete = async (phone: string) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });
    setUsers(users.filter((user) => user.phone !== phone));
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleCreate = () => {
    setCurrentUser(null);
    setShowModal(true);
  };

  if (!isAdmin) {
    return <div>No tienes acceso a esta página.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 dark:from-pink-700 dark:via-purple-700 dark:to-indigo-700 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        Gestión de Usuarios
      </h1>
      <button
        className="bg-green-500 dark:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-green-700 dark:hover:bg-green-900 transition-colors mb-4"
        onClick={handleCreate}
      >
        <FaPlus /> Crear Usuario
      </button>
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="table-row">
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Nombre
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Teléfono
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-700">Admin</th>
              <th className="py-2 px-4 border-b dark:border-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => (
              <tr key={user.user_id} className="table-row">
                <td className="py-2 px-4 border-b dark:border-gray-700">
                  {user.name}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-700">
                  {user.phone}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-700">
                  {user.isAdmin ? "Sí" : "No"}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-700">
                  <button
                    className="bg-blue-500 dark:bg-blue-700 text-white font-bold py-1 px-2 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 dark:bg-red-700 text-white font-bold py-1 px-2 rounded-full shadow-lg hover:bg-red-700 dark:hover:bg-red-900 transition-colors"
                    onClick={() => handleDelete(user.phone)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <UserModal
          user={currentUser}
          onClose={() => setShowModal(false)}
          onSave={(savedUser) => {
            if (currentUser) {
              setUsers(
                users.map((user) =>
                  user.phone === savedUser.phone ? savedUser : user
                )
              );
            } else {
              setUsers([...users, savedUser]);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

function UserModal({
  user,
  onClose,
  onSave,
}: {
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}) {
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState(user?.password || ""); // Added password state
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = user ? "PUT" : "POST";
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash password
    const response = await fetch("/api/users", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, password: hashedPassword, isAdmin }), // Store hashed password
    });
    const savedUser = await response.json();
    onSave(savedUser);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {user ? "Editar Usuario" : "Crear Usuario"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled={!!user}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Admin
            </label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="shadow appearance-none border rounded text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 dark:bg-gray-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-900 transition-colors mr-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-pink-500 dark:bg-pink-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-pink-700 dark:hover:bg-pink-900 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
