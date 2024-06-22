import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'  // Hace que el servicio esté disponible en toda la aplicación
})
export class UserService {

  private users: User[] = [];  // Array para almacenar los usuarios (no se está utilizando actualmente)

  private url: string = 'http://localhost:8080/api/users';  // URL base del API

  // Inyección del servicio HttpClient a través del constructor
  constructor(private http: HttpClient) { }

  // Método para obtener todos los usuarios
  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  // Método para obtener usuarios de manera paginada
  findAllPageable(page: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/page/${page}`);
  }

  // Método para obtener un usuario por su ID
  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  // Método para crear un nuevo usuario
  create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  // Método para actualizar un usuario existente
  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  // Método para eliminar un usuario por su ID
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
