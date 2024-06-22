package com.springboot.backend.sergio.userapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
}