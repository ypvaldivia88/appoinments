"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("users")) {
      setActiveLink("users");
    } else if (pathname.includes("appointments")) {
      setActiveLink("appointments");
    } else if (pathname.includes("services")) {
      setActiveLink("services");
    }
  }, [pathname, setActiveLink]);

  return (
    <aside
      className={`bg-gradient-secondary fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out w-64 text-white md:relative md:translate-x-0  ${
        isNavOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold">Administración</h2>
      </div>
      <nav>
        <ul>
          <Link
            href="/admin/appointments"
            className="text-lg text-blue-200 hover:text-purple-400 transition-colors"
          >
            <li
              className={`p-4 ${
                activeLink === "appointments" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveLink("appointments")}
            >
              Citas
            </li>
          </Link>
          <Link
            href="/admin/services"
            className="text-lg text-blue-200 hover:text-purple-400 transition-colors"
          >
            <li
              className={`p-4 ${
                activeLink === "services" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveLink("services")}
            >
              Servicios
            </li>
          </Link>
          <Link
            href="/admin/users"
            className="text-lg text-blue-200 hover:text-purple-400 transition-colors"
          >
            <li
              className={`p-4 ${activeLink === "users" ? "bg-gray-700" : ""}`}
              onClick={() => setActiveLink("users")}
            >
              Usuarios
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
}
