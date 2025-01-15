import { useEffect } from "react";
import { UserStore } from "@/stores/UserStore";
import { IUser } from "@/models/User";

const useUsers = () => {
  const { users, user, setUsers, setUser } = UserStore();

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
      await response.json();
      setUser(null);
      await fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUser = async (id: string, updatedUser: IUser) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      await response.json();
      await fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return {
    users,
    user,
    setUser,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useUsers;
