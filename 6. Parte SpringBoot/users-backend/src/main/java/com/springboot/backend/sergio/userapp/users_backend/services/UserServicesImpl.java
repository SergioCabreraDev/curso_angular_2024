package com.springboot.backend.sergio.userapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.sergio.userapp.users_backend.entities.User;
import com.springboot.backend.sergio.userapp.users_backend.repositories.UserRepository;

@Service
public class UserServicesImpl implements UserServices {

    @Autowired
    private UserRepository repository;

    // Método para obtener todos los usuarios
    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List<User>) repository.findAll();
    }

    // Método para obtener todos los usuarios de manera paginada
    @Override
    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    // Método para encontrar un usuario por su ID
    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    // Método para guardar un nuevo usuario o actualizar uno existente
    @Override
    @Transactional
    public User save(User user) {
        return repository.save(user);
    }

    // Método para eliminar un usuario por su ID
    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @Override
    public Optional<User> update(User user, Long id) {

        Optional<User> userOptional = repository.findById(id);  // Busca el usuario por ID en el servicio

        if (userOptional.isPresent()) {  // Si el usuario existe, actualiza sus datos y retorna OK con el usuario actualizado
            User userDb = userOptional.get();
            userDb.setEmail(user.getEmail());
            userDb.setLastname(user.getLastname());
            userDb.setName(user.getName());
            userDb.setPassword(user.getPassword());
            userDb.setUsername(user.getUsername());
            repository.save(userDb);
            return Optional.of(userDb);
        }
        return Optional.empty();
        
    }
}