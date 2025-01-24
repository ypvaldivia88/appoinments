import React from "react";

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label?: string;
  type?: string;
  value?: string | boolean | number | Date | string[] | object;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  disabled?: boolean;
  checked?: boolean;
  options?: Option[];
}

export default function FormField({
  label,
  type,
  value,
  onChange,
  required = false,
  disabled = false,
  checked = false,
  options = [],
}: FormFieldProps) {
  const inputRef = React.createRef<HTMLInputElement>();

  const checkboxInput = () => (
    <>
      <input
        ref={inputRef}
        type={type}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      <label
        className="block text-gray-200 text-sm font-bold mb-0"
        htmlFor={inputRef.current?.id}
      >
        {label}
      </label>
    </>
  );

  const textInput = () => (
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

  const selectInput = () => (
    <>
      <label className={"block text-gray-200 text-sm font-bold mb-2"}>
        {label}
      </label>
      <select
        value={value as string}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required={required}
        disabled={disabled}
      >
        <option value="">Seleccione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );

  const selectMultipleInput = () => (
    <>
      <label className={"block text-gray-200 text-sm font-bold mb-2"}>
        {label}
      </label>
      <select
        multiple
        value={value as string[]}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required={required}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );

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
          case "radio":
            return checkboxInput();
          case "select":
            return selectInput();
          case "select-multiple":
            return selectMultipleInput();
          default:
            return textInput();
        }
      })()}
    </div>
  );
}
