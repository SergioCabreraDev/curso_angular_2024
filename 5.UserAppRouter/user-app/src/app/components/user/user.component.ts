import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']  // Corregir 'styleUrl' a 'styleUrls'
})
export class UserComponent implements OnInit {
  @Input() users: User[] = []; // Array de usuarios que puede ser pasado como entrada

  // Inyección de dependencias a través del constructor
  constructor(
    private router: Router, 
    private service: UserService,
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    // Verifica si hay estado pasado en la navegación actual y lo asigna a 'users'
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }
  }

  ngOnInit(): void {
   
    // Si 'users' está indefinido o vacío, obtiene los usuarios del servicio
    if (this.users === undefined || this.users.length === 0) {
      // Llama al servicio para obtener todos los usuarios y los asigna a 'users'
      this.service.findAll().subscribe(users => this.users = users);

      // Suscribirse a los parámetros de la ruta para obtener el valor de 'page'
      this.route.paramMap.subscribe(params => {
        // Obtener el valor del parámetro 'page' o usar '0' si no está presente
        const page = +(params.get('page') || '0');
        // Llamar al servicio para obtener los usuarios paginados
        this.service.findAllPageable(page).subscribe(pageable => this.users = pageable.content as User[]);
      });
    }
  }

  // Método para emitir el ID del usuario que se va a eliminar
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
        // Emite el ID del usuario a través del 'idUserEventEmitter' del SharingDataService
        this.sharingData.idUserEventEmitter.emit(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Aquí se puede manejar la cancelación si es necesario
      }
    });
  }

  // Método para navegar a la página de edición de usuario
  updateSelectedUser(user: User): void {
    // Navega a la ruta de edición del usuario con el ID del usuario seleccionado
    this.router.navigate(['/users/edit', user.id]);
  }

  get admin(){
    return this.auth.isAdmin();
  }
}
