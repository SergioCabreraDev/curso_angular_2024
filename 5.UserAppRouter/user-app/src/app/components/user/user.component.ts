import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';


@Component({
  selector: 'user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']  // Corregir 'styleUrl' a 'styleUrls'
})
export class UserComponent implements OnInit{
  @Input() users: User[] = [];



  constructor(
    private router: Router, 
    private service: UserService,
    private sharingData: SharingDataService){
      if (this.router.getCurrentNavigation()?.extras.state){
        this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      }
    }


  ngOnInit(): void {
    if(this.users== undefined || this.users.length == 0){
      this.service.findAll().subscribe(users => this.users= users);
    }
  }


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

        this.sharingData.idUserEventEmitter.emit(id);
    

      } else if (result.dismiss === Swal.DismissReason.cancel) {


      }
    });
  }

  updateSelectedUser(user: User): void{

    this.router.navigate(['/users/edit', user.id]);

  }



}
