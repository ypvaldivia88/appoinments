"use client";
import { useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import UserForm from "@/forms/UserForm";
import useUsers from "@/hooks/useUsers";
import { IUser } from "@/models/User";

export default function Users() {
  const { users, deleteUser, setUser } = useUsers();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (user: IUser) => {
    setUser(user);
    setShowModal(true);
  };

  const handleCreate = () => {
    setUser(null);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 md:p-8 max-w-screen-sm overflow-x-auto mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        Gestión de Usuarios
      </h1>
      <button
        className="bg-purple-600 text-white hover:bg-purple-400 transition-colors font-bold py-2 px-4 rounded-full shadow-lg mb-4 flex items-center gap-2"
        onClick={handleCreate}
      >
        <FaPlus /> Crear Usuario
      </button>
      <div className="p-6 md:p-8 rounded-lg shadow-lg w-full max-w-80 md:max-w-screen-2xl overflow-x-auto bg-gradient-secondary">
        <div className="overflow-x-auto w-full">
          <table className="w-full">
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
                  <td className="py-2 px-4 border-b flex justify-center flex-nowrap">
                    <button
                      className=" text-blue-500 font-bold py-1 px-2 rounded-full shadow-lg hover:text-blue-700 transition-colors mr-2"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className=" text-red-500 font-bold py-1 px-2 rounded-full shadow-lg hover:text-red-700 transition-colors"
                      onClick={() => deleteUser(user._id.toString())}
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
      {showModal && <UserForm onClose={() => setShowModal(false)} />}
    </div>
  );
}


