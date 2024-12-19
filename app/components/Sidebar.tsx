"use client";

import Link from "next/link";

interface SidebarProps {
  isNavOpen: boolean;
  activeLink: string;
  setActiveLink: (link: string) => void;
}

export default function Sidebar({
  isNavOpen,
  activeLink,
  setActiveLink,
}: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out w-64 text-white md:relative md:translate-x-0 backdrop-filter backdrop-blur-md bg-opacity-30 backdrop-saturate-50 backdrop-contrast-75 ${
        isNavOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold">Administración</h2>
      </div>
      <nav>
        <ul>
          <li
            className={`p-4 ${activeLink === "users" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveLink("users")}
          >
            <Link
              href="/admin/users"
              className="text-lg text-blue-200 hover:text-purple-400 transition-colors"
            >
              Usuarios
            </Link>
          </li>
          <li
            className={`p-4 ${
              activeLink === "appointments" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveLink("appointments")}
          >
            <Link
              href="/admin/appointments"
              className="text-lg text-blue-200 hover:text-purple-400 transition-colors"
            >
              Turnos
            </Link>
          </li>
          <li
            className={`p-4 ${activeLink === "services" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveLink("services")}
          >
            <Link
              href="/admin/services"
              className="text-lg text-blue-200 hover:text-purple-400 transition-colors"
            >
              Servicios
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
