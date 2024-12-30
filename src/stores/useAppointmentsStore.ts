import { create } from "zustand";
import { IAppointment } from "@/models/Appointment";

interface AppointmentsState {
  appointments: IAppointment[];
  appointment: IAppointment | undefined;
  availableAppointments: IAppointment[];
  userActiveAppointment: IAppointment | undefined;
  setAppointments: (appointments: IAppointment[]) => void;
  setAppointment: (appointment: IAppointment | undefined) => void;
  setAvailableAppointments: (availableAppointments: IAppointment[]) => void;
  setUserActiveAppointment: (
    userActiveAppointment: IAppointment | undefined
  ) => void;
}

const useAppointmentsStore = create<AppointmentsState>((set) => ({
  appointments: [] as IAppointment[],
  appointment: undefined as IAppointment | undefined,
  availableAppointments: [] as IAppointment[],
  userActiveAppointment: undefined as IAppointment | undefined,
  setAppointments: (appointments: IAppointment[]) => set({ appointments }),
  setAppointment: (appointment: IAppointment | undefined) =>
    set({ appointment }),
  setAvailableAppointments: (availableAppointments: IAppointment[]) =>
    set({ availableAppointments }),
  setUserActiveAppointment: (userActiveAppointment: IAppointment | undefined) =>
    set({ userActiveAppointment }),
}));

export default useAppointmentsStore;
