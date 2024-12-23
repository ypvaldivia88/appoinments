import { create } from "zustand";
import { IUser } from "@/models/User";

interface UserState {
  users: IUser[];
  user: IUser | null;
  setUsers: (users: IUser[]) => void;
  setUser: (user: IUser | null) => void;
  addUser: (user: IUser) => void;
  updateUser: (id: string, updatedUser: IUser) => void;
  removeUser: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  user: null,
  setUsers: (users) => set({ users }),
  setUser: (user) => set({ user }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user._id.toString() === id ? updatedUser : user
      ),
    })),
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user._id.toString() !== id),
    })),
}));
