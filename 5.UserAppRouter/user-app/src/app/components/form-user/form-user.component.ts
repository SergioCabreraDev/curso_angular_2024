import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent implements OnInit{


  user: User;

  



  id: number = 3;

  constructor(
    private service: UserService,
    private sharingData: SharingDataService, 
    private route: ActivatedRoute) {
    this.user = new User();
  
  }

  ngOnInit(): void {
 

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if(id>0){

        this.service.findById(id).subscribe(user => this.user = user )

      }


    })
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
