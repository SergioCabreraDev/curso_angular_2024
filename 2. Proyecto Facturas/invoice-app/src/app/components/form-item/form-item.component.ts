import { NgFor } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-form-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-item.component.html'
})
export class FormItemComponent {


  @Output() addItemEventEmitter = new EventEmitter();

  private counterId = 4;

  item: any = {
    product: '',
    price: '',
    quantity: ''
  }

  onSubmit(itemForm: NgForm): void{

    if(itemForm.valid){
      this.addItemEventEmitter.emit({id: this.counterId,...this.item});
      this.counterId ++;
      this.item = {
        product: '',
        price: '',
        quantity: ''
      };
      itemForm.reset();
    }
    
  }
}
