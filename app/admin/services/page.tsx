"use client";
import React, { useState, useEffect } from "react";
import { IService } from "@/app/models/Service";

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [newService, setNewService] = useState<IService | null>(null);

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
        body: JSON.stringify(newService),
      });
      const data = await response.json();
      setServices([...services, data]);
      setNewService(null);
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

  return (
    <div>
      <h1>Services</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newService?.name || ""}
          onChange={(e) =>
            setNewService({ ...newService, name: e.target.value } as IService)
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newService?.description || ""}
          onChange={(e) =>
            setNewService({
              ...newService,
              description: e.target.value,
            } as IService)
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newService?.price || 0}
          onChange={(e) =>
            setNewService({
              ...newService,
              price: parseFloat(e.target.value),
            } as IService)
          }
        />
        <input
          type="number"
          placeholder="Duration"
          value={newService?.duration || 0}
          onChange={(e) =>
            setNewService({
              ...newService,
              duration: parseInt(e.target.value),
            } as IService)
          }
        />
        <button onClick={createService}>Add Service</button>
      </div>
      <ul>
        {services.map((service) => (
          <li key={service._id.toString()}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <p>Duration: {service.duration} minutes</p>
            <button
              onClick={() => updateService(service._id.toString(), service)}
            >
              Update
            </button>
            <button onClick={() => deleteService(service._id.toString())}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesPage;
