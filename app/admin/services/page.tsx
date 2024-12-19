"use client";
import React from "react";
import useServices from "@/app/hooks/useServices";
import ServiceForm from "@/app/forms/ServiceForm";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { IService } from "@/app/models/Service";

const ServicesPage: React.FC = () => {
  const { services, setService, deleteService } = useServices();

  const [showModal, setShowModal] = React.useState(false);

  const handleDelete = async (_id: string) => {
    await deleteService(_id);
  };

  const handleEdit = (service: IService) => {
    setService(service);
    setShowModal(true);
  };

  const handleCreate = () => {
    setService(null);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-main p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        Gestión de Servicios
      </h1>
      <button
        className="bg-purple-600 text-white hover:bg-purple-400 transition-colors font-bold py-2 px-4 rounded-full shadow-lg mb-4 flex items-center gap-2"
        onClick={handleCreate}
      >
        <FaPlus /> Crear Servicio
      </button>
      <div className="p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-x-auto bg-gray-500 bg-opacity-10">
        <table className="min-w-full">
          <thead>
            <tr className="table-row">
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Descripción</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Duración</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {services?.map((service) => (
              <tr key={service._id.toString()} className="table-row">
                <td className="py-2 px-4 border-b">{service.name}</td>
                <td className="py-2 px-4 border-b">{service.description}</td>
                <td className="py-2 px-4 border-b">{service.price}</td>
                <td className="py-2 px-4 border-b">{service.duration}</td>
                <td className="py-2 px-4 border-b flex justify-center flex-nowrap">
                  <button
                    className=" text-blue-500 font-bold py-1 px-2 rounded-full shadow-lg hover:text-blue-700 transition-colors mr-2"
                    onClick={() => handleEdit(service)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className=" text-red-500 font-bold py-1 px-2 rounded-full shadow-lg hover:text-red-700 transition-colors"
                    onClick={() => handleDelete(service._id.toString())}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <ServiceForm onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ServicesPage;
