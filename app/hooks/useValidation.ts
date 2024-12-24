import { IAppointment } from "@/models/Appointment";

export default function useValidation() {
  const validateUser = (
    name: string,
    phone: string,
    password: string,
    isEditMode: boolean,
    repeatedPassword?: string
  ) => {
    const errors: string[] = [];
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const phoneRegex = /^[0-9]{8}$/;

    if (!nameRegex.test(name)) {
      errors.push("El nombre contiene caracteres inválidos");
    }
    if (!phoneRegex.test(phone)) {
      errors.push(
        "El número de teléfono debe tener 8 cifras y solo contener números"
      );
    }
    if (!isEditMode && password.length < 4) {
      errors.push("La contraseña debe tener al menos 4 caracteres");
    }
    if (name.length < 3) {
      errors.push("El nombre debe tener al menos 3 caracteres");
    }
    if (repeatedPassword !== undefined && password !== repeatedPassword) {
      errors.push("Las contraseñas no coinciden");
    }
    return errors;
  };

  const validateAppointment = (formValues: Partial<IAppointment>) => {
    const errors: string[] = [];
    const { time, services, note } = formValues;

    if (!time) {
      errors.push("Seleccione una hora para la cita");
    }

    if (!services?.length) {
      errors.push("Seleccione al menos un servicio");
    }

    const noteRegex = /^.{0,255}$|^.{4,255}$/;

    if (note && !noteRegex.test(note)) {
      errors.push("La nota debe tener entre 4 y 255 caracteres");
    }

    return errors;
  };

  return { validateUser, validateAppointment };
}
