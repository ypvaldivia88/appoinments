import React, { useEffect, useRef } from "react";
import Modal from "@/app/components/Modal";

interface GenericFormProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  children: React.ReactNode;
}

export default function GenericForm({
  title,
  onSubmit,
  onClose,
  children,
}: GenericFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <Modal title={title} onClose={onClose}>
      <div ref={modalRef}>
        <form onSubmit={onSubmit}>
          {children}
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
              className="font-bold py-2 px-4 rounded-full shadow-lg bg-purple-600 text-white hover:bg-purple-400 transition-colors w-full"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
