import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { products } from '../../data/product.data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor() { }


  //Funcion para retornar los productos del data
  findAll(): Product[]{
    return products;
  }


}
