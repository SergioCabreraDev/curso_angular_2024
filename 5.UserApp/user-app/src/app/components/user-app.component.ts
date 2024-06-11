import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { FormUserComponent } from './form-user/form-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [CommonModule, UserComponent, FormUserComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {
closeModal() {
throw new Error('Method not implemented.');
}

  title: string = 'Listado Usuarios';

  users: User[] = [];

  userSelected: User;

  open: boolean = false;

  constructor(private service: UserService) {

    this.userSelected = new User();

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

  addUser(user: User) {
    // Imprime el ID del usuario en la consola para propósitos de depuración
    console.log(user.id);
  
    // Verifica si el ID del usuario es mayor que 0
    if (user.id > 0) {
      // Si el ID del usuario es mayor que 0, se asume que es un usuario existente.
      // Se actualiza la lista de usuarios reemplazando el usuario con el mismo ID
      // con los nuevos datos del usuario.
      this.users = this.users.map(u => (u.id == user.id) ? { ...user } : u);
    } else {
      // Si el ID del usuario no es mayor que 0, se asume que es un nuevo usuario.
      // Se agrega el nuevo usuario a la lista de usuarios.
      this.users = [...this.users, { ...user }];
    }
  
    // Muestra una alerta de éxito utilizando SweetAlert2
    Swal.fire({
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  
    // Llama a una función para cerrar un modal o limpiar un formulario
    this.setOpen();
  
    // Reinicializa userSelected para preparar la entrada de un nuevo usuario
    // o la actualización de otro usuario
    this.userSelected = new User(); // reiniciamos userSelected
  }
  

  removeUser(id: Number) {
    this.users = this.users.filter(user => user.id != id)
  }


  updateUser(user: User) {
    this.setOpen();
    this.userSelected = { ...user };
   
  }

  setOpen(){
    this.open = !this.open;
  }

  

}
