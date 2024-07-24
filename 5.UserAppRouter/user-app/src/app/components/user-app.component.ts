import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { ChangeDetectorRef } from '@angular/core';
import { error } from 'node:console';
import { AuthService } from '../services/auth.service';
import { response } from 'express';

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
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los parámetros de la ruta para obtener el valor de 'page'
    this.route.paramMap.subscribe(params => {
      // Obtener el valor del parámetro 'page' o usar '0' si no está presente
      const page = +(params.get('page') || '0');
      // Llamar al servicio para obtener los usuarios paginados
      this.service.findAllPageable(page).subscribe(pageable => this.users = pageable.content as User[]);
    });

    // Suscribirse a los eventos del SharingDataService
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.handlerLogin();
  }

  handlerLogin(){
    this.sharingData.handlerLoginEventEmitter.subscribe(({username, password}) =>{ console.log(username+ " "+password);
    this.authService.loginUser({username, password}).subscribe({
      next: response => {

            const token = response.token;
            // console.log(token);
            const payload = this.authService.getPayload(token);

            const user = {username: payload.sub};
               // console.log(payload);
            const login = {
              user,
              isAuth: true,
              isAdmin: payload.isAdmin
            }

            this.authService.token = token;
            this.authService.user = login;

            this.router.navigate(['/users/page/0']);
         
      },
      error: error =>{
        if(error.status == 401){
          Swal.fire('Error en el login', error.error.message, 'error');
        }else{
          throw error;
        }

      }
    })
  });
  
  }

  // Método para encontrar un usuario por ID
  findUserById() {
    // Suscribirse al evento 'findUserByIdEmitter' del SharingDataService
    this.sharingData.findUserByIdEmitter.subscribe(id => {
      // Encontrar el usuario en el array 'users' por su ID
      const user = this.users.find(user => user.id == id);
      // Emitir el usuario encontrado a través del 'selectUserEmitter'
      this.sharingData.selectUserEmitter.emit(user);
    });
  }

  // Método para agregar o actualizar un usuario
  addUser() {
    // Suscribirse al evento 'newUserEventEmitter' del SharingDataService
    this.sharingData.newUserEventEmitter.subscribe(user => {
      console.log(user.id);

      // Verificar si el ID del usuario es mayor que 0 (usuario existente)
      if (user.id > 0) {
        // Llamar al servicio para actualizar el usuario
        this.service.update(user).subscribe({
          next: (userUpdate) => {
            // Actualizar el usuario en el array 'users' reemplazando el usuario existente con los nuevos datos
            this.users = this.users.map(u => (u.id == userUpdate.id) ? { ...userUpdate } : u);
                    // Forzar la detección de cambios en Angular
        this.cd.detectChanges();
          }, 
          error: (err) => { console.log(err.error) }
        });


        // Navegar a la ruta '/users' pasando los usuarios actualizados en el estado
        this.router.navigate(['/users']);
      } else {
        // Llamar al servicio para crear un nuevo usuario
        this.service.create(user).subscribe({
          next: userNew => {
            // Agregar el nuevo usuario al array 'users'
            this.users = [...this.users, { ...userNew }];
                // Forzar la detección de cambios en Angular
                this.cd.detectChanges();
          },
          error: (err) => { console.log(err.error) }
        });
            

        // Navegar de vuelta a la ruta '/users'
        this.router.navigate(['/users']);

        
      }

      // Mostrar una alerta de éxito usando SweetAlert2
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
    // Suscribirse al evento 'idUserEventEmitter' del SharingDataService
    this.sharingData.idUserEventEmitter.subscribe(id => {
      // Llamar al servicio para eliminar el usuario
      this.service.remove(id).subscribe(() => {
        // Filtrar el array 'users' eliminando el usuario con el ID especificado
        this.users = this.users.filter(user => user.id != id);
      });

      // Filtrar el array 'users' eliminando el usuario con el ID especificado (precaución: esto se hace dos veces)
      this.users = this.users.filter(user => user.id != id);

      // Navegar a una ruta temporal '/users/create' para forzar la recarga de la lista de usuarios
      this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
        // Luego navegar de vuelta a la ruta '/users'
        this.router.navigate(['/users']);
      });
    });
  }
}
