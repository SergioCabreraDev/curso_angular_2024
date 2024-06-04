import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';


@Component({
  selector: 'div[app-product-card]',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() items!: Product;


  //EMITIMOS AL CATALOGO
  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();
  agregarCarrito(product: Product){
    this.productEventEmitter.emit(product)
  }

}
