package com.springboot.backend.sergio.userapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.sergio.userapp.users_backend.entities.User;
import com.springboot.backend.sergio.userapp.users_backend.repositories.UserRepository;

@Service
public class UserServicesImpl implements UserServices {

    @Autowired
    private UserRepository repository;


    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }



}
