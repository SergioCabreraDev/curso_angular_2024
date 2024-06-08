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

  title: string = 'Listado Usuarios';

  users: User[] = [];

  userSelected: User;


  constructor(private service: UserService) {

    this.userSelected = new User();

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

  addUser(user: User) {
    console.log(user.id)
    if (user.id > 0) {
      this.users = this.users.map(u => (u.id == user.id)? {... user}: u)
    } else {
      this.users = [... this.users, { ...user }];
    }
    this.userSelected= new User(); //reiniciamos userSelected
  }

  removeUser(id: Number) {
    this.users = this.users.filter(user => user.id != id)
  }


  updateUser(user: User) {
    this.userSelected = { ...user };
   
  }

}
