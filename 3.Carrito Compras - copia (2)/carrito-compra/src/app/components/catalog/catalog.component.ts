import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

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
  private productService: ProductService,
  private sharingDataServiceprivate: SharingDataService, 
  private router: Router){
    
  if(this.router.getCurrentNavigation()?.extras.state){
  this.productos = this.router.getCurrentNavigation()?.extras.state!['productos'];}
 }

  ngOnInit(): void {
    if(!this.productos){
      this.productos = this.productService.findAll();
    }
  }

 agregarCarrito(product: Product){
  this.sharingDataServiceprivate.productEventEmitter.emit(product)
}


}
