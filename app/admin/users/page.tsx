"use client";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { IUser } from "@/app/models/User";
import UserForm from "@/app/components/UserForm";
import { useRouter } from "next/navigation";
import useGlobalStore from "@/app/store/useGlobalStore";

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const session = useGlobalStore((state) => state.session);

  useEffect(() => {
    if (session && !session.isAdmin) {
      // router.push("/login");
    }
  }, [router, session]);

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
    <div className="flex flex-col items-start justify-center min-h-screen bg-gradient-main p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        Gestión de Usuarios
      </h1>
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-green-700 transition-colors mb-4 flex items-center gap-2"
        onClick={handleCreate}
      >
        <FaPlus /> Crear Usuario
      </button>
      <div className="backdrop-filter backdrop-contrast-75 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="table-row">
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Teléfono</th>
              <th className="py-2 px-4 border-b">Admin</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users?.map((user) => (
              <tr key={user._id.toString()} className="table-row">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">
                  {user.isAdmin ? "Sí" : "No"}
                </td>
                <td className="py-2 px-4 border-b flex">
                  <button
                    className="bg-blue-500 text-white font-bold py-1 px-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white font-bold py-1 px-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"
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
        <UserForm
          user={currentUser}
          onClose={() => setShowModal(false)}
          onSave={(savedUser) => {
            setUsers((prevUsers) => {
              if (currentUser) {
                return prevUsers.map((user) =>
                  user._id === savedUser._id ? savedUser : user
                );
              } else {
                return [...prevUsers, savedUser];
              }
            });
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}


