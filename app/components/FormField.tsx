import React from "react";

interface FormFieldProps {
  label: string;
  type: string;
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

export default function FormField({
  label,
  type,
  value,
  onChange,
  required = false,
  disabled = false,
}: FormFieldProps) {
  return (
    <div
      className={[
        type === "checkbox" ? "flex items-center gap-2" : "",
        "mb-4",
      ].join(" ")}
    >
      {type === "checkbox" ? (
        <>
          <input
            type={type}
            checked={typeof value === "boolean" ? value : undefined}
            onChange={onChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            disabled={disabled}
          />
          <label className="block text-gray-200 text-sm font-bold mb-0">
            {label}
          </label>
        </>
      ) : (
        <>
          <label className={"block text-gray-200 text-sm font-bold mb-2"}>
            {label}
          </label>
          <input
            type={type}
            value={typeof value === "boolean" ? undefined : value}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            required={required}
            disabled={disabled}
          />
        </>
      )}
    </div>
  );
}
