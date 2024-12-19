import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useGlobalStore from "@/app/store/useGlobalStore";

export default function useSession() {
  const router = useRouter();
  const session = useGlobalStore((state) => state.session);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!sessionChecked) {
      setSessionChecked(true);
      return;
    }

    if (!session) {
      router.push("/login");
    } else {
      setIsAdmin(session.isAdmin);
    }
  }, [session, sessionChecked, router]);

  return { session, isAdmin, sessionChecked };
}
