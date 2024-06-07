import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { FormUserComponent } from './form-user/form-user.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [CommonModule, UserComponent, FormUserComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {

 title: string= 'Listado Usuarios';

 users: User[] = [];


 constructor(private service: UserService){

 }
  ngOnInit(): void {
   this.service.findAll().subscribe(users => this.users = users);
  }

  addUser(user: User){
    this.users = [... this.users, {... user}];
  }

  removeUser(id: Number) {
   this.users = this.users.filter(user => user.id != id)
    }
}
