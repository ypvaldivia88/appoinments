import { create } from "zustand";
import { IUser } from "@/app/models/User";

interface GlobalState {
  session: IUser | null;
  setSession: (session: GlobalState["session"]) => void;
  clearSession: () => void;
}

const useGlobalStore = create<GlobalState>(
  (set): GlobalState => ({
    session: null,
    setSession: (session) => set({ session }),
    clearSession: () => set({ session: null }),
  })
);

export default useGlobalStore;
