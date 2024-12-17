import { create } from "zustand";
import { IUser } from "@/app/models/User";
import Cookies from "js-cookie";

interface GlobalState {
  session: IUser | null;
  setSession: (session: GlobalState["session"]) => void;
  clearSession: () => void;
  loadSessionFromCookies: () => void;
}

const useGlobalStore = create<GlobalState>(
  (set): GlobalState => ({
    session: null,
    setSession: (session) => set({ session }),
    clearSession: () => {
      Cookies.remove("session");
      set({ session: null });
    },
    loadSessionFromCookies: () => {
      const sessionCookie = Cookies.get("session");
      if (sessionCookie) {
        set({ session: JSON.parse(sessionCookie) });
      }
    },
  })
);

export default useGlobalStore;
