"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useValidation from "@/hooks/useValidation";
import useSessionStore from "@/stores/useSessionStore";

interface FormValues {
  name: string;
  phone: string;
  password: string;
  repeatedPassword: string;
}

export default function Login({}) {
  const router = useRouter();
  const { push } = router;
  const { validateUser } = useValidation();

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [name, setName] = useState<FormValues["name"]>("");
  const [phone, setPhone] = useState<FormValues["phone"]>("");
  const [password, setPassword] = useState<FormValues["password"]>("");
  const [repeatedPassword, setRepeatedPassword] =
    useState<FormValues["password"]>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const setSession = useSessionStore((state) => state.setSession);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous error message
    const errors = validateUser(
      name,
      phone,
      password,
      false,
      isRegister ? repeatedPassword : undefined
    );
    if (isRegister && errors.length > 0) {
      setErrorMessage(errors.join("\n"));
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
    const data = await response.json();

    if (response.ok) {
      Cookies.set("userId", data._id.toString());
      setSession(data);
      setTimeout(() => {
        push("/book");
      }, 1000);
    } else {
      setErrorMessage(data.error || data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-main p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        {isRegister ? "Registrarse" : "Iniciar Sesión"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className=" p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md bg-gray-500 bg-opacity-10"
      >
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}
        {isRegister && (
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {isRegister && (
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Repetir Contraseña
            </label>
            <input
              type="password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="font-bold py-2 px-4 rounded-full shadow-lg bg-purple-600 text-white hover:bg-purple-400 transition-colors w-full"
        >
          {isRegister ? "Registrarse" : "Iniciar Sesión"}
        </button>
      </form>
      <button
        onClick={() => setIsRegister(!isRegister)}
        className="mt-4 text-primary hover:underline"
      >
        {isRegister
          ? "¿Ya tienes una cuenta? Iniciar Sesión"
          : "¿No tienes una cuenta? Registrarse"}
      </button>
    </div>
  );
}
