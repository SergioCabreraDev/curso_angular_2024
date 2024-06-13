import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {


  user: User;

  



  id: number = 3;

  constructor(private sharingData: SharingDataService, private router:Router) {
    if(this.router.getCurrentNavigation()?.extras.state){
      this.user = this.router.getCurrentNavigation()?.extras.state!['user'];
    }else{
      this.user = new User();
    }
  }

  onSubmit(itemForm: NgForm): void {
    if (itemForm.valid) {
      // this.id++;
      // this.user.id = this.id;
      this.sharingData.newUserEventEmitter.emit(this.user);
      console.log(this.user);
      itemForm.reset();
      itemForm.resetForm();
    }


  }
  onClear(itemForm: NgForm){
    itemForm.reset();
    itemForm.resetForm();
  }

}
