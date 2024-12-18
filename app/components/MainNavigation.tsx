"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import useGlobalStore from "@/app/store/useGlobalStore";

export default function MainNavigation() {
  const router = useRouter();
  const { push } = router;
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const session = useGlobalStore((state) => state.session);
  const clearSession = useGlobalStore((state) => state.clearSession);

  useEffect(() => {
    if (session) {
      setIsAdmin(session.isAdmin);
      setIsAuthed(true);
    }
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".admin-menu")) {
        setIsAdminMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const endpoint = "/api/logout";
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      clearSession();
      setIsAdmin(false);
      setIsAuthed(false);
      setTimeout(() => {
        push("/login");
      }, 1000); // wait for 1 second before redirecting
    }
  };

  const handleMenuOptionClick = () => {
    setIsAdminMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-ios shadow-md p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Image
            src="/logo-small.png"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <Link href="/" className="text-xl font-bold text-pink-500">
            Oh&apos;Diosa Nails
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/book"
            className="text-lg text-gray-700 hover:text-pink-500 transition-colors"
          >
            Reserva
          </Link>
          {isAdmin && (
            <div className="relative admin-menu">
              <button
                onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                className="text-lg text-gray-700 hover:text-pink-500 transition-colors"
              >
                Administrar
              </button>
              {isAdminMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                  <Link
                    href="/admin/users"
                    onClick={handleMenuOptionClick}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Usuarios
                  </Link>
                  <Link
                    href="/admin/appointments"
                    onClick={handleMenuOptionClick}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Turnos
                  </Link>
                </div>
              )}
            </div>
          )}
          {isAuthed && (
            <button
              onClick={handleLogout}
              className="text-lg text-gray-700 hover:text-pink-500 transition-colors"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
