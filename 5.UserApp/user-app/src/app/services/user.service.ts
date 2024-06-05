import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id:1,
    name: 'andres',
    lastname: 'guzman',
    email: 'andres@gmail.com',
    username: 'andres11',
    password: '1234'
  },
  {
    id:2,
    name: 'lucas',
    lastname: 'mendo',
    email: 'lucas@gmail.com',
    username: 'lucas3224',
    password: '123'
  },
  {
    id:3,
    name: 'sergio',
    lastname: 'cabra',
    email: 'sergio@gmail.com',
    username: 'sergio322',
    password: '123'
  }
];
  constructor() { }

  findAll(): Observable<User[]>{
    return of(this.users);
  }
}
