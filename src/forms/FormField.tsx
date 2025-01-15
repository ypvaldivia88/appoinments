import React from "react";

interface FormFieldProps {
  label?: string;
  type?: string;
  value?: string | boolean | number | Date;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  checked?: boolean;
}

export default function FormField({
  label,
  type,
  value,
  onChange,
  required = false,
  disabled = false,
  checked = false,
}: FormFieldProps) {
  return (
    <div
      className={[
        type === "checkbox" ? "flex items-center gap-2" : "",
        "mb-4",
      ].join(" ")}
    >
      {(() => {
        switch (type) {
          case "checkbox":
            return (
              <>
                <input
                  type={type}
                  checked={checked}
                  onChange={onChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label className="block text-gray-200 text-sm font-bold mb-0">
                  {label}
                </label>
              </>
            );
          default:
            return (
              <>
                <label className={"block text-gray-200 text-sm font-bold mb-2"}>
                  {label}
                </label>
                <input
                  type={type}
                  value={value as string}
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required={required}
                  disabled={disabled}
                />
              </>
            );
        }
      })()}
    </div>
  );
}
