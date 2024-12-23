import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useSessionStore from "@/stores/useSessionStore";

export default function useSession() {
  const router = useRouter();
  const path = usePathname();
  const session = useSessionStore((state) => state.session);
  const clearSession = useSessionStore((state) => state.clearSession);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (!sessionChecked) {
      setSessionChecked(true);
      return;
    }

    if (!session) {
      setIsAdmin(false);
      setIsAuthed(false);
    } else {
      setIsAdmin(session?.isAdmin || false);
      setIsAuthed(!!session);
    }
  }, [session, sessionChecked, router, path]);

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
      setIsAdmin(false);
      setIsAuthed(false);
      setTimeout(() => {
        router.push("/login");
      }, 1000); // wait for 1 second before redirecting
    }
  };

  return { session, isAdmin, isAuthed, sessionChecked, handleLogout };
}
