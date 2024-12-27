import useServices from "@/hooks/useServices";
import { IService } from "@/models/Service";

interface ServiceSelectorProps {
  selectedServices: IService[];
  setSelectedServices: (services: IService[]) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  selectedServices,
  setSelectedServices,
}) => {
  const { services } = useServices();

  const handleSelectService = (service: IService) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 mb-2">
      <h1>Servicios</h1>
      <div className="flex gap-4">
        {services.map((service) => (
          <div
            key={service._id.toString()}
            className="flex items-center mb-2 text-gray-700 bg-slate-300 px-4 py-2 max-w-fit rounded-md"
          >
            <input
              id={service._id.toString()}
              type="checkbox"
              checked={selectedServices.includes(service)}
              onChange={() => handleSelectService(service)}
              className="mr-2"
            />
            <label htmlFor={service._id.toString()} className="text-gray-700">
              {service.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;
