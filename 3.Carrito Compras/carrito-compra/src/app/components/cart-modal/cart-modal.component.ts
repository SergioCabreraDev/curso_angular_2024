import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {


  @Input() items:  CartItem[] = [];
  // @Input() total: number= 0;
  @Output() idProductoEmitter= new EventEmitter();
 
  onDeleteCart(id: number){
    this.idProductoEmitter.emit(id);
   }


   @Output() openEventEmitter = new EventEmitter();

   openCart(): void{
     this.openEventEmitter.emit();
   }

   
}
