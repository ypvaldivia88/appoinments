import { useState } from "react";
import { IUser } from "@/models/User";
import useValidation from "@/hooks/useValidation";

export default function useUserForm(
  user: IUser | null,
  onSave: (user: IUser) => void
) {
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState(user?.password || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const [error, setError] = useState("");
  const { validateUser } = useValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateUser(name, phone, password, !!user, confirmPassword);
    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }
    const options = {
      method: user ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, password, isAdmin }),
    };
    const response = await fetch(
      "/api/users" + (user ? `/${user._id}` : ""),
      options
    );
    const savedUser = await response.json();
    onSave(savedUser);
  };

  return {
    name,
    setName,
    phone,
    setPhone,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isAdmin,
    setIsAdmin,
    error,
    handleSubmit,
  };
}
