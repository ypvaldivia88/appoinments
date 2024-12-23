"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { session, sessionChecked } = useSession();

  const [activeLink, setActiveLink] = useState("users");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionChecked) return;

    if (!session) {
      router.push("/login");
    }
  }, [session, sessionChecked]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsNavOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div className="flex min-h-screen">
      <div ref={sidebarRef} className="bg-gradient-secondary">
        <Sidebar
          isNavOpen={isNavOpen}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
      </div>
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
