"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useValidation from "../hooks/useValidation";

interface FormValues {
  name: string;
  phone: string;
  password: string;
  repeatedPassword: string;
}

export default function Login({}) {
  const [name, setName] = useState<FormValues["name"]>("");
  const [phone, setPhone] = useState<FormValues["phone"]>("");
  const [password, setPassword] = useState<FormValues["password"]>("");
  const [repeatedPassword, setRepeatedPassword] =
    useState<FormValues["password"]>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const router = useRouter();
  const { push } = router;
  const { validateUser } = useValidation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateUser(
      name,
      phone,
      password,
      isRegister ? repeatedPassword : undefined
    );
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }
    const endpoint = isRegister ? "/api/register" : "/api/login";
    const body = isRegister ? { name, phone, password } : { phone, password };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      setTimeout(() => {
        push("/book");
      }, 1000); // wait for 1 second before redirecting
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 dark:from-pink-700 dark:via-purple-700 dark:to-indigo-700 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        {isRegister ? "Registrarse" : "Iniciar Sesión"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {isRegister && (
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {isRegister && (
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Repetir Contraseña
            </label>
            <input
              type="password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-pink-500 dark:bg-pink-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-pink-700 dark:hover:bg-pink-900 transition-colors w-full"
        >
          {isRegister ? "Registrarse" : "Iniciar Sesión"}
        </button>
      </form>
      <button
        onClick={() => setIsRegister(!isRegister)}
        className="mt-4 text-pink-500 dark:text-pink-300 hover:underline"
      >
        {isRegister
          ? "¿Ya tienes una cuenta? Iniciar Sesión"
          : "¿No tienes una cuenta? Registrarse"}
      </button>
    </div>
  );
}
