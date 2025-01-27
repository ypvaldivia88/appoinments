"use client";
import { useRouter } from "next/navigation";
import SessionStore from "@/stores/SessionStore";

export default function useSession() {
  const router = useRouter();

  const {
    loading,
    setLoading,
    session,
    setSession,
    clearSession,
    sessionChecked,
    setSessionChecked,
  } = SessionStore();

  const handleLogin = async (phone: string, password: string) => {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    name: string,
    phone: string,
    password: string
  ) => {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
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
    loading,
    setLoading,
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
