import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {
 title: string= 'Listado Usuarios';

 users: User[] = [];


 constructor(private service: UserService){

 }
  ngOnInit(): void {
  //  this.service.findAll().subscribe(users => this.users = users);
  }

}
