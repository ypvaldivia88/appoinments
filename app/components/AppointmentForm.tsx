import React, { useState } from "react";
import GenericForm from "@/app/components/GenericForm";
import FormField from "@/app/components/FormField";

interface AppointmentFormProps {
  onSubmit: (appointment: {
    date: string;
    description: string;
    userId: string | null;
  }) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, description, userId });
    setDate("");
  };

  return (
    <GenericForm
      onSubmit={handleSubmit}
      title="Schedule Appointment"
      onClose={() => {}}
    >
      <FormField
        label="Date"
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <FormField
        label="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <FormField
        label="User ID"
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required={false}
      />
      <button type="submit">Schedule Appointment</button>
    </GenericForm>
  );
};

export default AppointmentForm;
