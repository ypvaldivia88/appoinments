import React from "react";

interface DaysOfWeekSelectorProps {
  daysOfWeek: string[];
  onDaysOfWeekChange: (day: string) => void;
}

const DaysOfWeekSelector: React.FC<DaysOfWeekSelectorProps> = ({
  daysOfWeek,
  onDaysOfWeekChange,
}) => {
  return (
    <div className="flex flex-col">
      <label>Días de la Semana</label>
      <div className="flex gap-2">
        {["0", "1", "2", "3", "4", "5", "6"].map((day) => (
          <button
            key={day}
            type="button"
            className={`py-2 px-4 rounded-full ${
              daysOfWeek.includes(day)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-slate-700"
            }`}
            onClick={() => onDaysOfWeekChange(day)}
          >
            {["D", "L", "M", "M", "J", "V", "S"][parseInt(day)]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaysOfWeekSelector;
