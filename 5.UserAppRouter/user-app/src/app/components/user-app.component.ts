import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import Swal from 'sweetalert2';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterModule],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {
  
  // Array para almacenar los usuarios
  users: User[] = [];

  // Inyectamos los servicios y el router en el constructor
  constructor(
    private service: UserService, 
    private sharingData: SharingDataService,
    private cdr: ChangeDetectorRef, 
    private router: Router) {}

 
  ngOnInit(): void {
    // Llama al servicio para obtener todos los usuarios y los almacena en el array 'users'
    this.service.findAll().subscribe(users => this.users = users);

    // Llama a los métodos que se suscriben a los eventos del SharingDataService
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  // Método para encontrar un usuario por ID
  findUserById() {
    // Se suscribe al evento 'findUserByIdEmitter' del SharingDataService
    this.sharingData.findUserByIdEmitter.subscribe(id => {
      // Encuentra el usuario en el array 'users' por su ID
      const user = this.users.find(user => user.id == id);
      // Emite el usuario encontrado a través del 'selectUserEmitter'
      this.sharingData.selectUserEmitter.emit(user);
    });
  }

  // Método para agregar o actualizar un usuario
  addUser() {
    // Se suscribe al evento 'newUserEventEmitter' del SharingDataService
    this.sharingData.newUserEventEmitter.subscribe(user => {
      console.log(user.id);

      // Verifica si el ID del usuario es mayor que 0 (usuario existente)
      if (user.id > 0) {
        this.service.update(user).subscribe(userUpdate => {
          // Actualiza el usuario en el array 'users' reemplazando el usuario existente con los nuevos datos
          this.users = this.users.map(u => (u.id == userUpdate.id) ? { ...userUpdate } : u);
        })       
        // Navega a la ruta '/users' pasando los usuarios actualizados en el estado
        this.router.navigate(['/users']);
      } else {
        this.service.create(user).subscribe(userNew => {
          // Si el ID no es mayor que 0, se asume que es un nuevo usuario y se agrega al array 'users'
          this.users = [...this.users, { ...userNew }];
        })
        // this.cdr.detectChanges();
        // Luego navega de vuelta a la ruta '/users' 
        this.router.navigate(['/users']);

      }

      // Muestra una alerta de éxito usando SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  // Método para eliminar un usuario
  removeUser() {
    // Se suscribe al evento 'idUserEventEmitter' del SharingDataService
    this.sharingData.idUserEventEmitter.subscribe(id => {
      
      this.service.remove(id).subscribe(() =>{
        this.users = this.users.filter(user => user.id != id);
      })
      // Filtra el array 'users' eliminando el usuario con el ID especificado
      this.users = this.users.filter(user => user.id != id);
      // Navega a una ruta temporal '/users/create' para forzar la recarga de la lista de usuarios
      this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
        // Luego navega de vuelta a la ruta '/users' pasando los usuarios actualizados en el estado
        this.router.navigate(['/users']);
      });
    });
  }
}
