import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { total } from '../../store/items.actions';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})


export class CartComponent implements OnInit {
  // itemsCart es un array de objetos CartItem que se recibe como entrada desde un componente padre.
  itemsCart: CartItem[] = [];

  // Inicializamos la variable total.
  total: number = 0;




  constructor(
    private store: Store<{ items: ItemsState }>,
    private sharingDataServiceprivate: SharingDataService,) {
    this.store.select('items').subscribe(state => {
      this.itemsCart = state.items;
      this.total = state.total;
    })

  }
  ngOnInit(): void {

  }

  // Método que se llama para eliminar un producto del carrito.
  onDeleteCart(id: number) {
    // Emitimos el id del producto que se quiere eliminar.
    this.sharingDataServiceprivate.idProductoEmitter.emit(id);
  }


}

