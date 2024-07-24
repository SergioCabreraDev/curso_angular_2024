import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'  // Hace que el servicio esté disponible en toda la aplicación
})

export class SharingDataService {

  // Definición de los diferentes EventEmitters para compartir eventos entre componentes
  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();  // Emite eventos cuando se crea un nuevo usuario
  private _idUserEventEmitter = new EventEmitter<number>();  // Emite eventos con el ID del usuario a eliminar
  private _findUserByIdEmitter = new EventEmitter<number>();  // Emite eventos para encontrar un usuario por ID
  private _selectUserEmitter = new EventEmitter<User>();  // Emite eventos cuando se selecciona un usuario
  private _handlerLoginEventEmitter = new EventEmitter();

  constructor() { }

  // Getters para acceder a los EventEmitters desde otros componentes

  get handlerLoginEventEmitter(){
    return this._handlerLoginEventEmitter
  }

  // Getter para obtener el EventEmitter que emite eventos cuando se selecciona un usuario
  get selectUserEmitter(): EventEmitter<User> {
    return this._selectUserEmitter;
  }

  // Getter para obtener el EventEmitter que emite eventos para encontrar un usuario por ID
  get findUserByIdEmitter(): EventEmitter<number> {
    return this._findUserByIdEmitter;
  }

  // Getter para obtener el EventEmitter que emite eventos cuando se crea un nuevo usuario
  get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }

  // Getter para obtener el EventEmitter que emite eventos con el ID del usuario a eliminar
  get idUserEventEmitter(): EventEmitter<number> {
    return this._idUserEventEmitter;
  }

}
