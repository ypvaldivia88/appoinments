import { useState, useEffect } from "react";
import { IService } from "@/models/Service";

const useServices = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [service, setService] = useState<IService | null>(null);

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
      setServices([...services, data]);
      setService(null);
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const updateService = async (id: string, updatedService: IService) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      });
      const data = await response.json();
      setServices(
        services.map((service) =>
          service._id.toString() === id ? data : service
        )
      );
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      setServices(services.filter((service) => service._id.toString() !== id));
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
