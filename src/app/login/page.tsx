"use client";
import { useState } from "react";
import useValidation from "@/hooks/useValidation";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";

interface FormValues {
  name: string;
  phone: string;
  password: string;
  repeatedPassword: string;
}

export default function Login({}) {
  const router = useRouter();
  const { validateUser } = useValidation();
  const { handleLogin, handleRegister, session, loading } = useSession();

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [name, setName] = useState<FormValues["name"]>("");
  const [phone, setPhone] = useState<FormValues["phone"]>("");
  const [password, setPassword] = useState<FormValues["password"]>("");
  const [repeatedPassword, setRepeatedPassword] =
    useState<FormValues["password"]>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    if (isRegister) await handleRegister(name, phone, password);
    else await handleLogin(phone, password);

    router.push(session?.isAdmin ? "/admin/appointments" : "/book");
  };

  return loading ? (
    "Cargando..."
  ) : (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
        {isRegister ? "Registrarse" : "Iniciar Sesión"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className=" p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md bg-gradient-secondary"
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
        className="mt-4 text-secondary hover:underline"
        disabled={loading}
      >
        {isRegister
          ? "¿Ya tienes una cuenta? Iniciar Sesión"
          : "¿No tienes una cuenta? Registrarse"}
      </button>
    </div>
  );
}
