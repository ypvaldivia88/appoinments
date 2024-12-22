import { create } from "zustand";
import { IService } from "@/models/Service";

interface ServiceState {
  services: IService[];
  service: IService | null;
  setServices: (services: IService[]) => void;
  setService: (service: IService | null) => void;
  addService: (service: IService) => void;
  updateService: (id: string, updatedService: IService) => void;
  removeService: (id: string) => void;
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  service: null,
  setServices: (services) => set({ services }),
  setService: (service) => set({ service }),
  addService: (service) =>
    set((state) => ({ services: [...state.services, service] })),
  updateService: (id, updatedService) =>
    set((state) => ({
      services: state.services.map((service) =>
        service._id.toString() === id ? updatedService : service
      ),
    })),
  removeService: (id) =>
    set((state) => ({
      services: state.services.filter(
        (service) => service._id.toString() !== id
      ),
    })),
}));
