"use client";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

interface User {
  user_id: number;
  name: string | null;
  phone: string;
  isAdmin: boolean;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

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

  const handleDelete = async (user_id: number) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });
    setUsers(users.filter((user) => user.user_id !== user_id));
  };

  if (!isAdmin) {
    return <div>No tienes acceso a esta página.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 dark:from-pink-700 dark:via-purple-700 dark:to-indigo-700 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        Gestión de Usuarios
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl">
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
                    className="bg-red-500 dark:bg-red-700 text-white font-bold py-1 px-2 rounded-full shadow-lg hover:bg-red-700 dark:hover:bg-red-900 transition-colors"
                    onClick={() => handleDelete(user.user_id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
