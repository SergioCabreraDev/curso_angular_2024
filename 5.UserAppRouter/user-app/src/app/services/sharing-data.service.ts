import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  private _idUserEventEmitter = new EventEmitter();
  
  private _findUserByIdEmitter = new EventEmitter();

  private _selectUserEmitter= new EventEmitter();

  constructor() { }

  get selectUserEmitter(){
    return this._selectUserEmitter;
  }

  get findUserByIdEmitter ():EventEmitter<Number>{
    return this._findUserByIdEmitter;
  }

  get newUserEventEmitter (): EventEmitter<User> {
    return this._newUserEventEmitter;
  }
  get idUserEventEmitter (): EventEmitter<number> {
    return this._idUserEventEmitter;
  }

}
