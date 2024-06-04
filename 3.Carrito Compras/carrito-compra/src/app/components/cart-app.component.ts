import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';
import { get } from 'http';
import { NavbarComponent } from './navbar/navbar.component';
import { CartModalComponent } from "./cart-modal/cart-modal.component";

@Component({
    selector: 'app-cart-app',
    standalone: true,
    templateUrl: './cart-app.component.html',
    imports: [CatalogComponent, ProductCardComponent, CartComponent, NavbarComponent, CartModalComponent]
})
export class CartAppComponent implements OnInit {

  productos!: Product[];

  items: CartItem[] = [];

  // total: number= 0;

  showCart: boolean = false;

  constructor(private service: ProductService){}

  ngOnInit(): void {
    this.productos= this.service.findAll();
    this.getSession();

  
  }

  agregarCarrito(product: Product) {

    // Buscar si el producto ya está en el carrito
    const hasItem = this.items.find(item =>{
      // Comparamos el ID del producto actual en el carrito con el ID del producto que queremos agregar
      return item.product.id == product.id
    })

    // Si el producto ya está en el carrito
    if(hasItem){
      // Incrementar la cantidad del producto en el carrito
      this.items = this.items.map(item => {
        // Si encontramos el producto en el carrito
        if(item.product.id == product.id){
          // Incrementar la cantidad del producto en 1
          return {
            ... item, // Mantenemos todas las propiedades del objeto actual
            quantity: item.quantity +1 // Incrementamos la cantidad del producto en 1
          }
        }
        // Si el producto no coincide con el que estamos buscando, mantenerlo igual
        return item;     
      })
    } else {
      // Si el producto no está en el carrito, agregarlo con una cantidad de 1
      this.items = [... this.items, {product: {... product}, quantity: 1}]
    }  
    // this.calculateTotal();
    this.saveSession();
}

  onDeleteCart(id :number): void{
    this.items = this.items.filter(item => item.product.id != id);
    if(this.items.length == 0){
      sessionStorage.removeItem('cart');
      sessionStorage.clear();
    }
    // this.calculateTotal();
    // this.saveSession();
  }

  // calculateTotal(): void{
  //   //método que recorre el array items y acumula un valor. Esta función se ejecuta para cada item en el array items.
  //   this.total = this.items.reduce((acumulator, item) => acumulator +item.quantity * item.product.price, 0);
  //   this.total = Math.round(this.total * 100) / 100; // redondeamos
  // }

  saveSession(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items))
  }

  getSession(): void{

    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
  }

  openCart(): void{
    //cambia a true, cambia a lo opuest o que hay en la variable
    this.showCart = !this.showCart;
  }











}
