import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']  // Corregir 'styleUrl' a 'styleUrls'
})
export class UserComponent {
  @Input() users: User[] = [];
}
