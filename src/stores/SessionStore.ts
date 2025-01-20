import { create } from "zustand";
import { IUser } from "@/models/User";
import Cookies from "js-cookie";

interface GlobalState {
  session: IUser | null;
  setSession: (session: IUser) => void;
  sessionChecked: boolean;
  setSessionChecked: (sessionChecked: boolean) => void;
  clearSession: () => void;
  loadSessionFromCookies: () => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  isAuthed: boolean;
  setIsAuthed: (isAuthed: boolean) => void;
}

const SessionStore = create<GlobalState>((set): GlobalState => {
  const initialState: GlobalState = {
    session: null,
    setSession: (session: IUser) => {
      Cookies.set("userId", session._id.toString());
      set({ session });
    },
    clearSession: () => {
      Cookies.remove("userId");
      Cookies.remove("isAdmin");
      set({ session: null, isAdmin: false, isAuthed: false });
    },
    sessionChecked: false,
    setSessionChecked: (sessionChecked: boolean) => {
      set({ sessionChecked });
    },
    loadSessionFromCookies: async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) {
          return;
        }
        const response = await fetch(`/api/session/${userId}`, {
          method: "GET",
        });
        if (response.ok) {
          const userData: IUser = await response.json();
          set({
            session: userData,
            isAdmin: userData.isAdmin,
            isAuthed: true,
          });
        }
      } catch (error) {
        console.error("Error loading session from API", error);
      }
    },
    isAdmin: false,
    setIsAdmin: (isAdmin: boolean) => {
      set({ isAdmin });
    },
    isAuthed: false,
    setIsAuthed: (isAuthed: boolean) => {
      set({ isAuthed });
    },
  };

  // Attempt to load session from cookies initially
  initialState.loadSessionFromCookies();

  return initialState;
});

export default SessionStore;
