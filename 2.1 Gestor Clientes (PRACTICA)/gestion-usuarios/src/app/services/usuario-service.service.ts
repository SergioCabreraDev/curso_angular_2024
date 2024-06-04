import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { usuarioData } from '../data/usuario.data';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private usuario: Usuario[] = usuarioData; // Declara una propiedad privada que almacena la lista de usuarios

  constructor() { }

  // Método para obtener la lista de usuarios
  getUsuario(): Usuario[] {
    return this.usuario; // Retorna la lista de usuarios actual
  }

  // Método para eliminar un usuario por su ID
  remove(id: number): Usuario[] {
    // Utiliza el método 'filter' para crear un nuevo array de usuarios que excluya el usuario con el ID proporcionado
    this.usuario = this.usuario.filter(usuario => usuario.id != id);
    return this.usuario; // Retorna la lista de usuarios actualizada después de la eliminación
  }

  // Método para agregar un nuevo usuario
  agregar(usuario: Usuario): Usuario[] {
    this.usuario.push(usuario); // Agrega el nuevo usuario al array existente de usuarios
    return this.usuario; // Retorna la lista de usuarios actualizada después de la adición
  }
}
