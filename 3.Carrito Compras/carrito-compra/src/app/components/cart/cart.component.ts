import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})


export class CartComponent implements OnChanges {
  // itemsCart es un array de objetos CartItem que se recibe como entrada desde un componente padre.
  @Input() itemsCart: CartItem[] = [];

  // idProductoEmitter es un EventEmitter que se usa para emitir eventos al componente padre.
  @Output() idProductoEmitter = new EventEmitter<number>();

  // Método que se ejecuta cuando hay cambios en las propiedades de entrada del componente.
  ngOnChanges(changes: SimpleChanges): void {
    // Guardamos los cambios en la variable itemsChanges
    let itemsChanges = changes['itemsCart'];
    
    // Calculamos el total cada vez que hay cambios.
    this.calculateTotal();

    this.saveSession();
    
  }

  // Inicializamos la variable total.
  total: number = 0;

  // Método que se llama para eliminar un producto del carrito.
  onDeleteCart(id: number) {
    // Emitimos el id del producto que se quiere eliminar.
    this.idProductoEmitter.emit(id);
  }

  // Método que calcula el total del carrito.
  calculateTotal(): void {
    // Recorre el array itemsCart y acumula el valor total.
    this.total = this.itemsCart.reduce(
      (acumulator, item) => acumulator + item.quantity * item.product.price,
      0
    );
    // Redondea el total a dos decimales.
    this.total = Math.round(this.total * 100) / 100;
    
  }

  // Método que guarda el estado del carrito en la sesión del navegador.
  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
  }
}

