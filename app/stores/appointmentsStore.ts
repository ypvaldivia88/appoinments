import { create } from "zustand";
import { IAppointment } from "@/models/Appointment";

interface AppointmentsState {
  appointments: IAppointment[];
  appointment: IAppointment | undefined;
  availableAppointments: { [key: string]: string[] };
  setAppointments: (appointments: IAppointment[]) => void;
  setAppointment: (appointment: IAppointment | undefined) => void;
  setAvailableAppointments: (availableAppointments: {
    [key: string]: string[];
  }) => void;
}

const useAppointmentsStore = create<AppointmentsState>((set) => ({
  appointments: [] as IAppointment[],
  appointment: undefined as IAppointment | undefined,
  availableAppointments: {} as { [key: string]: string[] },
  setAppointments: (appointments: IAppointment[]) => set({ appointments }),
  setAppointment: (appointment: IAppointment | undefined) =>
    set({ appointment }),
  setAvailableAppointments: (availableAppointments: {
    [key: string]: string[];
  }) => set({ availableAppointments }),
}));

export default useAppointmentsStore;
