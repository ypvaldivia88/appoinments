import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { IUser } from "@/models/User";

const useUsers = () => {
  const { users, user, setUsers, setUser, addUser, updateUser, removeUser } =
    useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      addUser(data);
      setUser(null);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUserById = async (id: string, updatedUser: IUser) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      updateUser(id, data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUserById = async (id: string) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      removeUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return {
    users,
    user,
    setUser,
    createUser,
    updateUser: updateUserById,
    deleteUser: deleteUserById,
  };
};

export default useUsers;
