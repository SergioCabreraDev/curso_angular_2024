import { Component, Input, OnInit, input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnInit{

  counter!: number;
  @Input() title!: string;
  @Output() counterEmmit: EventEmitter<number> = new EventEmitter();

  

  ngOnInit(): void {
    this.counter = parseInt(sessionStorage.getItem('counter')!) || 0; 
    //convertimos el valor a un int como era originalmente
    //si el valor del localStorage es undefinned retorna 0 (|| 0)
  }


  setCounter(): void{
    this.counter = this.counter +1;
    sessionStorage.setItem('counter', this.counter.toString()); //la funcion setItem pide un string convertimos en valor a string
    this.counterEmmit.emit(this.counter);
   
  }



}
