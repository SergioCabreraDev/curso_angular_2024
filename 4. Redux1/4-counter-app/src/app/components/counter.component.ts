import { Component, NgModule, OnInit, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../store/items.actions';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit{

tittle: String = 'hola mundo';

counter!: number;

multiply: number = 1;

ngOnInit(): void {



}



sendit(inputValue: any) {
  let num: number = Number(inputValue); // Convierte el valor del input a número
  console.log(num)
  if(num === 0 && isNaN(num) && inputValue === ""){
    num = 1;
  }
  this.multiply = num;
}


constructor(private store:Store<{count: number}>){

  this.store.select('count').subscribe(value =>{
    this.counter = value;
  })
  
}


increment(): void{
  // this.counter++;
  this.store.dispatch(increment({multiply: this.multiply}))
}

decrement(): void{
  // this.counter --;
  this.store.dispatch(decrement({reducer: 3}))
}

reset(): void{
  // this.counter = 0;
  this.store.dispatch(reset())
}


}
