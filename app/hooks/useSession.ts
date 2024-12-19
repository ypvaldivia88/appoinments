import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useGlobalStore from "@/app/store/useGlobalStore";

export default function useSession() {
  const router = useRouter();
  const session = useGlobalStore((state) => state.session);
  const clearSession = useGlobalStore((state) => state.clearSession);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (!sessionChecked) {
      setSessionChecked(true);
      return;
    }

    if (!session) {
      router.push("/login");
    } else {
      setIsAdmin(session.isAdmin);
      setIsAuthed(true);
    }
  }, [session, sessionChecked, router]);

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
