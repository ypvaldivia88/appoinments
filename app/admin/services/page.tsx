"use client";
import React from "react";
import { IService } from "@/app/models/Service";
import useServices from "@/app/hooks/useServices";

const ServicesPage: React.FC = () => {
  const {
    services,
    newService,
    setNewService,
    createService,
    updateService,
    deleteService,
  } = useServices();

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
