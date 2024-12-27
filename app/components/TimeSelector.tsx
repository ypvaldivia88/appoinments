import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import FormField from "@/components/FormField";

interface TimeSelectorProps {
  times: string[];
  onTimesChange: (newTimes: string[]) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  times,
  onTimesChange,
}) => {
  const handleAddTime = () => {
    const lastTime = times[times.length - 1];
    const [hours, minutes] = lastTime.split(":").map(Number);
    const newHours = (hours + 2) % 24;
    const newTime = `${newHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    onTimesChange([...times, newTime]);
  };

  const handleTimeChange = (index: number, newTime: string) => {
    const newTimes = [...times];
    newTimes[index] = newTime;
    onTimesChange(newTimes);
  };

  const handleRemoveTime = (index: number) => {
    onTimesChange(times.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col my-4 gap-2 max-h-72 overflow-auto">
      <label>Horarios</label>
      {times.map((time, index) => (
        <div key={index} className="flex gap-2 items-center justify-start">
          <FormField
            label={`Hora ${index + 1}`}
            type="time"
            value={time}
            onChange={(e) => handleTimeChange(index, e.target.value)}
          />
          <div className="flex gap-2 mt-2.5">
            <button
              type="button"
              onClick={() => handleRemoveTime(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              <FaTrash />
            </button>
            {index === times.length - 1 && (
              <button
                type="button"
                onClick={handleAddTime}
                className="bg-blue-500 text-white p-2 rounded"
              >
                <FaPlus />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeSelector;
