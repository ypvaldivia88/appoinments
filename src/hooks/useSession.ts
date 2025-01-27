"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SessionStore from "@/stores/SessionStore";

export default function useSession() {
  const router = useRouter();
  const path = usePathname();

  const {
    session,
    setSession,
    clearSession,
    sessionChecked,
    setSessionChecked,
    loadSessionFromCookies,
  } = SessionStore();

  useEffect(() => {
    if (!sessionChecked) {
      loadSessionFromCookies();
      setSessionChecked(true);
    }
  }, [session, sessionChecked, router, path]);

  const handleLogin = async (phone: string, password: string) => {
    const endpoint = "/api/login";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      setSession(userData);
    }
  };

  const handleRegister = async (
    name: string,
    phone: string,
    password: string
  ) => {
    const endpoint = "/api/register";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      setSession(userData);
    }
  };

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
      setTimeout(() => {
        router.push("/login");
      }, 1000); // wait for 1 second before redirecting
    }
  };

  return {
    session,
    setSession,
    clearSession,
    sessionChecked,
    setSessionChecked,
    handleLogin,
    handleLogout,
    handleRegister,
  };
}
