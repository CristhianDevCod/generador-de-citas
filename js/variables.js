import { AdminCitas } from "./clases/AdminCitas.js";
import { generarId } from "./funciones.js";

export let editando = {
    value: false
};
// objeto cita
export const citaObj = {
    id: generarId(),
    mascota : "",
    propietario : "",
    telefono : "",
    fecha : "",
    hora : "",
    sintomas : ""
}

// submitCita
export const citas = new AdminCitas()
