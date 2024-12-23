import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TableProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T }[];
  handleEdit: (item: T) => void;
  handleDelete: (id: string) => void;
}

const Table = <T extends { _id: string }>({
  data,
  columns,
  handleEdit,
  handleDelete,
}: TableProps<T>) => {
  return (
    <div className="p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-x-auto bg-gray-500 bg-opacity-10">
      <table className="min-w-full">
        <thead>
          <tr className="table-row">
            {columns.map((column) => (
              <th key={column.header} className="py-2 px-4 border-b">
                {column.header}
              </th>
            ))}
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((item) => (
            <tr key={item._id.toString()} className="table-row">
              {columns.map((column) => (
                <td
                  key={column.accessor as string}
                  className="py-2 px-4 border-b"
                >
                  {String(item[column.accessor])}
                </td>
              ))}
              <td className="py-2 px-4 border-b flex justify-center">
                <button
                  className=" text-blue-500 font-bold py-1 px-2 rounded-full shadow-lg hover:text-blue-700 transition-colors mr-2"
                  onClick={() => handleEdit(item)}
                >
                  <FaEdit />
                </button>
                <button
                  className=" text-red-500 font-bold py-1 px-2 rounded-full shadow-lg hover:text-red-700 transition-colors"
                  onClick={() => handleDelete(item._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
