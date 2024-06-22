package com.springboot.backend.sergio.userapp.users_backend.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import static jakarta.persistence.GenerationType.*;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@Entity  // Indica que esta clase es una entidad JPA
@Table(name = "users")  // Especifica el nombre de la tabla en la base de datos
public class User {

    @Id  // Indica que este atributo es la clave primaria
    @GeneratedValue(strategy = IDENTITY)  // Genera automáticamente el valor de la clave primaria
    private Long id;

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

    @NotBlank  // Valida que el campo no esté en blanco ni sea nulo
    private String password;

    // Getters y setters para todos los atributos

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}