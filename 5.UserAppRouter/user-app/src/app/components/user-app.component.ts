import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import Swal from 'sweetalert2';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterModule],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {
closeModal() {
throw new Error('Method not implemented.');
}

  users: User[] = [];



  constructor(private service: UserService, private sharingData: SharingDataService, private router: Router) {
    
  
  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById(){
    this.sharingData.findUserByIdEmitter.subscribe(id => {
      const user= this.users.find(user => user.id == id);
      this.sharingData.selectUserEmitter.emit(user);
    })
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {

      console.log(user.id);
  
      // Verifica si el ID del usuario es mayor que 0
      if (user.id > 0) {
        // Si el ID del usuario es mayor que 0, se asume que es un usuario existente.
        // Se actualiza la lista de usuarios reemplazando el usuario con el mismo ID
        // con los nuevos datos del usuario.
        this.users = this.users.map(u => (u.id == user.id) ? { ...user } : u);
        this.router.navigate(['/users'], {state: {users: this.users}});
      } else {
        // Si el ID del usuario no es mayor que 0, se asume que es un nuevo usuario.
        // Se agrega el nuevo usuario a la lista de usuarios.
        this.users = [...this.users, { ...user }];
        this.router.navigate(['/users'], {state: {users: this.users}});
      }
    
      // Muestra una alerta de éxito utilizando SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    })

    // Reinicializa userSelected para preparar la entrada de un nuevo usuario
    // o la actualización de otro usuario
   
  }
  

  removeUser() {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      this.users = this.users.filter(user => user.id != id);
      this.router.navigate(['/users/create'], {skipLocationChange: true}).then(()=>{
        this.router.navigate(['/users'], {state: {users: this.users}})
      })
    })

  }




  

}
