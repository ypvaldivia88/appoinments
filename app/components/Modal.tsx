import React from "react";

export default function Modal({
  title,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className=" p-6 md:p-8 rounded-lg w-full max-w-md mx-4 backdrop-filter  backdrop-blur-md bg-opacity-30 backdrop-saturate-50 backdrop-contrast-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">{title}</h2>
        {children}
      </div>
    </div>
  );
}
