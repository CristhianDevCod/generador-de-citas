import { editando, citaObj, citas } from "./variables.js";
import { Notificacion } from "./clases/Notificacion.js";
import { formulario, formularioInput, mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput } from "./app.js";

export function validarCampo (e) {
    // Comprueba si el campo esta vacío
    if(e.target.value.trim() == ""){
        // Navega al nombre del campo
        const nombreCampo = e.target.parentElement.previousElementSibling.textContent
        const error = new Notificacion({
            mensaje : `El campo ${nombreCampo} se encuentra vacío por favor complétalo`,
            tipo : "error"
        })
        error.mostrar()
        return;
    }

    // Validar fecha
    if(e.target.id == 'fecha'){
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = formatearDia(fechaActual.getMonth() + 1);
        let dia = formatearDia(fechaActual.getDate());
        const fechaFormateada = `${año}-${mes}-${dia}`

        // Validar que la fecha escogida sea mayor que la actual, es decir citas apartir de mañana
        if(e.target.value > fechaFormateada){
            const error = new Notificacion({
                mensaje : "La fecha es correcta",
                tipo : "correcto"
            })
            error.mostrar()
        } else {
            dia = parseInt(dia)
            dia += 1;
            const error = new Notificacion({
                mensaje : `La cita debe apartarse desde mañana ${dia}`,
                tipo : "error"
            })
            error.mostrar()
            e.target.value = "" // restablece el campo a su valor por defecto
            return;
        }
    }

    // validar hora
    if(e.target.id == 'hora'){
        // franja horaria: 8:00 am - 12:00pm && 14:00pm - 16:00pm
        const hora = parseInt(e.target.value.substring(0,2));
        if ( (hora >= 8 && hora <= 12) || (hora >= 14 && hora <= 16) ){
            const error = new Notificacion({
                mensaje : "Se encuentra dentro de la franja horaria",
                tipo : "correcto"
            })
            error.mostrar()
        } else {
            const error = new Notificacion({
                mensaje : "fuera de franja horaria :(",
                tipo : "error"
            })
            error.mostrar()
            e.target.value = "" // restablece el campo a su valor por defecto
            return;
        }
    }

    // Llenar el objeto
    citaObj[e.target.id] = e.target.value;
}

// formateador de fecha
export function formatearDia(dia){
    return dia < 10 ? '0' + dia : dia;
}

// función de reiniciar el objeto
export function reiniciarObj(){

    // 1) reiniciar objeto
    Object.assign( citaObj, {
        id: generarId(),
        mascota : "", 
        propietario : "",
        telefono : "",
        fecha : "",
        hora : "",
        sintomas : ""
    })

    // 2) Forma de reiniciar el objeto
    // citaObj.id = generarId();
    // citaObj.mascota = "";
    // citaObj.propietario = "";
    // citaObj.telefono = "";
    // citaObj.fecha = "";
    // citaObj.hora = "";
    // citaObj.sintomas = "";
}

// Validar los campos del formulario
export function submitCita(e){
    e.preventDefault()

    // 1) Forma de validar los campos de un formulario
    //const {mascota, propietario, telefono, fecha, hora, sintomas } = citaObj
    // if( mascota == '' || propietario == '' || telefono == '' || fecha == '' || hora == '' || sintomas == ''){
    //     console.log('Todos los campos son obligatorios');
    //     return;
    // }

    // Pruebas de codigo
    // console.log(formulario.childNodes[1])

    // 2) forma de validar los campos de un formulario
    if( Object.values(citaObj).includes('')){
        const error = new Notificacion({
            mensaje : "Debes completar todos los campos",
            tipo : "error"
        })
        error.mostrar()
        return;
    }

    if(editando.value){
        citas.editar({...citaObj})
        // mostrar al usuario que se agrego correctamente la cita
        const error = new Notificacion({
            mensaje : "Paciente Editado",
            tipo : "correcto"
        })
        error.mostrar()
    } else {
        // se utiliza una copia para prevenir que la nueva cita reescriba la anterior
        citas.agregar({...citaObj});
        // mostrar al usuario que se agrego correctamente la cita
        const error = new Notificacion({
            mensaje : "Paciente Registrado",
            tipo : "correcto"
        })
        error.mostrar()
    }

    formulario.reset();
    reiniciarObj();
    formularioInput.textContent = "Crear Cita"
    formularioInput.style.backgroundColor = '#28B62C';
    editando.value = false;
}

// funcion para activar la edicion de la cita
export function cargarEdicion(cita){
    Object.assign(citaObj, cita);

    mascotaInput.value = cita.mascota;
    propietarioInput.value = cita.propietario;
    telefonoInput.value = cita.telefono;
    fechaInput.value = cita.fecha;
    horaInput.value = cita.hora;
    sintomasInput.value = cita.sintomas;

    editando.value = true;

    formularioInput.textContent = "Editar Cita"
    formularioInput.style.backgroundColor = '#FF851B';
}

// Generador de ID's
export function generarId(){
    return Math.random().toString(36).substring(2) + Date.now();
}