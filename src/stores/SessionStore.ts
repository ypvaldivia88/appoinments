import { create } from "zustand";
import { IUser } from "@/models/User";

interface GlobalState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  session: IUser | null;
  setSession: (session: IUser) => void;
  sessionChecked: boolean;
  setSessionChecked: (sessionChecked: boolean) => void;
  clearSession: () => void;
  loadSessionFromServer: () => void;
}

const SessionStore = create<GlobalState>((set, get): GlobalState => {
  const initialState: GlobalState = {
    loading: false,
    setLoading: (loading: boolean) => {
      set({ loading });
    },
    session: null,
    setSession: (session: IUser) => {
      // No longer setting client-side cookies - JWT is httpOnly
      set({ session });
    },
    clearSession: () => {
      // Clear session data but don't remove cookies (handled by logout API)
      set({ session: null });
    },
    sessionChecked: false,
    setSessionChecked: (sessionChecked: boolean) => {
      set({ sessionChecked });
    },
    loadSessionFromServer: async () => {
      const currentSession = get().session;
      
      // If we already have session data and haven't checked yet, use it
      if (currentSession && !get().sessionChecked) {
        set({ sessionChecked: true });
        return;
      }

      try {
        set({ loading: true });
        
        // Try to get session from server using httpOnly cookie
        const response = await fetch("/api/session/me", {
          method: "GET",
          credentials: "include", // Include httpOnly cookies
        });

        if (response.ok) {
          const userData: IUser = await response.json();
          set({
            session: userData,
          });
        } else if (response.status === 401) {
          // No valid session, clear any existing session data
          set({ session: null });
        }
      } catch (error) {
        console.error("Error loading session from server", error);
        set({ session: null });
      } finally {
        set({ sessionChecked: true, loading: false });
      }
    },
  };

  return initialState;
});

export default SessionStore;
