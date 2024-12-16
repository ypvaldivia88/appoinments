"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainNavigation() {
  const router = useRouter();
  const { push } = router;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch("/api/session");
      const data = await response.json();
      if (!data.error) setIsAdmin(data.isAdmin);
    };
    fetchSession();
  }, []);

  const handleLogout = () => {
    // Clear session cookie
    document.cookie = "session=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    // Redirect to login page
    push("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-pink-500 dark:text-pink-300 mb-4 md:mb-0"
        >
          Oh&apos;Diosa Nails
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/book"
            className="text-lg text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-300 transition-colors"
          >
            Reserva
          </Link>
          {isAdmin && (
            <>
              <Link
                href="/admin"
                className="text-lg text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-300 transition-colors"
              >
                Admin
              </Link>
              <Link
                href="/admin/users"
                className="text-lg text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-300 transition-colors"
              >
                Usuarios
              </Link>
            </>
          )}
          <button
            onClick={handleLogout}
            className="text-lg text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
