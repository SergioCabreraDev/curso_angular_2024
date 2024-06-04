import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';
import { get } from 'http';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import { state } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
import { ItemsState } from '../store/items.reducer';
import { Store } from '@ngrx/store';
import { add, remove, total } from '../store/items.actions';


@Component({
  selector: 'app-cart-app',
  standalone: true,
  templateUrl: './cart-app.component.html',
  imports: [CatalogComponent, NavbarComponent, RouterOutlet]
})


export class CartAppComponent implements OnInit { // Define una clase CartAppComponent que implementa OnInit
  productos!: Product[]; // Declara una lista de productos disponibles en el sistema
  items: CartItem[] = []; // Declara una lista de items (productos y sus cantidades) en el carrito


  constructor(
    private store: Store<{ items: ItemsState }>, // Inyecta el servicio de Redux para manejar el estado de los items
    private router: Router, // Inyecta el servicio de Angular para la navegación entre rutas
    private sharingDataServiceprivate: SharingDataService, // Inyecta un servicio personalizado para compartir datos entre componentes
    private cdr: ChangeDetectorRef // Inyecta un servicio para detectar cambios en el componente
  ) {
    this.store.select('items').subscribe(state => { // Se suscribe al estado de los items en el store
      this.items = state.items; // Actualiza los items del carrito con los del estado
      console.log('cambio el estado')
    })
  }

  ngOnInit(): void { // Método que se ejecuta al inicializar el componente
    this.onDeleteCart(); // Llama al método para eliminar items del carrito
    this.agregarCarrito(); // Llama al método para agregar items al carrito
  }

  agregarCarrito() { // Método para agregar items al carrito
    this.sharingDataServiceprivate.productEventEmitter.subscribe(product => { // Se suscribe al evento de agregar producto
      const confirmed = window.confirm('¿Quiere añadir este producto al carrito?'); // Pregunta al usuario si quiere añadir el producto al carrito
      if (confirmed) { // Si el usuario confirma

        this.store.dispatch(add({ product })) // Despacha una acción para añadir el producto al carrito
        this.store.dispatch(total()) // Despacha una acción para calcular el total del carrito
        this.saveSession(); // Guarda el estado del carrito en la sesión del navegador

        this.router.navigate(['/cart']);

      } else { return } // Si el usuario no confirma, no hace nada
    });
  }

  onDeleteCart(): void { // Método para eliminar items del carrito
    this.sharingDataServiceprivate.idProductoEmitter.subscribe(id => { // Se suscribe al evento de eliminar producto
      const confirmed = window.confirm('¿Está seguro de que desea eliminar este producto del carrito?'); // Pregunta al usuario si quiere eliminar el producto del carrito
      if (confirmed) { // Si el usuario confirma

        this.store.dispatch(remove({ id: id })); // Despacha una acción para eliminar el producto del carrito
        this.store.dispatch(total()) // Despacha una acción para calcular el total del carrito
        this.saveSession(); // Guarda el estado del carrito en la sesión del navegador


        this.router.navigate(['/cart']);

      } else {
        return // Si el usuario no confirma, no hace nada
      }
    });
  }

  saveSession(): void { // Método para guardar el estado del carrito en la sesión del navegador
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}














