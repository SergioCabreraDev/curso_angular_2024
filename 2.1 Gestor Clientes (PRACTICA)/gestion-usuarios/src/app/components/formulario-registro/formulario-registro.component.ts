import { Component, EventEmitter, Output } from '@angular/core'; // Importa los módulos necesarios desde Angular
import { FormsModule, NgForm } from '@angular/forms'; // Importa los módulos necesarios para trabajar con formularios en Angular
import { Usuario } from '../../models/usuario'; // Importa el modelo de Usuario

@Component({
  selector: 'app-formulario-registro', // Selector del componente
  standalone: true, // Indica que el componente es independiente y no necesita ser agregado a otro componente para funcionar
  imports: [FormsModule], // Importa el módulo FormsModule necesario para trabajar con formularios en Angular
  templateUrl: './formulario-registro.component.html' // Ruta al archivo HTML que contiene la plantilla del componente
})
export class FormularioRegistroComponent { // Definición de la clase del componente

  @Output() addItemEventEmitter = new EventEmitter(); // Evento que se emite cuando se agrega un nuevo usuario

  private counterId = 4; // Contador para asignar IDs únicos a los usuarios

  usuario: any = { // Objeto que representa los datos del usuario ingresados en el formulario
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  }

  onSubmit(itemForm: NgForm): void { // Método que se llama cuando se envía el formulario
    if (itemForm.valid) { // Verifica si el formulario es válido
      this.addItemEventEmitter.emit({ id: this.counterId, ...this.usuario }); // Emite un evento con los datos del nuevo usuario
      this.counterId ++; // Incrementa el contador de IDs para el próximo usuario
      this.usuario = { // Reinicia los datos del usuario para el próximo ingreso
        nombre: '',
        apellido: '',
        email: '',
        telefono: ''
      };
      itemForm.reset(); // Reinicia el formulario para borrar los valores actuales y restablecer su estado de validación
    }
  }

}
