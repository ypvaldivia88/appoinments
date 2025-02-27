"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSession from "@/hooks/useSession";

export default function TopNavigation() {
  const { session, handleLogout } = useSession();
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

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

  const handleMenuOptionClick = () => {
    setIsAdminMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-secondary shadow-md p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Image
            src="/logo-small.png"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <Link
            href="/"
            className="text-xl font-bold text-purple-600 hover:text-purple-400 transition-colors"
          >
            Oh&apos;Diosa Nails
          </Link>
        </div>
        <div className="flex space-x-4">
          {session?.isAdmin ? (
            <div className="relative admin-menu">
              <button
                onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                className="text-lg text-blue-200 hover:text-purple-400 transition-colors"
              >
                Administrar
              </button>
              {isAdminMenuOpen && (
                <div className="absolute mt-2 w-48 bg-slate-800 shadow-lg rounded-md py-2 z-50">
                  <Link
                    href="/admin/appointments"
                    onClick={handleMenuOptionClick}
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                  >
                    Citas
                  </Link>
                  <Link
                    href="/admin/services"
                    onClick={handleMenuOptionClick}
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                  >
                    Servicios
                  </Link>
                  <Link
                    href="/admin/categories"
                    onClick={handleMenuOptionClick}
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                  >
                    Categorías
                  </Link>
                  <Link
                    href="/admin/users"
                    onClick={handleMenuOptionClick}
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                  >
                    Usuarios
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/book"
              className="text-lg text-blue-200 hover:text-purple-400 transition-colors"
            >
              Reserva
            </Link>
          )}
          {session && (
            <button
              onClick={handleLogout}
              className="text-lg text-blue-200 hover:text-purple-400 transition-colors"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
