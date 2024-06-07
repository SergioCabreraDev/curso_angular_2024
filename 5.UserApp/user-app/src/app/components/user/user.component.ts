import { Component, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']  // Corregir 'styleUrl' a 'styleUrls'
})
export class UserComponent {
  @Input() users: User[] = [];

  @Output() idUserEventEmitter = new EventEmitter();
  // emitUserId(id: number){
  //   this.showConfirmAlert();
  //   const confirmRemove = confirm('Desea Eliminar El Usuario?');
  //   if(!confirmRemove){return;}
    
  //   this.showAlert();
  // }


  emitUserId(id: number) {
    Swal.fire({
      title: '¿Quieres borrar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          '¡Hecho!',
          'Usuario Borrado.',
          'success'
        );

        this.idUserEventEmitter.emit(id);

      } else if (result.dismiss === Swal.DismissReason.cancel) {


      }
    });
  }

}
