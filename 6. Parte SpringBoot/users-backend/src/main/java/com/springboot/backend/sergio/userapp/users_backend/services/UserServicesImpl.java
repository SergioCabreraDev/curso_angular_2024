package com.springboot.backend.sergio.userapp.users_backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.sergio.userapp.users_backend.entities.Role;
import com.springboot.backend.sergio.userapp.users_backend.entities.User;
import com.springboot.backend.sergio.userapp.users_backend.models.IUser;
import com.springboot.backend.sergio.userapp.users_backend.models.UserRequest;
import com.springboot.backend.sergio.userapp.users_backend.repositories.RoleRepository;
import com.springboot.backend.sergio.userapp.users_backend.repositories.UserRepository;

@Service
public class UserServicesImpl implements UserServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Método para obtener todos los usuarios
    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List<User>) userRepository.findAll();
    }

    // Método para obtener todos los usuarios de manera paginada
    @Override
    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    // Método para encontrar un usuario por su ID
    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    // Método para guardar un nuevo usuario o actualizar uno existente
    @Override
    @Transactional
    public User save(User user) {

        // Establece la lista de roles en el usuario
        user.setRoles(getRoles(user));

        // Codifica (hashea) la contraseña del usuario usando el passwordEncoder y la establece en el usuario
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Guarda el usuario en el repositorio y lo devuelve
        return userRepository.save(user);
    }

    

    // Método para eliminar un usuario por su ID
    @Override
    @Transactional
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    @Override
    public Optional<User> update(UserRequest user, Long id) {

        Optional<User> userOptional = userRepository.findById(id);  // Busca el usuario por ID en el servicio

        if (userOptional.isPresent()) {  // Si el usuario existe, actualiza sus datos y retorna OK con el usuario actualizado
            User userDb = userOptional.get();
            userDb.setEmail(user.getEmail());
            userDb.setLastname(user.getLastname());
            userDb.setName(user.getName());
            userDb.setUsername(user.getUsername());
            userRepository.save(userDb);

            userDb.setRoles(getRoles(user));
            return Optional.of(userDb);
        }
        return Optional.empty();
        
    }


    
    private List<Role> getRoles(IUser user) {
        // Define una lista para almacenar los roles del usuario
        List<Role> roles = new ArrayList<>();

        // Busca un rol específico en el repositorio de roles por su nombre
        Optional<Role> optionalRoleUser = roleRepository.findByName("ROLE_USER");

        // Si el rol está presente (existe en el repositorio), lo añade a la lista de roles
        optionalRoleUser.ifPresent(role -> roles.add(role));

        // Comprueba si el usuario tiene permisos de administrador
        if(user.isAdmin()) {
            // Busca un rol específico en el repositorio de roles por su nombre
            Optional<Role> optionalRoleAdmin = roleRepository.findByName("ROLE_ADMIN");

            // Si el rol está presente (existe en el repositorio), lo añade a la lista de roles
            optionalRoleAdmin.ifPresent(role -> roles.add(role));
        }
        return roles;
    }
}