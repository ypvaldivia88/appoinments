import { useEffect } from "react";
import { useServiceStore } from "@/stores/useServiceStore";

const useServices = () => {
  const {
    services,
    service,
    setServices,
    setService,
    addService,
    updateService,
    removeService,
  } = useServiceStore();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const createService = async () => {
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });
      const data = await response.json();
      addService(data);
      setService(null);
      await fetchServices();
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const updateServiceById = async () => {
    try {
      if (!service?._id) return;
      const id = service._id.toString();
      const response = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });
      const data = await response.json();
      updateService(id, data);
      await fetchServices();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const deleteServiceById = async (id: string) => {
    try {
      await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      removeService(id);
      await fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return {
    services,
    service,
    setService,
    createService,
    updateService: updateServiceById,
    deleteService: deleteServiceById,
  };
};

export default useServices;
