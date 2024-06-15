package com.springboot.backend.sergio.userapp.users_backend.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.sergio.userapp.users_backend.entities.User;
import com.springboot.backend.sergio.userapp.users_backend.services.UserServices;

@RestController
public class UserController {

    @Autowired
    private UserServices services;

    @GetMapping
    public List<User> list(){
        return services.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showById(@PathVariable Long id){
      Optional<User> userOptional = services.findById(id);
      if(userOptional.isPresent()){
        return ResponseEntity.status(HttpStatus.OK).body(userOptional.get());
      }
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "usuario no encontrado con el id: "+id));
    }

}
