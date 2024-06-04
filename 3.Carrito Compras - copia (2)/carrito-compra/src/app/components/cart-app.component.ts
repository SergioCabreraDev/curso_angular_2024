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


@Component({
    selector: 'app-cart-app',
    standalone: true,
    templateUrl: './cart-app.component.html',
    imports: [CatalogComponent, NavbarComponent, RouterOutlet]
})


export class CartAppComponent implements OnInit { // Define una clase CartAppComponent que implementa OnInit
  productos!: Product[]; // Declara una lista de productos disponibles en el sistema
  items: CartItem[] = []; // Declara una lista de items (productos y sus cantidades) en el carrito
  total: number = 0; // Declara una variable para el total del costo de los productos en el carrito

  constructor(
    private router: Router, // Inyecta el servicio de Angular para la navegación entre rutas
    private sharingDataServiceprivate: SharingDataService, // Inyecta un servicio personalizado para compartir datos entre componentes
    private service: ProductService, // Inyecta un servicio para manejar productos
    private cdr: ChangeDetectorRef // Inyecta un servicio para detectar cambios en el componente
  ) {}

  ngOnInit(): void {
    // Método que se ejecuta cuando el componente se inicializa
    this.productos = this.service.findAll(); // Obtiene todos los productos desde el servicio y los asigna a 'productos'
    this.getSession(); // Recupera el estado del carrito desde la sesión del navegador
    this.calculateTotal(); // Calcula el total inicial del carrito
    this.onDeleteCart(); // Configura la lógica para eliminar productos del carrito
    this.agregarCarrito(); // Configura la lógica para agregar productos al carrito
  }

  agregarCarrito() {
    this.sharingDataServiceprivate.productEventEmitter.subscribe(product => {


      const confirmed = window.confirm('¿Quiere añadir este producto al carrito?');

      if(confirmed){
        // Se suscribe a eventos de adición de productos
      const hasItem = this.items.find(item => item.product.id == product.id);
      
      if (hasItem) {
        // Si el producto ya está en el carrito, incrementar su cantidad
        this.items = this.items.map(item => {
          if (item.product.id == product.id) {
            return {
              ...item, // Copia todas las propiedades del item
              quantity: item.quantity + 1 // Incrementa la cantidad en 1
            };
          }
          return item; // Mantiene los demás items sin cambios
        });
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        this.items = [...this.items, { product: { ...product }, quantity: 1 }];
      }

      this.saveSession(); // Guarda el estado del carrito en la sesión
      this.calculateTotal(); // Calcula el nuevo total del carrito

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        // Navega a la página del carrito para reflejar los cambios
        this.router.navigate(['/cart'], { state: { items: this.items, total: this.total } });
      });
      }else{return}
      
    });
  }

  onDeleteCart(): void {
    this.sharingDataServiceprivate.idProductoEmitter.subscribe(id => {

      const confirmed = window.confirm('¿Está seguro de que desea eliminar este producto del carrito?');

      if(confirmed){
        // Se suscribe a eventos de eliminación de productos
        this.items = this.items.filter(item => item.product.id != id);

        if (this.items.length == 0) {
          // Si el carrito está vacío, limpiar el almacenamiento de la sesión
          sessionStorage.removeItem('cart');
          sessionStorage.clear();
        }

        this.calculateTotal(); // Calcula el nuevo total del carrito
        this.saveSession(); // Guarda el estado actualizado del carrito en la sesión

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          // Navega a la página del carrito para reflejar los cambios, ir al index y luego volver a donde estaba.
          this.router.navigate(['/cart'], { state: { items: this.items, total: this.total } });
        });
      }else{
        return
      }



    });
  }

  calculateTotal(): void {
    // Calcula el total sumando el precio de cada item multiplicado por su cantidad
    this.total = this.items.reduce((acumulator, item) => 
      acumulator + item.quantity * item.product.price, 0);
    this.total = Math.round(this.total * 100) / 100; // Redondea el total a dos decimales
  }

  saveSession(): void {
    // Guarda el estado del carrito en la sesión del navegador
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  getSession(): void {
    // Recupera el estado del carrito desde la sesión del navegador
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
  }
}













