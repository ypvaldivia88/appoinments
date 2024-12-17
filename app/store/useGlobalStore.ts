import { create } from "zustand";
import { IUser } from "@/app/models/User";
import Cookies from "js-cookie";

interface GlobalState {
  session: IUser | null;
  setSession: (session: IUser) => void;
  clearSession: () => void;
  loadSessionFromCookies: () => void;
}

const useGlobalStore = create<GlobalState>((set): GlobalState => {
  const initialState: GlobalState = {
    session: null,
    setSession: (session: IUser) => {
      Cookies.set("userId", session._id.toString());
      set({ session });
    },
    clearSession: () => {
      Cookies.remove("userId");
      set({ session: null });
    },
    loadSessionFromCookies: async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) {
          return;
        }
        const response = await fetch(`/api/session?userId=${userId}`, {
          method: "GET",
        });
        if (response.ok) {
          const userData: IUser = await response.json();
          set({ session: userData });
        }
      } catch (error) {
        console.error("Error loading session from API", error);
      }
    },
  };

  // Attempt to load session from cookies initially
  initialState.loadSessionFromCookies();

  return initialState;
});

export default useGlobalStore;
