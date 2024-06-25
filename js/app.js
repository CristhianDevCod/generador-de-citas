import { validarCampo, submitCita } from "./funciones.js";

// Referencias ----------------------------------------------------------------------------------
export const mascotaInput = document.querySelector('#mascota');
export const propietarioInput = document.querySelector('#propietario');
export const telefonoInput = document.querySelector('#telefono');
export const fechaInput = document.querySelector('#fecha');
export const horaInput = document.querySelector('#hora');
export const sintomasInput = document.querySelector('#sintomas');

export const formulario = document.querySelector('#nueva-cita');
export const contenedorCitas = document.querySelector('.lista-citas')
export const formularioInput = document.querySelector('#nueva-cita button')



// Eventos
mascotaInput.addEventListener('blur', validarCampo);
propietarioInput.addEventListener('blur', validarCampo);
telefonoInput.addEventListener('blur', validarCampo);
fechaInput.addEventListener('blur', validarCampo);
horaInput.addEventListener('blur', validarCampo);
sintomasInput.addEventListener('blur', validarCampo);

formulario.addEventListener('submit', submitCita);

