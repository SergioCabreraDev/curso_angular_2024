import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  //nombre variable: tipo = valor;
   title: string = 'hola mundo';
   age: number = 12;
   users: String [] = ['Pepe', 'Margia', 'juan'];
  //  users: String[] = []; //prueba
  visible: boolean= false;

  subTitle = 'Contador con estado de session'

  counter!: number;
  
  ngOnInit(): void {
    this.counter = parseInt(sessionStorage.getItem('counter')!) || 0; 
  }

  
  //funcion cambia visible false true false true cada vez que se ejecute
  setVisible(): void{
    this.visible=this.visible? false: true;
    console.log(this.visible)

  }

  setCounter(counterHijo:number): void{ //recibo el contado de la clase hijo counter.component
    this.counter = counterHijo; //actualizo el contado por lo que habia en el counter hijo

  }

}
