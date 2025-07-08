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
    loadSessionFromServer,
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
        credentials: "include", // Include httpOnly cookies
      });

      if (response.ok) {
        const userData = await response.json();
        setSession(userData);
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message || "Login failed" };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, error: "Network error" };
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
        credentials: "include", // Include httpOnly cookies
      });

      if (response.ok) {
        const userData = await response.json();
        setSession(userData);
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error || "Registration failed" };
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return { success: false, error: "Network error" };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const endpoint = "/api/logout";
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include httpOnly cookies
      });

      if (response.ok) {
        clearSession();
        setTimeout(() => {
          router.push("/login");
        }, 1000); // wait for 1 second before redirecting
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Still clear session on client side even if server request fails
      clearSession();
      router.push("/login");
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
    loadSessionFromServer,
  };
}
