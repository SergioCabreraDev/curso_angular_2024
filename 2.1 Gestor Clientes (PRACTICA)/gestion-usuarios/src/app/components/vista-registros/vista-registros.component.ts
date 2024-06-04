import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'tr[app-vista-registros]',
  standalone: true,
  imports: [],
  templateUrl: './vista-registros.component.html'
})
export class VistaRegistrosComponent {


  @Input() user!: Usuario;
  @Output() removeEventEmitter: EventEmitter<number> = new EventEmitter();

  onRemove(id: number){
    this.removeEventEmitter.emit(id);
  }

}
