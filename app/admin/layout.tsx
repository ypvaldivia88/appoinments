"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { FaBars } from "react-icons/fa";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [activeLink, setActiveLink] = useState("users");
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 bg-gray-800 text-white md:relative md:translate-x-0`}
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
              <Link href="/admin/users">Administración de Usuarios</Link>
            </li>
            <li
              className={`p-4 ${
                activeLink === "appointments" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveLink("appointments")}
            >
              <Link href="/admin/appointments">Administración de Turnos</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main
        className="flex-1 bg-gray-700 ml-0"
        style={{ width: "calc(100% - 16rem)" }}
      >
        <header className="bg-slate-700 shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-200">
            Panel de Administración
          </h1>
          <button
            className="text-white md:hidden"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <FaBars />
          </button>
        </header>
        <div className="p-0">{children}</div>
      </main>
    </div>
  );
}
