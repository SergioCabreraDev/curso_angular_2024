import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  
  // idProductoEmitter es un EventEmitter que se usa para emitir eventos al componente padre.
  private _idProductoEmitter = new EventEmitter<number>();

  private _productEventEmitter = new EventEmitter<Product>();

  constructor() { }

  get idProductoEmitter(){
    return this._idProductoEmitter;
  }


  get productEventEmitter(){
    return this._productEventEmitter;
  }

}
