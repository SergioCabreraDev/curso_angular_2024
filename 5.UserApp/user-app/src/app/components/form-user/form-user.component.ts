import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {

  user: User;

  regexEmail: string = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/';
  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  id: number = 3;

  constructor(){
    this.user= new User();
  }

  onSubmit(itemForm: NgForm): void{
    if(itemForm.valid){
      this.id ++;
      this.user.id = this.id;
      this.newUserEventEmitter.emit(this.user);
      console.log(this.user);
      itemForm.reset();
      itemForm.resetForm();
    }


  }
}
