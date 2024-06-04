import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actions';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {

 productos!: Product[];

 
 constructor(
  private store:Store<{products:any}>,
  private sharingDataServiceprivate: SharingDataService, ){

    this.store.select('products').subscribe(state => this.productos = state.products)

 }

  ngOnInit(): void {
    
    this.store.dispatch(load());
  
  }

 agregarCarrito(product: Product){
  this.sharingDataServiceprivate.productEventEmitter.emit(product)
}


}
