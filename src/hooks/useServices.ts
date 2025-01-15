import { useEffect } from "react";
import { ServiceStore } from "@/stores/ServiceStore";

const useServices = () => {
  const { services, service, setServices, setService } = ServiceStore();

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
      await response.json();
      setService(null);
      await fetchServices();
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const updateService = async () => {
    try {
      if (!service?._id) return;
      const id = service._id.toString();
      await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });
      await fetchServices();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
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
    updateService,
    deleteService,
  };
};

export default useServices;
