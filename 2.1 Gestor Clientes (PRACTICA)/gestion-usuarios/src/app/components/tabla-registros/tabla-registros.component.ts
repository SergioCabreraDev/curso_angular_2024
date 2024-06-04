import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioServiceService } from '../../services/usuario-service.service';
import { usuarioData } from '../../data/usuario.data';
import { VistaRegistrosComponent } from '../vista-registros/vista-registros.component';

@Component({
  selector: 'app-tabla-registros',
  standalone: true,
  imports: [VistaRegistrosComponent],
  templateUrl: './tabla-registros.component.html'
})
export class TablaRegistrosComponent {

  @Input() usuarios: Usuario[] = [];
  @Output() removeEventEmitter: EventEmitter<number> = new EventEmitter();

  // usuarioData: Usuario[] = usuarioData;

  onRemove(id: number){
    this.removeEventEmitter.emit(id);
  }


  
}
