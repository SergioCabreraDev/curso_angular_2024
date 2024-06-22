import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']  
})
export class FormUserComponent implements OnInit {

  user: User; // Objeto para almacenar el usuario en el formulario

  // Inyección de dependencias a través del constructor
  constructor(
    private service: UserService,
    private sharingData: SharingDataService, 
    private route: ActivatedRoute
  ) {
    this.user = new User(); // Inicializa un nuevo usuario
  }

  ngOnInit(): void {
    // Suscribirse a los parámetros de la ruta para obtener el valor de 'id'
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      // Si el ID es mayor que 0, llama al servicio para obtener el usuario por ID
      if (id > 0) {
        this.service.findById(id).subscribe(user => this.user = user);
      }
    });
  }

  // Método que se llama al enviar el formulario
  onSubmit(itemForm: NgForm): void {
    if (itemForm.valid) {
      // Emite el usuario a través del 'newUserEventEmitter' del SharingDataService
      this.sharingData.newUserEventEmitter.emit(this.user);
      console.log(this.user);

      // Resetea el formulario
      itemForm.reset();
      itemForm.resetForm();
    }
  }

  // Método para limpiar el formulario
  onClear(itemForm: NgForm): void {
    itemForm.reset();
    itemForm.resetForm();
  }
}
