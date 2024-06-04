import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IndexGestionComponent } from './components/index-gestion/index-gestion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IndexGestionComponent,CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-usuarios';
}
