import { Component, OnInit, NgModule } from '@angular/core';
import { FormularioRegistroComponent } from '../formulario-registro/formulario-registro.component';
import { TablaRegistrosComponent } from '../tabla-registros/tabla-registros.component';
import { Usuario } from '../../models/usuario';
import { UsuarioServiceService } from '../../services/usuario-service.service';
import { CommonModule } from '@angular/common';
import { usuarioData } from '../../data/usuario.data';



@Component({
  selector: 'app-index-gestion',
  standalone: true,
  imports: [FormularioRegistroComponent, TablaRegistrosComponent, CommonModule],
  templateUrl: './index-gestion.component.html'
})
export class IndexGestionComponent implements OnInit {

  usuarios: Usuario[] = []; // Declara una propiedad 'usuarios' que almacenará la lista de usuarios

  constructor(private service: UsuarioServiceService) { } // Inyecta el servicio de Usuario en el constructor

  ngOnInit(): void {
    // Este método se llama cuando se inicializa el componente
    // Se utiliza para cargar la lista de usuarios al iniciar el componente
    this.usuarios = this.service.getUsuario(); // Obtiene la lista de usuarios del servicio y la asigna a la propiedad 'usuarios'
  }
  
  // Método para eliminar un usuario
  removeUsuario(id: number): Usuario[] {
    // Llama al método 'remove' del servicio de Usuario para eliminar el usuario con el ID proporcionado
    this.usuarios = this.service.remove(id);
    return this.usuarios; // Retorna la lista de usuarios actualizada después de eliminar el usuario
  }

  // Método para agregar un nuevo usuario
  agregarUsuario(usuario: Usuario): Usuario[] {
    // Llama al método 'agregar' del servicio de Usuario para agregar el nuevo usuario
    return this.usuarios = this.service.agregar(usuario);
    // Retorna la lista de usuarios actualizada después de agregar el nuevo usuario
  }
}
  
  





  

