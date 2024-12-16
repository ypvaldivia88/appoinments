"use client";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { IUser } from "@/app/models/User";
import UserModal from "@/app/components/UserModal";
import { useRouter } from "next/navigation";

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch("/api/session");
      const data = await response.json();
      if (data.error || !data.isAdmin) {
        router.push("/login");
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (_id: string) => {
    await fetch(`/api/users/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id.toString() !== _id)
    );
  };

  const handleEdit = (user: IUser) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleCreate = () => {
    setCurrentUser(null);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 dark:from-pink-700 dark:via-purple-700 dark:to-indigo-700 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        Gestión de Usuarios
      </h1>
      <button
        className="bg-green-500 dark:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-green-700 dark:hover:bg-green-900 transition-colors mb-4 flex items-center gap-2"
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
            {users?.map((user) => (
              <tr key={user._id.toString()} className="table-row">
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
                    onClick={() => handleDelete(user._id.toString())}
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
            setTimeout(() => {
              setUsers((prevUsers) => {
                if (currentUser) {
                  return prevUsers.map((user) =>
                    user.phone === savedUser.phone ? savedUser : user
                  );
                } else {
                  return [...prevUsers, savedUser];
                }
              });
              setShowModal(false);
            }, 0);
          }}
        />
      )}
    </div>
  );
}


