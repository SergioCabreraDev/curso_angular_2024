import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})


export class CartComponent {
  // itemsCart es un array de objetos CartItem que se recibe como entrada desde un componente padre.
  itemsCart: CartItem[] = [];




  // Inicializamos la variable total.
  total: number = 0;

  constructor(private sharingDataServiceprivate: SharingDataService, private router: Router){
    this.itemsCart = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  // Método que se llama para eliminar un producto del carrito.
  onDeleteCart(id: number) {
    // Emitimos el id del producto que se quiere eliminar.
    this.sharingDataServiceprivate.idProductoEmitter.emit(id);
  }


}

