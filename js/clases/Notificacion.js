import { formulario } from "../app.js";


export class Notificacion {
    constructor({mensaje, tipo}){
        this.mensaje = mensaje
        this.tipo = tipo
        // this.mostrar // manda a llamar el método automaticamente
    }

    mostrar(){
        // Eliminar alertas duplicadas
        const alertaPrevia = document.querySelector('.alerta');
        
        //! validar si un elemento existe
        //* 1) primera forma
        // if(alertaPrevia){
        //     alertaPrevia.remove()
        // }
        //* 2) forma
        alertaPrevia?.remove()

        // Mostrar la notificación 
        const alerta = document.createElement('div');
        alerta.classList.add('alerta');

        // validación del tipo 
        this.tipo === 'error' ? alerta.classList.add('error') : alerta.classList.add('correcto');

        // Agregar el mensaje de error
        alerta.textContent = this.mensaje

        // Insertar en el DOM 
        formulario.firstElementChild.appendChild(alerta)
        
        // quitar despues de 5 segundos 
        setTimeout( () =>{
            alerta.remove()
        }, 5000)
    }
}