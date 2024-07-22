package com.springboot.backend.sergio.userapp.users_backend.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.sergio.userapp.users_backend.entities.User;
import com.springboot.backend.sergio.userapp.users_backend.models.UserRequest;
import com.springboot.backend.sergio.userapp.users_backend.services.UserServices;

import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;


@CrossOrigin(originPatterns = {"http://localhost:4200"})  // Permite peticiones desde localhost:4200 (Angular frontend)
@RestController  // Define que este controlador es un controlador REST
@RequestMapping("/api/users")  // Define la ruta base para todas las operaciones en este controlador
public class UserController {

    @Autowired
    private UserServices services;  // Inyecta el servicio UserServices para manejar la lógica de negocio

    // Método para obtener todos los usuarios
    @GetMapping
    public List<User> list() {
        return services.findAll();
    }

    // Método para obtener usuarios de manera paginada
    @GetMapping("/page/{page}")
    public Page<User> listPageable(@PathVariable Integer page) {
        Pageable pageable = PageRequest.of(page, 2);  // Define la paginación con número de página y tamaño de página
        return services.findAll(pageable);  // Retorna la página de usuarios
    }

    // Método para obtener un usuario por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Optional<User> userOptional = services.findById(id);  // Busca el usuario por ID en el servicio
        if (userOptional.isPresent()) {  // Si el usuario existe, retorna OK con el usuario
            return ResponseEntity.status(HttpStatus.OK).body(userOptional.get());
        }
        // Si no existe, retorna NOT_FOUND con un mensaje de error
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("error", "el usuario no se encontró por el id:" + id));
    }
    
    // Método para crear un nuevo usuario
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {  // Si hay errores de validación, retorna una respuesta de validación
            return validation(result);
        }
        // Si no hay errores, guarda el usuario y retorna CREATED con el usuario guardado
        return ResponseEntity.status(HttpStatus.CREATED).body(services.save(user));
    }

    // Método para actualizar un usuario existente por su ID
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody UserRequest user, BindingResult result, @PathVariable Long id) {
        if (result.hasErrors()) {  // Si hay errores de validación, retorna una respuesta de validación
            return validation(result);
        }
        
        Optional<User> userOptional = services.update(user, id);  // Busca el usuario por ID en el servicio y actualiza sus datos.

        if (userOptional.isPresent()) {  // Si el usuario existe, retorna OK con el usuario actualizado
            return ResponseEntity.ok(userOptional.orElseThrow());
        }
        // Si no existe el usuario, retorna NOT_FOUND
        return ResponseEntity.notFound().build();
    }

    // Método para eliminar un usuario por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<User> userOptional = services.findById(id);  // Busca el usuario por ID en el servicio
        if (userOptional.isPresent()) {  // Si el usuario existe, elimínalo y retorna NO_CONTENT
            services.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        // Si no existe el usuario, retorna NOT_FOUND
        return ResponseEntity.notFound().build();
    }
    
    // Método privado para manejar los errores de validación
    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        // Itera sobre los errores y los agrega al mapa de errores
        result.getFieldErrors().forEach(error -> {
            errors.put(error.getField(), "The field  " + error.getField() + " " + error.getDefaultMessage());
        });
        // Retorna una respuesta de error badRequest con los errores de validación
        return ResponseEntity.badRequest().body(errors);
    }
}

