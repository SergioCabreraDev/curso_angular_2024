import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() users: User[] = [];

  

}
