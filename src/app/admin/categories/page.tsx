"use client";
import React from "react";
import useCategories from "@/hooks/useCategories";
import CategoryForm from "@/forms/CategoryForm";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { ICategory } from "@/models/Category";

const CategoriesPage: React.FC = () => {
  const { categories, setCategory, deleteCategory } = useCategories();

  const [showModal, setShowModal] = React.useState(false);

  const handleDelete = async (_id: string) => {
    await deleteCategory(_id);
  };

  const handleEdit = (category: ICategory) => {
    setCategory(category);
    setShowModal(true);
  };

  const handleCreate = () => {
    setCategory(null);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        Gestión de Categorías
      </h1>
      <button
        className="bg-purple-600 text-white hover:bg-purple-400 transition-colors font-bold py-2 px-4 rounded-full shadow-lg mb-4 flex items-center gap-2"
        onClick={handleCreate}
      >
        <FaPlus /> Crear Categoría
      </button>
      <div className="p-6 md:p-8 rounded-lg shadow-lg w-full max-w-80 md:max-w-screen-2xl overflow-x-auto bg-gradient-secondary">
        <table className="min-w-full">
          <thead>
            <tr className="table-row">
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Descripción</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {categories?.map((category) => (
              <tr key={category._id.toString()} className="table-row">
                <td className="py-2 px-4 border-b">{category.name}</td>
                <td className="py-2 px-4 border-b">{category.description}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-center flex-nowrap gap-4 items-center">
                    <button
                      className=" text-blue-500 font-bold rounded-full shadow-lg hover:text-blue-700 transition-colors"
                      onClick={() => handleEdit(category)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className=" text-red-500 font-bold rounded-full shadow-lg hover:text-red-700 transition-colors"
                      onClick={() => handleDelete(category._id.toString())}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <CategoryForm onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default CategoriesPage;
