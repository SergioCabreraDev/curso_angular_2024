package com.springboot.backend.sergio.userapp.users_backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class UserRequest implements IUser{

    @NotBlank  // Valida que el campo no esté en blanco ni sea nulo
    private String name;

    @NotBlank  // Valida que el campo no esté en blanco ni sea nulo
    private String lastname;

    @NotEmpty  // Valida que el campo no esté vacío
    @Email  // Valida que el campo tenga un formato de dirección de correo electrónico válido
    private String email;

    @NotBlank  // Valida que el campo no esté en blanco ni sea nulo
    @Size(min = 4, max = 12)  // Valida que el tamaño del campo esté entre 4 y 12 caracteres
    private String username;

    
    private boolean admin;



    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
}
