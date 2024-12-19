"use client";

import { ReactNode, useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "@/app/components/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [activeLink, setActiveLink] = useState("users");
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isNavOpen={isNavOpen}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />
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
